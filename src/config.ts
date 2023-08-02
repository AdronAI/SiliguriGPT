import 'dotenv/config'

export const OPENAI_BASE = process.env.OPENAI_BASE ? process.env.OPENAI_BASE : process.env.GPT_BASE
export const OPENAI_KEY = process.env.OPENAI_KEY ? process.env.OPENAI_KEY : process.env.GPT_KEY

