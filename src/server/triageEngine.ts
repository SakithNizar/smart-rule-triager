export type TriageContext = {
  accountAgeDays: number;
  totalKarma: number;
  reportCount: number;
  isSubmission: boolean;
};

export type TriageResult = {
  score: number;
  priority: "LOW" | "MEDIUM" | "HIGH";
  reasons: string[];
};

export function triageItem(ctx: TriageContext): TriageResult {
  let score = 0;
  const reasons: string[] = [];

  // New account risk
  if (ctx.accountAgeDays < 7) {
    score += 20;
    reasons.push("Account younger than 7 days");
  }

  // Low karma risk
  if (ctx.totalKarma < 100) {
    score += 15;
    reasons.push("Low total karma");
  }

  // Reports increase urgency
  if (ctx.reportCount > 0) {
    score += ctx.reportCount * 10;
    reasons.push(`${ctx.reportCount} report(s)`);
  }

  // Posts slightly higher priority than comments
  if (ctx.isSubmission) {
    score += 5;
  }

  // Priority classification
  let priority: "LOW" | "MEDIUM" | "HIGH" = "LOW";
  if (score >= 50) priority = "HIGH";
  else if (score >= 25) priority = "MEDIUM";

  return { score, priority, reasons };
}
