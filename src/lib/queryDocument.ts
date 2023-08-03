import { PineconeClient } from "@pinecone-database/pinecone";
import { VectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";

import * as config from "../config.js";

const client = new PineconeClient();
await client.init({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONMENT,
});
const pineconeIndex = client.Index(process.env.PINECONE_INDEX);

const vectorStore = await PineconeStore.fromExistingIndex(
  new OpenAIEmbeddings(
    {
      verbose: true,
      openAIApiKey: config.OPENAI_KEY,
    },
    { basePath: config.OPENAI_BASE }
  ),
  { pineconeIndex }
);

export { vectorStore }

/* Search the vector DB independently with meta filters */
// const results = await vectorStore.similaritySearch("siliguri", 1);
// console.log(results);


// /* Use as part of a chain (currently no metadata filters) */
// const model = new OpenAI();
// const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
//   k: 1,
//   returnSourceDocuments: true,
// });
// const response = await chain.call({ query: "What is pinecone?" });
// console.log(response);
// /*
// {
//   text: ' A pinecone is the woody fruiting body of a pine tree.',
//   sourceDocuments: [
//     Document {
//       pageContent: 'pinecones are the woody fruiting body and of a pine tree',
//       metadata: [Object]
//     }
//   ]
// }
// */
