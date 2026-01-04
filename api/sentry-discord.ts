import type { VercelRequest, VercelResponse } from "@vercel/node";

// Sentry Webhook Payload 타입
interface SentryIssue {
  title: string;
  culprit: string;
  shortId: string;
  metadata: {
    type?: string;
    value?: string;
  };
}

interface SentryEvent {
  title: string;
  environment?: string;
  tags: Array<[string, string]>;
}

interface SentryWebhookPayload {
  action: string;
  data: {
    issue?: SentryIssue;
    event?: SentryEvent;
  };
  actor?: {
    name?: string;
  };
  triggered_rule?: string;
}

// 타입 가드
const hasIssue = (payload: SentryWebhookPayload): boolean =>
  payload.data.issue !== undefined;

const hasEvent = (payload: SentryWebhookPayload): boolean =>
  payload.data.event !== undefined;

// 필터링 - production 환경의 중요한 알림만 허용
const ALLOWED_ACTIONS = new Set(["created", "regressed", "triggered"]);

function shouldSkip(payload: SentryWebhookPayload): boolean {
  if (!ALLOWED_ACTIONS.has(payload.action)) {
    return true;
  }

  if (hasEvent(payload)) {
    return payload.data.event?.environment !== "production";
  }

  return false;
}

// Discord Embed 생성
function createIssueEmbed(issue: SentryIssue, action: string, actorName: string, sentryUrl: string) {
  return {
    embeds: [
      {
        title: `[${action.toUpperCase()}] ${issue.title}`,
        description: issue.culprit || "No culprit information",
        color: getColorByAction(action),
        url: sentryUrl,
        fields: [
          { name: "Issue", value: issue.shortId, inline: true },
          { name: "Type", value: issue.metadata.type ?? "Unknown", inline: true },
          { name: "Triggered by", value: actorName, inline: true },
          { name: "Message", value: truncate(issue.metadata.value ?? "N/A", 200), inline: false },
        ],
        timestamp: new Date().toISOString(),
        footer: { text: "Sentry" },
      },
    ],
  };
}

function createEventEmbed(event: SentryEvent, triggeredRule: string, sentryUrl: string) {
  const tags = Object.fromEntries(event.tags);

  return {
    embeds: [
      {
        title: `[ERROR] ${event.title}`,
        description: triggeredRule ? `Rule: ${triggeredRule}` : "Sentry Alert",
        color: 0xff0000,
        url: sentryUrl,
        fields: [
          { name: "Environment", value: event.environment ?? "Unknown", inline: true },
          { name: "Browser", value: tags.browser ?? "-", inline: true },
          { name: "OS", value: tags.os ?? "-", inline: true },
        ],
        timestamp: new Date().toISOString(),
        footer: { text: "Sentry" },
      },
    ],
  };
}

function createDiscordPayload(payload: SentryWebhookPayload, sentryUrl: string) {
  if (hasIssue(payload) && payload.data.issue) {
    return createIssueEmbed(
      payload.data.issue,
      payload.action,
      payload.actor?.name ?? "System",
      sentryUrl
    );
  }

  if (hasEvent(payload) && payload.data.event) {
    return createEventEmbed(payload.data.event, payload.triggered_rule ?? "", sentryUrl);
  }

  // fallback
  return {
    embeds: [
      {
        title: "[ALERT] Sentry Notification",
        description: "Unknown payload type",
        color: 0x9e9e9e,
        timestamp: new Date().toISOString(),
      },
    ],
  };
}

//색상 유틸리티
function getColorByAction(action: string): number {
  const map: Record<string, number> = {
    created: 0xff0000,
    regressed: 0xff6f00,
    resolved: 0x00c853,
  };
  return map[action] ?? 0x9e9e9e;
}

function truncate(value: string, max: number) {
  return value.length > max ? value.slice(0, max - 3) + "..." : value;
}

// 핸들러 - Vercel이 Sentry로 부터 HTTP 요청을 받으면 수행됨
export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("=== Handler Start ===");
  console.log("Method:", req.method);
  console.log("Body:", JSON.stringify(req.body));
  console.log("Sentry Signature:", req.headers["sentry-hook-signature"]);

  if (req.method !== "POST") {
    console.log("Rejected: Not POST method");
    return res.status(405).end();
  }

  if (!req.headers["sentry-hook-signature"]) {
    console.log("Rejected: No sentry-hook-signature");
    return res.status(401).json({ error: "Invalid source" });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  console.log("Webhook URL exists:", !!webhookUrl);

  if (!webhookUrl) {
    console.log("Rejected: No webhook URL configured");
    return res.status(500).json({ error: "Webhook not configured" });
  }

  const payload = req.body as unknown as SentryWebhookPayload;
  console.log("Payload parsed:", !!payload);

  if (!payload?.data) {
    console.log("Rejected: Invalid payload structure");
    return res.status(400).json({ error: "Invalid payload" });
  }

  if (shouldSkip(payload)) {
    console.log("Skipped: shouldSkip returned true");
    return res.status(200).json({ skipped: true });
  }

  const sentryUrl = (req.headers["sentry-hook-resource"] as string) ?? "";
  console.log("Sentry URL:", sentryUrl);

  try {
    console.log("Sending to Discord...");
    const discordPayload = createDiscordPayload(payload, sentryUrl);
    console.log("Discord payload:", JSON.stringify(discordPayload));

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });
    console.log("Discord response status:", response.status);
  } catch (error) {
    console.error("Discord webhook failed:", error);
  }

  console.log("=== Handler End ===");
  return res.status(200).json({ ok: true });
}
