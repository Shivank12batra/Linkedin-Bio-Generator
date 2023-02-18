import React, {useState} from 'react'

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
  const [bio, setBio] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, jobTitle, industry, experience, skills, education, style, tone, funFact}),
    }).then((res) => res.json()).then((data) => setBio(data.message))
  }

  const handleStyleChange = (event) => {
    setStyle(event.target.value);
  };

  const handleToneChange = (event) => {
    setTone(event.target.value);
  };

  return (
    <div>
      <h1>Linkedin Bio Generator</h1>
      <p>Impress recruiters and colleagues with a professional and engaging LinkedIn profile bio, crafted by our AI tool!</p>
      <p>*You can leave the column bank if you don't find it relevant*</p>
      <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name"/>
      <label htmlFor="job-title">Job Title:</label>
      <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} type="text" id="job-title"/>
      <label htmlFor="industry">Industry:</label>
      <input value={industry} onChange={(e) => setIndustry(e.target.value)} type="text" id="industry"/>
      <label htmlFor="experience">Experience:</label>
      <input value={experience} onChange={(e) => setExperience(e.target.value)} type="number" id="experience"/>
      <label htmlFor="education">Education:</label>
      <input value={education} onChange={(e) => setEducation(e.target.value)} type="text" id="experience"/>
      <label htmlFor='skills'>Skills:</label>
      <textArea 
      value={skills}
      onChange={(e) => setSkills(e.target.value)}></textArea>
      <div>
        <h2>Style</h2>
        <input
          type="radio"
          id="option1"
          value="concise"
          checked={style === "concise"}
          onChange={handleStyleChange}
        />
        <label htmlFor="option1">Concise</label>
        <input
          type="radio"
          id="option2"
          value="descriptive"
          checked={style === "descriptive"}
          onChange={handleStyleChange}
        />
        <label htmlFor="option2">Descriptive</label>
    </div>
      <div>
      <h2>Tone</h2>
      <input
        type="radio"
        id="option3"
        value="simple"
        checked={tone === "simple"}
        onChange={handleToneChange}
      />
      <label htmlFor="option3">Simple</label>
      <input
        type="radio"
        id="option4"
        value="verbose"
        checked={tone === "verbose"}
        onChange={handleToneChange}
      />
      <label htmlFor="option4">Verbose</label>
      </div>
      <label htmlFor='funFact'>Fun/Obscure Fact</label>
      <textArea 
      value={funFact}
      onChange={(e) => setFunFact(e.target.value)}></textArea>
      <button type='submit'>Submit</button>
      <label htmlFor='bio'>LinkedIn Bio Generated</label>
      <div>{bio}</div>
      </form>
    </div>
  )
}

export default App
