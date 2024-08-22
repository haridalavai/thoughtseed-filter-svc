/**
 * @description Interface for filters.
 * @template T
 * @interface IFilter
 * @method apply
 * @param {T} item
 * @returns {boolean}
 * @example
 * class FollowersFilter implements IFilter<Influencer> {
 *  private minFollowers: number;
 *  constructor(minFollowers: number) {
 *    this.minFollowers = minFollowers;
 *  }
 *  apply(item: Influencer): boolean {
 *    return convertStringNumber(item.followers) >= this.minFollowers;
 *  }
 * }
 * @returns {boolean}
 */
export interface IFilter<T> {
  apply(item: T): boolean;
}

export enum FilterParams {
  MIN_INFLUENCE_SCORE = "min_influence_score",
  MIN_AVERAGE_LIKES = "min_average_likes",
  MIN_FOLLOWERS = "min_followers",
  COUNTRY = "country",
}

/**
 * @description FilterChain class that applies filters to items.
 * @example
 * const filterChain = new FilterChain<Influencer>();
 * const filters: IFilter<Influencer>[] = [new FollowersFilter(400000000)];
 * filters.forEach((filter) => filterChain.addFilter(filter));
 * const filteredInfluencers = filterChain.applyFilters(influencers);
 * @template T
 * @class FilterChain
 * @implements {IFilter<T>}
 * @property {IFilter<T>[]} filters
 * @method addFilter
 * @param {IFilter<T>} filter
 * @returns {void}
 * @method applyFilters
 * @param {T[]} items
 * @returns {T[]}
 * @returns {T[]}
 */

export class FilterChain<T> {
  private filters: IFilter<T>[] = [];

  addFilter(filter: IFilter<T>): void {
    this.filters.push(filter);
  }

  applyFilters(items: T[]): T[] {
    return items.filter((item) =>
      this.filters.every((filter) => filter.apply(item))
    );
  }
}
