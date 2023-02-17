require('dotenv').config();
const OpenAI = require('openai')
const {Configuration, OpenAIApi} = OpenAI

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: "org-MSzKGqG43nicxKtFfb5WPvTB",
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

app.use(bodyParser.json());
app.use(cors());


app.post('/', async(req, res) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Say this is a test",
        max_tokens: 7,
        temperature: 0,
    })
    const message = response.data.choices[0].text
    res.json({message: message})
})

app.listen(port, () => {
    console.log(`Example app listening at ${port}`)
})