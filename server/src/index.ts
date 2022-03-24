import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { HelloResolver } from "./resolvers/hello";

const port = 4000;

async function main() {
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  app.get("/hello", (_, res) => {
    res.send("hello world!");
  });

  app.listen(port, () => {
    console.log(`server running on localhost:${port}`);
  });
}

main().catch((err) => console.log("error: ", err));
