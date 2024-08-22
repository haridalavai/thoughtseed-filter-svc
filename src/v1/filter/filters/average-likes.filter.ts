import { Influencer } from "../../../types/influencer";
import { convertStringNumber } from "../../../utils";
import { IFilter } from "./filter-chain";

/**
 * @description This class filters influencers based on their average likes.
 * @example
 * const filter = new AverageLikesFilter(1000);
 * filter.apply(influencer);
 * @class AverageLikesFilter
 * @implements {IFilter<Influencer>}
 * @property {number} minLikes
 * @method apply
 * @param {Influencer} item
 * @returns {boolean}
 */

export class AverageLikesFilter implements IFilter<Influencer> {
  private minLikes: number;

  constructor(minLikes: number) {
    this.minLikes = minLikes;
  }

  apply(item: Influencer): boolean {
    return convertStringNumber(item.avg_likes) >= this.minLikes;
  }
}
