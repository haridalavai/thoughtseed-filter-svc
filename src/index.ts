import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { filterV1 } from "./v1/filter";
import { client } from "./lib/redis-client";

const app = new Hono();

app.get("/", async (c) => {
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
