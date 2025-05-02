import React from 'react'
import axios from 'axios'
export default function AddQuestionToSection () {
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    marks: 0,
    negative: 0,
    answerOptions: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false }
    ]
  })
  const handleAddQuestion = async e => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v2/test/${id}/section/${currSection._id}/add-question`,
        newQuestion,
        { withCredentials: true }
      )
      const updatedSection = response.data // Assuming backend returns updated section
      setCurrSection(updatedSection)
      // Also update currTest.sections
      setCurrTest(prev => ({
        ...prev,
        sections: prev.sections.map(sec =>
          sec._id === updatedSection._id ? updatedSection : sec
        )
      }))
      // Reset question form
      setNewQuestion({
        question: '',
        marks: 0,
        negative: 0,
        answerOptions: [
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false }
        ]
      })
    } catch (err) {
      console.error(err)
      alert('Failed to add question')
    }
  }
  return (
    <>
      <form onSubmit={handleAddQuestion}>
        <input
          type='text'
          required
          className='custominput'
          placeholder='Question'
          value={newQuestion.question}
          onChange={e =>
            setNewQuestion(prev => ({ ...prev, question: e.target.value }))
          }
        />
        <input
          required
          type='number'
          placeholder='Marks'
          className='custominput'
          value={newQuestion.marks}
          onChange={e =>
            setNewQuestion(prev => ({
              ...prev,
              marks: parseInt(e.target.value) || 0
            }))
          }
        />

        <input
          required
          type='number'
          placeholder='Negative'
          className='custominput'
          value={newQuestion.negative}
          onChange={e =>
            setNewQuestion(prev => ({
              ...prev,
              negative: parseInt(e.target.value) || 0
            }))
          }
        />

        {newQuestion.answerOptions.map((opt, idx) => (
          <div className=' flex w-[400px] mt-3 gap-3' key={idx}>
            <input
              required
              type='text'
              className='custominput'
              placeholder='Option text'
              value={opt.text}
              onChange={e => {
                const updatedOptions = [...newQuestion.answerOptions]
                updatedOptions[idx].text = e.target.value
                setNewQuestion(prev => ({
                  ...prev,
                  answerOptions: updatedOptions
                }))
              }}
            />
            <input
              type='radio'
              name='correctOption'
              checked={opt.isCorrect}
              onChange={() => {
                const updatedOptions = newQuestion.answerOptions.map(
                  (o, i) => ({
                    ...o,
                    isCorrect: i === idx
                  })
                )
                setNewQuestion(prev => ({
                  ...prev,
                  answerOptions: updatedOptions
                }))
              }}
            />
          </div>
        ))}

        <Tooltip title={'Add question'}>
          <Button
            type='submit'
            variant='contained'
            sx={{ fontSize: 10, marginY: '10px' }}
          >
            Question <Add sx={{ fontSize: 17, marginLeft: '4px' }} />
          </Button>
        </Tooltip>
      </form>
    </>
  )
}
