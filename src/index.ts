import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { filterV1 } from "./v1/filter";
import { client } from "./lib/redis-client";

const app = new Hono();

/**
 * @description filter endpoint
 * @method GET
 * @param query
 * @returns influencers
 * @example
 * GET /filter?min_followers=1000000
 */

app.get("/filter", async (c) => {
  try {
    const queryParam = c.req.query();
    const filteredInfluencers = await filterV1(queryParam);
    return c.json({
      influencers: filteredInfluencers,
    });
  } catch (err) {
    console.log(err);
    return c.json({
      message: "An error occurred!",
    });
  }
});

export const handler = handle(app);
