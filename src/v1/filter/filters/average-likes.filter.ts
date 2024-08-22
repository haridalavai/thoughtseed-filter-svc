import { Influencer } from "../../../types/influencer";
import { convertStringNumber } from "../../../utils";
import { IFilter } from "./filter-chain";

export class AverageLikesFilter implements IFilter<Influencer> {
  private minLikes: number;

  constructor(minLikes: number) {
    this.minLikes = minLikes;
  }

  apply(item: Influencer): boolean {
    return convertStringNumber(item.avg_likes) >= this.minLikes;
  }
}
