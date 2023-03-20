import React, { useEffect, useRef} from 'react'
import './App.css';
import {FormState} from './Reducers.js'


const App = () => {
  const {state: {name, title,
     industry, experience,
     skills, education,
     style, tone,
     fact, response,
     idx:currentIndex, bio 
    }, dispatch} = FormState()
    console.log(currentIndex)
  const shouldTriggerEffectRef = useRef(true);

  useEffect(() => {
    // update the text in state, one letter at a time
    if (shouldTriggerEffectRef.current) {
      const intervalId = setInterval(() => {
        if (currentIndex >= response.length) {
          clearInterval(intervalId);
        } else {
          dispatch({type: 'CHANGE_BIO', payload: response.substring(0, currentIndex + 1)})
          dispatch({type: 'CHANGE_IDX', payload: currentIndex + 1})
          // setBio(response.substring(0, currentIndex + 1));
          // setCurrentIndex(currentIndex + 1);
        }
      }, 100);
      return () => clearInterval(intervalId);
    }
  }, [currentIndex, response])
  

  const handleSubmit = (e) => {
    e.preventDefault();
    shouldTriggerEffectRef.current = false
    dispatch({type: 'CHANGE_IDX', payload: 0})
    dispatch({type: 'CHANGE_RESPONSE', payload: ''})
    dispatch({type: 'CHANGE_BIO', payload: ''})
    // setCurrentIndex(0)
    // setResponse('')
    // setBio('')
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, title, industry, experience, skills, education, style, tone, fact}),
    }).then((res) => res.json()).then((data) => {
      shouldTriggerEffectRef.current = true
      dispatch({type: 'CHANGE_RESPONSE', payload: data.message})
      // setResponse(data.message)
    })
  }

  return (
    <div className='container'>
      <h1 className='heading'> LinkedIn Bio Generator</h1>
      <div className='icon-btn'><i class="fa fa-linkedin"></i></div>
      <p className='description'>Impress recruiters and colleagues with a professional and engaging LinkedIn profile bio, crafted by our AI tool!</p>
      <p className='disclaimer'>*You can leave the column bank if you don't find it relevant*</p>
      <form className='form-class' onSubmit={handleSubmit}>
      <div className='input-container'>
      <label htmlFor="name">Name</label>
      <input value={name} onChange={(e) => dispatch({
        type: 'CHANGE_NAME',
        payload: e.target.value
      })} placeholder='John Doe' type="text" id="name"/>
      </div>
      <div className='input-container'>
      <label htmlFor="job-title">Job Title</label>
      <input value={title} onChange={(e) => dispatch({
        type: 'CHANGE_TITLE',
        payload: e.target.value
      })} placeholder='Financial Analyst' type="text" id="job-title"/>
      </div>
      <div className='input-container'>
      <label htmlFor="industry">Industry</label>
      <input value={industry} onChange={(e) => dispatch({
        type: 'CHANGE_INDUSTRY',
        payload: e.target.value
      })} placeholder='Finance' type="text" id="industry"/>
      </div>
      <div className='input-container'>
      <label htmlFor="experience">Experience</label>
      <input value={experience} onChange={(e) => dispatch({
        type: 'CHANGE_EXPERIENCE',
        payload: parseInt(e.target.value)
      })} type="number" min='0' id="experience"/>
      </div>
      <div className='input-container'>
      <label htmlFor="education">Education</label>
      <input value={education} onChange={(e) => dispatch({
        type: 'CHANGE_EDUCATION',
        payload: e.target.value
      })} placeholder='MBA In Finance' type="text" id="experience"/>
      </div>
      <div className='input-container'> 
      <label htmlFor='skills'>Skills</label>
      <input value={skills} onChange={(e) => dispatch({
        type: 'CHANGE_SKILLS',
        payload: e.target.value
      })} placeholder='Financial Modelling, MS Excel' type='text' id='funFact'/>
      </div>
      <div className='input-container'>
        <label htmlFor='style'>Style</label>
        <div>
        <input
          type="radio"
          id="option1"
          value="concise"
          checked={style === "concise"}
          onChange={(e) => dispatch({
            type: 'CHANGE_STYLE',
            payload: e.target.value
          })}
        />
        <label htmlFor="option1" className='radio-label'>Concise</label>
        <input
          type="radio"
          id="option2"
          value="descriptive"
          checked={style === "descriptive"}
          onChange={(e) => dispatch({
            type: 'CHANGE_STYLE',
            payload: e.target.value
          })}
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
        onChange={(e) => dispatch({
          type: 'CHANGE_TONE',
          payload: e.target.value
        })}
      />
      <label htmlFor="option3" className='radio-label'>Simple</label>
      <input
        type="radio"
        id="option4"
        value="verbose"
        checked={tone === "verbose"}
        onChange={(e) => dispatch({
          type: 'CHANGE_TONE',
          payload: e.target.value
        })}
      />
      <label htmlFor="option4" className='radio-label'>Verbose</label>
      </div>
      </div>
      <div className='input-container'>
      <label htmlFor='funFact'>Fun Fact</label>
      <input value={fact} onChange={(e) => dispatch({
            type: 'CHANGE_FACT',
            payload: e.target.value
          })}placeholder='quick learner, likes anime, plays guitar' type='text' id='funFact'/>
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
