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
  web_url?: string;
}

interface SentryEvent {
  title: string;
  environment?: string;
  tags: Array<[string, string]>;
  web_url?: string;
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
function createIssueEmbed(issue: SentryIssue, action: string, actorName: string) {
  return {
    embeds: [
      {
        title: `[${action.toUpperCase()}] ${issue.title}`,
        description: issue.culprit || "No culprit information",
        color: getColorByAction(action),
        ...(issue.web_url && { url: issue.web_url }),
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

function createEventEmbed(event: SentryEvent, triggeredRule: string) {
  const tags = Object.fromEntries(event.tags);

  return {
    embeds: [
      {
        title: `[ERROR] ${event.title}`,
        description: triggeredRule ? `Rule: ${triggeredRule}` : "Sentry Alert",
        color: 0xff0000,
        ...(event.web_url && { url: event.web_url }),
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

function createDiscordPayload(payload: SentryWebhookPayload) {
  if (hasIssue(payload) && payload.data.issue) {
    return createIssueEmbed(payload.data.issue, payload.action, payload.actor?.name ?? "System");
  }

  if (hasEvent(payload) && payload.data.event) {
    return createEventEmbed(payload.data.event, payload.triggered_rule ?? "");
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
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  if (!req.headers["sentry-hook-signature"]) {
    return res.status(401).json({ error: "Invalid source" });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return res.status(500).json({ error: "Webhook not configured" });
  }

  const payload = req.body as unknown as SentryWebhookPayload;
  if (!payload?.data) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  if (shouldSkip(payload)) {
    return res.status(200).json({ skipped: true });
  }

  try {
    const discordPayload = createDiscordPayload(payload);

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });
  } catch (error) {
    console.error("Discord webhook failed:", error);
  }

  return res.status(200).json({ ok: true });
}
