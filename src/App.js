import React, {useState, useEffect, useRef} from 'react'
import './App.css';


const App = () => {
  const [name, setName] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [industry, setIndustry] = useState('')
  const [experience, setExperience] = useState(0)
  const [skills, setSkills] = useState('')
  const [education, setEducation] = useState('')
  const [style, setStyle] = useState('concise')
  const [tone, setTone] = useState('simple')
  const [funFact, setFunFact] = useState('')
  const [response, setResponse] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [bio, setBio] = useState('')
  const shouldTriggerEffectRef = useRef(true);

  useEffect(() => {
    // update the text in state, one letter at a time
    if (shouldTriggerEffectRef.current) {
      const intervalId = setInterval(() => {
        if (currentIndex >= response.length) {
          clearInterval(intervalId);
        } else {
          setBio(response.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }
      }, 100);
      return () => clearInterval(intervalId);
    }
  }, [currentIndex, response])
  

  const handleSubmit = (e) => {
    e.preventDefault();
    shouldTriggerEffectRef.current = false
    setCurrentIndex(0)
    setResponse('')
    setBio('')
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, jobTitle, industry, experience, skills, education, style, tone, funFact}),
    }).then((res) => res.json()).then((data) => {
      shouldTriggerEffectRef.current = true
      setResponse(data.message)
    })
  }

  const handleStyleChange = (event) => {
    setStyle(event.target.value);
  };

  const handleToneChange = (event) => {
    setTone(event.target.value);
  };

  return (
    <div className='container'>
      <h1 className='heading'> LinkedIn Bio Generator</h1>
      <div className='icon-btn'><i class="fa fa-linkedin"></i></div>
      <p className='description'>Impress recruiters and colleagues with a professional and engaging LinkedIn profile bio, crafted by our AI tool!</p>
      <p className='disclaimer'>*You can leave the column bank if you don't find it relevant*</p>
      <form className='form-class' onSubmit={handleSubmit}>
      <div className='input-container'>
      <label htmlFor="name">Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder='John Doe' type="text" id="name"/>
      </div>
      <div className='input-container'>
      <label htmlFor="job-title">Job Title</label>
      <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder='Financial Analyst' type="text" id="job-title"/>
      </div>
      <div className='input-container'>
      <label htmlFor="industry">Industry</label>
      <input value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder='Finance' type="text" id="industry"/>
      </div>
      <div className='input-container'>
      <label htmlFor="experience">Experience</label>
      <input value={experience} onChange={(e) => setExperience(e.target.value)} type="number" min='0' id="experience"/>
      </div>
      <div className='input-container'>
      <label htmlFor="education">Education</label>
      <input value={education} onChange={(e) => setEducation(e.target.value)} placeholder='MBA In Finance' type="text" id="experience"/>
      </div>
      <div className='input-container'>
      <label htmlFor='skills'>Skills</label>
      <input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder='Financial Modelling, MS Excel' type='text' id='funFact'/>
      </div>
      <div className='input-container'>
        <label htmlFor='style'>Style</label>
        <div>
        <input
          type="radio"
          id="option1"
          value="concise"
          checked={style === "concise"}
          onChange={handleStyleChange}
        />
        <label htmlFor="option1" className='radio-label'>Concise</label>
        <input
          type="radio"
          id="option2"
          value="descriptive"
          checked={style === "descriptive"}
          onChange={handleStyleChange}
        />
        <label htmlFor="option2" className='radio-label'>Descriptive</label>
        </div>
    </div>
      <div className='input-container'>
      <label htmlFor='tone'>Tone</label>
      <div>
      <input
        type="radio"
        id="option3"
        value="simple"
        checked={tone === "simple"}
        onChange={handleToneChange}
      />
      <label htmlFor="option3" className='radio-label'>Simple</label>
      <input
        type="radio"
        id="option4"
        value="verbose"
        checked={tone === "verbose"}
        onChange={handleToneChange}
      />
      <label htmlFor="option4" className='radio-label'>Verbose</label>
      </div>
      </div>
      <div className='input-container'>
      <label htmlFor='funFact'>Fun Fact</label>
      <input value={funFact} onChange={(e) => setFunFact(e.target.value)} placeholder='quick learner, likes anime, plays guitar' type='text' id='funFact'/>
      </div>
      <button type='submit' className='submit-btn'>Generate Bio</button>
      <textarea  value={bio} cols={50} rows={10} placeholder='your LinkedIn Bio Will Be Generated Here'></textarea>
      </form>
      <footer className='footer-class'>
        Made with <span style={{'margin':'0.3rem'}}><i class="fa fa-heart"></i></span> by <span> <a href='https://github.com/Shivank12batra' target='_blank' rel='noreferrer' className='name-link'>Shivank</a></span>
      </footer>
    </div>
  )
}

export default App
