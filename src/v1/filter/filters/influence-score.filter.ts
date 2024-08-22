import { Influencer } from "../../../types/influencer";
import { convertStringNumber } from "../../../utils";
import { IFilter } from "./filter-chain";

/**
 * @description This class filters influencers based on their influence score.
 * @example
 * const filter = new InfluenceScoreFilter(100);
 * filter.apply(influencer);
 * @class InfluenceScoreFilter
 * @implements {IFilter<Influencer>}
 * @property {number} minScore
 * @method apply
 * @param {Influencer} item
 * @returns {boolean}
 */

export class InfluenceScoreFilter implements IFilter<Influencer> {
  private minScore: number;

  constructor(minScore: number) {
    this.minScore = minScore;
  }

  apply(item: Influencer): boolean {
    return convertStringNumber(item.influence_score) >= this.minScore;
  }
}
