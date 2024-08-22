// tests for filter.ts
import { FilterChain } from "./filter-chain";
import { IFilter } from "./filter-chain";
import { Influencer } from "../../../types/influencer";
import { convertStringNumber } from "../../../utils";

import { FollowersFilter } from "./followers.filter";
import { AverageLikesFilter } from "./average-likes.filter";
import { InfluenceScoreFilter } from "./influence-score.filter";
import { CountryFilter } from "./country.filter";

const influencers: Influencer[] = [
  {
    rank: "1",
    channel_info: "cristiano",
    influence_score: "92",
    posts: "3.3k",
    followers: "475.8m",
    avg_likes: "8.7m",
    "60_day_eng_rate": "1.39%",
    new_post_avg_like: "6.5m",
    total_likes: "29.0b",
    country: "Spain",
  },
  {
    rank: "2",
    channel_info: "therock",
    influence_score: "91",
    posts: "6.2k",
    followers: "239.1m",
    avg_likes: "2.5m",
    "60_day_eng_rate": "0.65%",
    new_post_avg_like: "2.3m",
    total_likes: "15.6b",
    country: "USA",
  },
  {
    rank: "3",
    channel_info: "kyliejenner",
    influence_score: "90",
    posts: "6.5k",
    followers: "238.1m",
    avg_likes: "6.3m",
    "60_day_eng_rate": "1.05%",
    new_post_avg_like: "5.9m",
    total_likes: "40.9b",
    country: "USA",
  },
  {
    rank: "4",
    channel_info: "kimkardashian",
    influence_score: "89",
    posts: "4.4k",
    followers: "227.3m",
    avg_likes: "3.5m",
    "60_day_eng_rate": "0.78%",
    new_post_avg_like: "3.2m",
    total_likes: "15.3b",
    country: "USA",
  },
  {
    rank: "5",
    channel_info: "leomessi",
    influence_score: "88",
    posts: "492",
    followers: "220.2m",
    avg_likes: "7.3m",
    "60_day_eng_rate": "1.05%",
    new_post_avg_like: "6.9m",
    total_likes: "3.6b",
    country: "Argentina",
  },
];

