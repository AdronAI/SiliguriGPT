import { PineconeClient } from "@pinecone-database/pinecone";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { readFile } from "fs/promises";
import * as config from "../config.js";

const client = new PineconeClient();
await client.init({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT,
});
const pineconeIndex = client.Index(process.env.PINECONE_INDEX);

// Document
const docs: Document[] = [];

const rawData = await readFile("Siliguri.txt", "utf8");
const words = rawData.split(" ");

let chunk = "";

words.forEach((word) => {
  chunk += word + " ";
  if (word.endsWith(".") || word.endsWith("!") || word.endsWith("?")) {
    docs.push(new Document({ pageContent: chunk.trim()}));
    chunk = "";
  }
});

// console.log(JSON.stringify(docs, null, 2));

console.log('Inserting documents...');
await PineconeStore.fromDocuments(
  docs,
  new OpenAIEmbeddings(
    {
      verbose: true,
      openAIApiKey: config.OPENAI_KEY,
    },
    { basePath: config.OPENAI_BASE }
  ),
  { pineconeIndex }
);
