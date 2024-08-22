import { Influencer } from "../../../types/influencer";
import { IFilter } from "./filter-chain";

/**
 * @description This class filters influencers based on their country.
 * @example
 * const filter = new CountryFilter("United States");
 * filter.apply(influencer);
 * @class CountryFilter
 * @implements {IFilter<Influencer>}
 * @property {string} country
 * @method apply
 * @param {Influencer} item
 * @returns {boolean}
 */
export class CountryFilter implements IFilter<Influencer> {
  private country: string;

  constructor(country: string) {
    this.country = country;
  }

  apply(item: Influencer): boolean {
    return item.country.toLowerCase().includes(this.country.toLowerCase());
  }
}
