import type { VercelRequest, VercelResponse } from "@vercel/node";

//Sentry 관련 타입
interface SentryIssue {
  title: string;
  culprit: string;
  shortId: string;
  metadata: {
    type?: string;
    value?: string;
  };
}

interface SentryIssuePayload {
  action: string;
  data: {
    issue: SentryIssue;
  };
  actor?: {
    name?: string;
  };
}

interface SentryEventPayload {
  event: {
    title: string;
    environment?: string;
    tags: Array<[string, string]>;
  };
  project_name: string;
  url: string;
}

type Payload = SentryIssuePayload | SentryEventPayload;

//타입가드
function isIssuePayload(payload: Payload): payload is SentryIssuePayload {
  return "action" in payload;
}

//필터 기능 - 중요한 알림만 받도록 필터링(노이즈 줄이기)
const ALLOWED_ACTIONS = new Set(["created", "regressed", "triggered"]);

function shouldSkip(payload: Payload): boolean {
  if (isIssuePayload(payload)) {
    return !ALLOWED_ACTIONS.has(payload.action);
  }

  return payload.event.environment !== "production";
}

//Discord Embed 형식 변환
function createIssueEmbed(payload: SentryIssuePayload, sentryUrl: string) {
  const { issue } = payload.data;

  return {
    embeds: [
      {
        title: `[${payload.action.toUpperCase()}] ${issue.title}`,
        description: issue.culprit || "No culprit information",
        color: getColorByAction(payload.action),
        url: sentryUrl,
        fields: [
          { name: "Issue", value: issue.shortId, inline: true },
          { name: "Type", value: issue.metadata.type ?? "Unknown", inline: true },
          {
            name: "Triggered by",
            value: payload.actor?.name ?? "System",
            inline: true,
          },
          {
            name: "Message",
            value: truncate(issue.metadata.value ?? "N/A", 200),
            inline: false,
          },
        ],
        timestamp: new Date().toISOString(),
        footer: { text: "Sentry" },
      },
    ],
  };
}

function createEventEmbed(payload: SentryEventPayload) {
  const tags = Object.fromEntries(payload.event.tags);

  return {
    embeds: [
      {
        title: `[ERROR] ${payload.event.title}`,
        description: `Project: ${payload.project_name}`,
        color: 0xff0000,
        url: payload.url,
        fields: [
          {
            name: "Environment",
            value: payload.event.environment ?? "Unknown",
            inline: true,
          },
          { name: "Browser", value: tags.browser ?? "-", inline: true },
          { name: "OS", value: tags.os ?? "-", inline: true },
        ],
        timestamp: new Date().toISOString(),
        footer: { text: "Sentry" },
      },
    ],
  };
}

function createDiscordPayload(payload: Payload, sentryUrl: string) {
  return isIssuePayload(payload) ? createIssueEmbed(payload, sentryUrl) : createEventEmbed(payload);
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

  const payload = req.body as Payload;
  console.log("Payload parsed:", !!payload);

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