describe("FilterChain", () => {
  it("should filter influencers based on country", () => {
    const filterChain = new FilterChain<Influencer>();

    const filters: IFilter<Influencer>[] = [new CountryFilter("USA")];

    filters.forEach((filter) => filterChain.addFilter(filter));

    const filteredInfluencers = filterChain.applyFilters(influencers);

    expect(filteredInfluencers).toEqual([
      {
        rank: "2",
        channel_info: "therock",
        influence_score: "91",
        posts: "6.2k",
        followers: "239.1m",
        avg_likes: "2.5m",
        "60_day_eng_rate": "0.65%",
        new_post_avg_like: "2.3m",
        total_likes: "15.6b",
        country: "USA",
      },
      {
        rank: "3",
        channel_info: "kyliejenner",
        influence_score: "90",
        posts: "6.5k",
        followers: "238.1m",
        avg_likes: "6.3m",
        "60_day_eng_rate": "1.05%",
        new_post_avg_like: "5.9m",
        total_likes: "40.9b",
        country: "USA",
      },
      {
        rank: "4",
        channel_info: "kimkardashian",
        influence_score: "89",
        posts: "4.4k",
        followers: "227.3m",
        avg_likes: "3.5m",
        "60_day_eng_rate": "0.78%",
        new_post_avg_like: "3.2m",
        total_likes: "15.3b",
        country: "USA",
      },
    ]);
  });

  it("should filter influencers based on followers", () => {
    const filterChain = new FilterChain<Influencer>();

    const filters: IFilter<Influencer>[] = [new FollowersFilter(400000000)];

    filters.forEach((filter) => filterChain.addFilter(filter));

    const filteredInfluencers = filterChain.applyFilters(influencers);

    expect(filteredInfluencers).toEqual([
      {
        rank: "1",
        channel_info: "cristiano",
        influence_score: "92",
        posts: "3.3k",
        followers: "475.8m",
        avg_likes: "8.7m",
        "60_day_eng_rate": "1.39%",
        new_post_avg_like: "6.5m",
        total_likes: "29.0b",
        country: "Spain",
      },
    ]);
  });

  it("should filter influencers based on average likes", () => {
    const filterChain = new FilterChain<Influencer>();

    const filters: IFilter<Influencer>[] = [new AverageLikesFilter(7000000)];

    filters.forEach((filter) => filterChain.addFilter(filter));

    const filteredInfluencers = filterChain.applyFilters(influencers);

    expect(filteredInfluencers).toEqual([
      {
        rank: "1",
        channel_info: "cristiano",
        influence_score: "92",
        posts: "3.3k",
        followers: "475.8m",
        avg_likes: "8.7m",
        "60_day_eng_rate": "1.39%",
        new_post_avg_like: "6.5m",
        total_likes: "29.0b",
        country: "Spain",
      },
      {
        rank: "5",
        channel_info: "leomessi",
        influence_score: "88",
        posts: "492",
        followers: "220.2m",
        avg_likes: "7.3m",
        "60_day_eng_rate": "1.05%",
        new_post_avg_like: "6.9m",
        total_likes: "3.6b",
        country: "Argentina",
      },
    ]);
  });

  it("should filter influencers based on influence score", () => {
    const filterChain = new FilterChain<Influencer>();

    const filters: IFilter<Influencer>[] = [new InfluenceScoreFilter(90)];

    filters.forEach((filter) => filterChain.addFilter(filter));

    const filteredInfluencers = filterChain.applyFilters(influencers);

    expect(filteredInfluencers).toEqual([
      {
        rank: "1",
        channel_info: "cristiano",
        influence_score: "92",
        posts: "3.3k",
        followers: "475.8m",
        avg_likes: "8.7m",
        "60_day_eng_rate": "1.39%",
        new_post_avg_like: "6.5m",
        total_likes: "29.0b",
        country: "Spain",
      },
      {
        rank: "2",
        channel_info: "therock",
        influence_score: "91",
        posts: "6.2k",
        followers: "239.1m",
        avg_likes: "2.5m",
        "60_day_eng_rate": "0.65%",
        new_post_avg_like: "2.3m",
        total_likes: "15.6b",
        country: "USA",
      },
      {
        rank: "3",
        channel_info: "kyliejenner",
        influence_score: "90",
        posts: "6.5k",
        followers: "238.1m",
        avg_likes: "6.3m",
        "60_day_eng_rate": "1.05%",
        new_post_avg_like: "5.9m",
        total_likes: "40.9b",
        country: "USA",
      },
    ]);
  });

  it("should filter influencers based on multiple filters", () => {
    const filterChain = new FilterChain<Influencer>();

    const filters: IFilter<Influencer>[] = [
      new CountryFilter("USA"),
      new FollowersFilter(200000000),
      new AverageLikesFilter(6000000),
    ];

    filters.forEach((filter) => filterChain.addFilter(filter));

    const filteredInfluencers = filterChain.applyFilters(influencers);

    expect(filteredInfluencers).toEqual([
      {
        rank: "3",
        channel_info: "kyliejenner",
        influence_score: "90",
        posts: "6.5k",
        followers: "238.1m",
        avg_likes: "6.3m",
        "60_day_eng_rate": "1.05%",
        new_post_avg_like: "5.9m",
        total_likes: "40.9b",
        country: "USA",
      },
    ]);
  });

  it("should return all influencers if no filters are applied", () => {
    const filterChain = new FilterChain<Influencer>();

    const filteredInfluencers = filterChain.applyFilters(influencers);

    expect(filteredInfluencers).toEqual(influencers);
  });
});
