import PromptSync from "prompt-sync";
const prompt = PromptSync({ sigint: true });
import {
  RetrievalQAChain,
  ConversationalRetrievalQAChain,
} from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { readFile } from "fs/promises";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { BufferMemory } from "langchain/memory";

import { chain } from "../index.js";
import * as config from "../config.js";

const model = new OpenAI(
  {
    openAIApiKey: config.OPENAI_KEY,
  },
  { basePath: config.OPENAI_BASE }
);


while (true) {
  const question = prompt('Question: ');

  const res = await chain.call({
    question,
  });
  console.log(res.text);
  // const question = prompt('Question: ');

}