import { Influencer } from "../../../types/influencer";
import { convertStringNumber } from "../../../utils";
import { IFilter } from "./filter-chain";

/**
 * @description This class filters influencers based on their followers count.
 * @example
 * const filter = new FollowersFilter(1000000);
 * filter.apply(influencer);
 * @class FollowersFilter
 * @implements {IFilter<Influencer>}
 * @property {number} minFollowers
 * @method apply
 * @param {Influencer} item
 * @returns {boolean}
 */

export class FollowersFilter implements IFilter<Influencer> {
  private minFollowers: number;

  constructor(minFollowers: number) {
    this.minFollowers = minFollowers;
  }

  apply(item: Influencer): boolean {
    return convertStringNumber(item.followers) >= this.minFollowers;
  }
}
