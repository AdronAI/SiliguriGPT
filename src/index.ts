import { RetrievalQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { readFile } from "fs/promises";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


import "dotenv/config";

import * as config from "./config.js";

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
  query: "Current city?",
});
console.log(res.text);

