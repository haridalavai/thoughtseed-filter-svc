import { Influencer } from "../../types/influencer";
import { s3CSVLoader } from "../../utils";

import {
  AverageLikesFilter,
  CountryFilter,
  FilterChain,
  FollowersFilter,
  IFilter,
  InfluenceScoreFilter,
} from "./filters";

export async function filterV1(
  query: Record<string, any>
): Promise<Influencer[]> {
  try {
    const influencers: Influencer[] = await s3CSVLoader({
      Bucket: "thoughtseed-influencers",
      Key: "top_insta_influencers_data.csv",
    });

    const filterChain = new FilterChain<Influencer>();

    const filters = createFiltersFromQuery(query);

    filters.forEach((filter) => filterChain.addFilter(filter));

    const filteredInfluencers = filterChain.applyFilters(influencers);

    return filteredInfluencers;
  } catch (err: any) {
    throw err;
  }
}

function createFiltersFromQuery(
  query: Record<string, any>
): IFilter<Influencer>[] {
  const filters: IFilter<Influencer>[] = [];

  if (query.min_followers) {
    filters.push(new FollowersFilter(parseInt(query.min_followers)));
  }

  if (query.min_average_likes) {
    filters.push(new AverageLikesFilter(parseInt(query.min_average_likes)));
  }

  if (query.min_influence_score) {
    filters.push(
      new InfluenceScoreFilter(parseFloat(query.min_influence_score))
    );
  }

  if (query.country) {
    filters.push(new CountryFilter(query.country));
  }

  return filters;
}
