import { Influencer } from "../../../types/influencer";
import { convertStringNumber } from "../../../utils";
import { IFilter } from "./filter-chain";

export class InfluenceScoreFilter implements IFilter<Influencer> {
  private minScore: number;

  constructor(minScore: number) {
    this.minScore = minScore;
  }

  apply(item: Influencer): boolean {
    return convertStringNumber(item.influence_score) >= this.minScore;
  }
}
