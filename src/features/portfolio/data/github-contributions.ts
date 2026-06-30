import { unstable_cache } from "next/cache"

import type { Activity } from "@/components/kibo-ui/contribution-graph"
import { GITHUB_USERNAME } from "@/config/site"

type GitHubContributionsResponse = {
  contributions: Activity[]
}

export type GitHubContributionsData = {
  contributions: Activity[]
  totalCount: number
}

export const getGitHubContributions = unstable_cache(
  async (): Promise<GitHubContributionsData> => {
    try {
      const url = process.env.GITHUB_CONTRIBUTIONS_API_URL || "https://github-contributions-api.jogruber.de";
      const currentYear = new Date().getFullYear();

      const [allRes, yearRes] = await Promise.all([
        fetch(`${url}/v4/${GITHUB_USERNAME}?y=all`),
        fetch(`${url}/v4/${GITHUB_USERNAME}?y=${currentYear}`),
      ]);

      const allData = allRes.ok
        ? ((await allRes.json()) as GitHubContributionsResponse)
        : { contributions: [] };
      const yearData = yearRes.ok
        ? ((await yearRes.json()) as GitHubContributionsResponse)
        : { contributions: [] };

      const totalCount = (allData.contributions || []).reduce(
        (sum, activity) => sum + activity.count,
        0
      );

      return {
        contributions: yearData.contributions || [],
        totalCount,
      };
    } catch (e) {
      return { contributions: [], totalCount: 0 };
    }
  },
  ["github-contributions", GITHUB_USERNAME],
  { revalidate: 86400 } // Cache for 1 day (86400 seconds)
)
