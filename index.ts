import { PineconeClient } from "@pinecone-database/pinecone";
import { Document } from "langchain/document";
import { RetrievalQAChain, VectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { readFile } from "fs/promises";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import "dotenv/config";

import * as config from "./config.js";

// const client = new PineconeClient();
// await client.init({
//   apiKey: process.env.PINECONE_API_KEY as string,
//   environment: process.env.PINECONE_ENVIRONMENT as string,
// });
// const pineconeIndex = client.Index(process.env.PINECONE_INDEX as string);

// const vectorStore = await PineconeStore.fromExistingIndex(
//   new OpenAIEmbeddings(
//     {
//       openAIApiKey: config.OPENAI_KEY,
//     },
//     { basePath: config.OPENAI_BASE }
//   ),
//   { pineconeIndex }
// );
const model = new OpenAI(
  {
    openAIApiKey: config.OPENAI_KEY,
  },
  { basePath: config.OPENAI_BASE }
);

const text = await readFile("Siliguri.txt", "utf8");
const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
const docs = await textSplitter.createDocuments([text]);

// Create a vector store from the documents.
const vectorStore = await HNSWLib.fromDocuments(
  docs,
  new OpenAIEmbeddings(
    {
      openAIApiKey: config.OPENAI_KEY,
    },
    { basePath: config.OPENAI_BASE }
  )
);
const vectorStoreRetriever = vectorStore.asRetriever();

const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);

const res = await chain.call({
  query: "Name some amusement parks in siliguri?",
});
console.log(res.text);
