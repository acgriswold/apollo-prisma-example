import { readFileSync } from "fs";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import resolvers from "./resolvers/index.js";
import { PrismaClientType, prisma } from "./db.js";

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

export interface MyContext {
  dataSources: {
    prisma: PrismaClientType;
  };
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});
const environmentPort = parseInt(process.env.APOLLO_SERVER_PORT || '');
const port = Number.isInteger(environmentPort) ? environmentPort : 4000;

const { url } = await startStandaloneServer(server, {
  listen: { port },
  context: async () => {
    return {
      dataSources: {
        prisma: prisma
      },
    };
  },
});

console.log(`🚀 Server listening at: ${url}`);
