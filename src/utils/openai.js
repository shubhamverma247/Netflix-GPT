import OpenAI from "openai";
import { OPENAI } from "./constants";

const openai = new OpenAI({
  apiKey: OPENAI,
  dangerouslyAllowBrowser: true,
});

export default openai;
