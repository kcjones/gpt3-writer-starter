import { Configuration, OpenAIApi } from 'openai';

console.log(process.env.OPENAI_API_KEY);
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  // Run first prompt
  const basePromptPrefix = 
  `
  Company name is ${req.body.company}. Company mission is "${req.body.mission}". 
  My name is ${req.body.name}.
  Respond to a customer email.
  Appropriately reference our company name and mission. 
  Customer Email:
  `;
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)
  console.log(`API: ${basePromptPrefix}${req.body.company}`)
  console.log(`API: ${basePromptPrefix}${req.body.mission}`)
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();
  console.log(basePromptOutput);

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;