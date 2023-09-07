import { ConversationalRetrievalQAChain } from "langchain/chains";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";

import { OpenAI } from "langchain/llms/openai";

import { BufferMemory } from "langchain/memory";

import "dotenv/config";

import * as config from "./config.js";

import { vectorStore } from "./lib/queryDocument.js";

// prompt setup
const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate("Response professionally"),
  HumanMessagePromptTemplate.fromTemplate("{question}"),
]);

const model = new OpenAI(
  {
    openAIApiKey: config.OPENAI_KEY,
  },
  { basePath: config.OPENAI_BASE }
);

const chain = ConversationalRetrievalQAChain.fromLLM(
  model,
  vectorStore.asRetriever(),
  {
    memory: new BufferMemory({ memoryKey: "chat_history" }),
  }
);


export { chain };
