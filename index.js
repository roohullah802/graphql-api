import { connectDB } from "./src/lib/db/connectDB.js";
import cors from "cors";
import express from "express";
import { expressMiddleware } from "@as-integrations/express4";
import dotenv from "dotenv";
import startApolloServer from "./apollo.server.js";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import imagekitUploadApi from "./src/imagekit/uploadApi.js";
import jwt from "jsonwebtoken";
dotenv.config();
connectDB("mongodb://localhost:27017/");
const PORT = process.env.PORT || 8000;

const app = express();
app.use(graphqlUploadExpress());
app.use(
  cors({
    origin: "http://localhost:5771",
    credentials: true,
  }),
);
app.use(express.json());
app.use(
  "/graphql",
  expressMiddleware(await startApolloServer(), {
    context: async ({ req, res }) => {
      const token = req.headers.authorization;

      if (!token) {
        return { user: null, res };
      }

      try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN);
        if (!decode) {
          return { user: null, res };
        }

        return { user: decode, res };
      } catch (error) {
        return { user: null, res };
      }
    },
  }),
);
app.use("/api", imagekitUploadApi);

app.listen(PORT, () => {
  console.log(`server started at: ${PORT}`);
});
