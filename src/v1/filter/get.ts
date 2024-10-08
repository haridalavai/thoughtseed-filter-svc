import { client } from "../../lib/redis-client";
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

/**
 *
 * @param query
 * @returns Promise<Influencer[]>
 * @description This function filters influencers based on the query parameters provided.
 * The function first checks if the filtered influencers are cached in Redis. If they are, it returns the cached influencers.
 * If not, it loads the influencers from S3, creates a filter chain, applies the filters based on the query parameters, caches the filtered influencers in Redis, and returns the filtered influencers.
 * If an error occurs, it throws the error.
 * @example
 * const filteredInfluencers = await filterV1({ min_followers: 1000000 });
 */

export async function filterV1(
  query: Record<string, any>
): Promise<Influencer[]> {
  try {
    const cachedInfluencers = await client.get(JSON.stringify(query));

    if (cachedInfluencers) {
      return JSON.parse(cachedInfluencers);
    }

    const influencers: Influencer[] = await s3CSVLoader({
      Bucket: process.env.INFLUENCERS_BUCKET!,
      Key: process.env.INFLUENCERS_KEY!,
    });

    const filterChain = new FilterChain<Influencer>();

    const filters = createFiltersFromQuery(query);

    filters.forEach((filter) => filterChain.addFilter(filter));

    const filteredInfluencers = filterChain.applyFilters(influencers);

    client.set(JSON.stringify(query), JSON.stringify(filteredInfluencers));

    return filteredInfluencers;
  } catch (err: any) {
    throw err;
  }
}

/**
 *
 * @param query
 * @returns IFilter<Influencer>[]
 * @description This function creates filters based on the query parameters provided.
 * @example
 * const filters = createFiltersFromQuery({ min_followers: 1000000 });
 */
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
