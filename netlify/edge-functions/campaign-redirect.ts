import { campaignRedirectResponse, type VisitLog } from "../../shared/campaign-redirects.ts";

const VISIT_STORE = "campaign-visits";

async function persistCampaignVisit(entry: VisitLog): Promise<void> {
  const { getStore } = await import("@netlify/blobs");
  const slug = entry.path.split("/").filter(Boolean)[1] ?? "unknown";
  const key = `${slug}/${entry.ts.replace(/[:.]/g, "-")}-${crypto.randomUUID()}`;
  await getStore(VISIT_STORE).setJSON(key, entry);
}

interface CampaignEdgeContext {
  ip: string;
  log: (...data: unknown[]) => void;
  waitUntil: (promise: Promise<unknown>) => void;
}

export default function campaignRedirect(request: Request, context: CampaignEdgeContext): Response {
  return campaignRedirectResponse(request, {
    ip: context.ip,
    log: (line) => context.log(line),
    persist: persistCampaignVisit,
    waitUntil: (promise) => context.waitUntil(promise),
  });
}
