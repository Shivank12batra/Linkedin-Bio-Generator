require('dotenv').config();
const OpenAI = require('openai')
const {Configuration, OpenAIApi} = OpenAI

const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

const configuration = new Configuration({
    organization: "org-zNbGgK7B9iLNWZgTaGuAE4jm",
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

app.use(bodyParser.json());
app.use(express.static('build'));


app.post('/api', async(req, res) => {
    const {name, title, industry, experience, skills, education, style, tone, fact} = req.body
    const prompt = `Generate A linkedin Bio For my profile based on the following parameters:
 
    Name: Shivank Batra, Job Title: "", Industry: Computer Science, Experience: 0 years,
    Education:"Bachelors in CS", Skills: HTML CSS React JS Python, Style: Concise, Tone: Verbose,
    Fun Fact: hobbies: play and watch football, chess, metal songs
    
    Bio: I'm Shivank Batra, a recent graduate in Computer Science with a deep passion for cutting-edge technology. I possess expertise in the languages of HTML/CSS, React JS, and Python and am relentlessly driven to refine my skills through innovative projects. During my leisure hours, I engage in football, chess, and revel in the harmonious melodies of metal. I'm highly motivated to broaden my network and pursue opportunities for personal and professional growth.
    
    Name: Shivank Batra, Job Title: "", Industry: Computer Science, Experience: 2 years,
    Education:"Bachelors in CS", Skills: HTML CSS React JS Python, Style: Descriptive, Tone: Verbose, Fun Fact: hobbies: play and watch football, chess, metal songs
    
    Bio: Hi, my name is Shivank Batra, and I am a computer science professional with two years of experience in the industry. I have a Bachelor's degree in Computer Science and specialize in HTML, CSS, React JS, and Python.

    I am passionate about technology and have a keen eye for detail. My analytical mindset and ability to think critically have helped me excel in various projects, delivering solutions that are not only efficient but also user-friendly.
    
    When I'm not coding, I love to indulge in my hobbies. I'm a big football fan and enjoy both playing and watching the sport. I'm also a chess enthusiast and have a reputation for being a good strategist. In my free time, I love to listen to metal songs, which keeps me motivated and energized throughout the day.
    
    If you're looking for a dedicated and detail-oriented professional with a passion for technology then I am your guy!
    
    Name: Ansh Gupta, Job Title: "Financial Analyst", Industry: Finance, Experience: 1 years,Education:"", Skills: Financial Modelling, Style: Concise, Tone: Simple, Fun Fact: anime fanatic 
    
    Bio: Hello, I'm Ansh Gupta, a Financial Analyst with 1 year of experience in the finance industry. I specialize in Financial Modeling, and I'm dedicated to providing accurate and reliable financial analysis. When I'm not working, I enjoy watching anime, which is one of my passions. Feel free to connect with me if you're interested in discussing finance or anime!
    
    Name: Naman Arora, Job Title: "", Industry: "", Experience: 0 years,
    Education:"BMS Student(2nd year)", Skills: Research, Content Writing, Debating, Style: Concise, Tone: Verbose, Fun Fact: ""
    
    Bio: Hey! I'm Naman Arora, a second-year BMS student with skills in research, content writing, and debating. I'm enthusiastic about using my skills and knowledge to pursue opportunities in these areas. Let's connect if you have any opportunities or if you'd like to discuss research, content writing, or debating!

    Name: "", Job Title: Surgeon, Industry: "", Experience: 5 years,
    Education:"MBBS", Skills:"", Style: Descriptive, Tone: Verbose, Fun Fact/hobbies: poetry and running marathons

    Bio: As an experienced surgeon with five years of practice under my belt, I take pride in delivering exceptional care to my patients. I am an MBBS graduate with a passion for precision, attention to detail, and a desire to make a positive impact on the lives of others.

    Beyond the operating room, I am an accomplished poet and marathon runner. These passions allow me to express my creativity and maintain a well-rounded perspective on life.
    
    My dedication to continuous learning and improvement drives me to explore new techniques and collaborate with other medical professionals.
    
    Name: ${name}, Job Title: ${title}, Industry: ${industry}, Experience: ${experience} years, Education: ${education}, Skills: ${skills}, Style: ${style}, Tone: ${tone}, Fun Fact: ${fact}
    
    Bio:`

    const tokens = style === 'concise' ? 100 : 500
    try {
        const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        max_tokens: tokens,
        temperature: 0.4,
    })
    const message = response.data.choices[0].text
    console.log(message)
    res.json({message: message})   
    } catch (error) {
        res.json({message: 'Sorry! Because of too many hits on the server, we are unable to process your request right now.'})
    }
})

app.listen(port, () => {
    console.log(`Example app listening at ${port}`)
})