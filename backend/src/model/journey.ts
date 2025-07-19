//src/model/journey.ts
export interface IJourney {
  utm_source: string;
  utm_campaign: string;
  utm_medium: string;
  utm_content: string;
  sessionId: string;
  createdAt: string;
}

export type IJourneyArray = IJourney[];
