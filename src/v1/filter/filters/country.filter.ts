import { Influencer } from "../../../types/influencer";
import { IFilter } from "./filter-chain";

export class CountryFilter implements IFilter<Influencer> {
  private country: string;

  constructor(country: string) {
    this.country = country;
  }

  apply(item: Influencer): boolean {
    return item.country.toLowerCase().includes(this.country.toLowerCase());
  }
}
