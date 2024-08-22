import { Influencer } from "../../../types/influencer";
import { convertStringNumber } from "../../../utils";
import { IFilter } from "./filter-chain";

export class FollowersFilter implements IFilter<Influencer> {
  private minFollowers: number;

  constructor(minFollowers: number) {
    this.minFollowers = minFollowers;
  }

  apply(item: Influencer): boolean {
    return convertStringNumber(item.followers) >= this.minFollowers;
  }
}
