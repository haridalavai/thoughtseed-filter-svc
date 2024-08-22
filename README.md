---
"": ""
---

# Thoughtseed-filter-svc

### Prerequisites

Setup aws cdk with cli access creds setup. Refer this [link](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html "Get Started with aws cdk")

sample env:

```txt
REDIS_URL="redis url"
INFLUENCERS_BUCKET="aws bucket"
INFLUENCERS_KEY="file containing influencer details (csv)"
```

### Local Development

Install dependencies:

`npm install`

Run in local:&#x20;

`npm run watch`

> Use AWS SAM to invoke lambda functions locally [refer](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-using-invoke.html)

Run Tests:

`npm run test`

Deploy to Lambda:

`npm run deploy`

---

### Add new filters

create a new filter that extends [IFilter](https://github.com/haridalavai/thoughtseed-filter-svc/blob/main/src/v1/filter/filters/filter-chain.ts), and append it to the filter chain inside [filterV1](https://github.com/haridalavai/thoughtseed-filter-svc/blob/main/src/v1/filter/get.ts "filterV1")

example:

```tsx
export class ExampleFilter implements IFilter<Influencer> {
  private minFollowers: number;

  constructor(minVal: number) {
    this.minVal = minVal;
  }

  apply(item: Influencer): boolean {
    return convertStringNumber(item.followers) >= this.minVal;
  }
}
```

---

### API Reference

live URL: [79iwfl7mqk.execute-api.ap-south-1.amazonaws.com/prod/filter](https://79iwfl7mqk.execute-api.ap-south-1.amazonaws.com/prod/filter)

Example Request:

```txt
curl --location 'https://79iwfl7mqk.execute-api.ap-south-1.amazonaws.com/prod/filter?min_followers=400000000&min_average_likes=1&min_influence_score=1&country=spain'
```

Example Response:&#x20;

```js
{
    "influencers": [
        {
            "rank": "1",
            "channel_info": "cristiano",
            "influence_score": "92",
            "posts": "3.3k",
            "followers": "475.8m",
            "avg_likes": "8.7m",
            "60_day_eng_rate": "1.39%",
            "new_post_avg_like": "6.5m",
            "total_likes": "29.0b",
            "country": "Spain"
        }
    ]
}
```

Accepted query params:

- **min_followers**: Minimum Number of Followers. Example: 1000
- **min_average_likes**: Minimum Average Likes per Post. Example: 100000
- **min_influence_score**: Minimum Influencer Score. Example: 100000
- **country**: Country of the Influencer. Example: India
