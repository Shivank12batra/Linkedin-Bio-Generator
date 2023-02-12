import React, {useState} from 'react'

const App = () => {
  const [name, setName] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [industry, setIndustry] = useState('')
  const [experience, setExperience] = useState(0)
  const [skills, setSkills] = useState('')
  const [education, setEducation] = useState('concise')
  const [style, setStyle] = useState('')
  const [tone, setTone] = useState('simple')
  const [funFact, setFunFact] = useState('')
  const [bio, setBio] = useState('')

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
      <form>
      <label htmlFor="name">Name:</label>
      <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name"/>
      <label htmlFor="job-title">Job Title:</label>
      <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} type="text" id="job-title"/>
      <label htmlFor="industry">Industry:</label>
      <input value={industry} onChange={(e) => setIndustry(e.target.value)} type="text" id="industry"/>
      <label htmlFor="experience">Experience:</label>
      <input value={experience} onChange={(e) => setExperience(e.target.value)} type="number" id="experience"/>
      <label htmlFor="education">Education:</label>
      <input value={education} onChange={(e) => setEducation(e.target.value)} type="number" id="experience"/>
      <label htmlFor='skills'>Skills:</label>
      <textarea 
      value={skills}
      onChange={(e) => setSkills(e.target.value)}></textarea>
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
      <h2>Tone</h2>
      <input
        type="radio"
        id="option1"
        value="simple"
        checked={tone === "simple"}
        onChange={handleToneChange}
      />
      <label htmlFor="option1">Simple</label>
      <input
        type="radio"
        id="option2"
        value="verbose"
        checked={tone === "verbose"}
        onChange={handleToneChange}
      />
      <label htmlFor="option2">Verbose</label>
      <label htmlFor='funFact'>Fun/Obscure Fact</label>
      <textarea 
      value={funFact}
      onChange={(e) => setFunFact(e.target.value)}></textarea>
      <button>Submit</button>
      <label htmlFor='bio'>LinkedIn Bio Generated</label>
      <textArea value={bio}></textArea>
      </form>
    </div>
  )
}

export default App
