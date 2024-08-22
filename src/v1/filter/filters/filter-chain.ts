export interface IFilter<T> {
  apply(item: T): boolean;
}

export enum FilterParams {
  MIN_INFLUENCE_SCORE = "min_influence_score",
  MIN_AVERAGE_LIKES = "min_average_likes",
  MIN_FOLLOWERS = "min_followers",
  COUNTRY = "country",
}

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
