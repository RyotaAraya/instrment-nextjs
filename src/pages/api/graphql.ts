// Apollo Serverを使用して、GraphQL APIのエンドポイントを作成
// GraphQLのスキーマとリゾルバーを組み合わせて、GraphQL APIエンドポイントを作成しCORS設定をしている

import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import { loadSchemaSync } from "@graphql-tools/load"
import { addResolversToSchema } from "@graphql-tools/schema"
import { ApolloServer } from "apollo-server-micro"
import Cors from "micro-cors"

import { createContext } from "@/graphql/context"
import { resolvers } from "@/graphql/resolvers"

// クロスオリジンリソース共有（CORS）を設定するために、Corsミドルウェアを作成する
const cors = Cors()

// GraphQLのスキーマを定義する
const schema = loadSchemaSync("src/generated/schema.graphql", {
    loaders: [new GraphQLFileLoader()],
})

// スキーマにリゾルバーを追加する
const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers,
})

// Apollo Serverを作成し、スキーマとコンテキストを設定する
const apolloServer = new ApolloServer({
    schema: schemaWithResolvers,
    context: createContext,
})

// Apollo Serverを起動する
const startServer = apolloServer.start()

// エンドポイントを定義する
export default cors(async function handler(req, res) {
    if (req.method === "OPTIONS") {
        res.end()
        return false
    }
    await startServer
    await apolloServer.createHandler({ path: "/api/graphql" })(req, res)
})

// API構成オブジェクトを設定する
export const config = {
    api: {
        bodyParser: false,
    },
}
