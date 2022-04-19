import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv"
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if(req.body.code == undefined || req.body.instruction == undefined) return;
  const response = await openai.createEdit("text-davinci-edit-001", {
    input: req.body.code,
    instruction: req.body.instruction,
    temperature: 0,
    top_p: 1,
  });
  // console.log(response)
  res.status(200).json({ result: response.data.choices[0].text });
}
