import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../../lib/config'
import { Add, Close } from '@mui/icons-material'
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar
} from '@mui/material'
import { Editor } from '@monaco-editor/react'

const AddProblemForm = ({ closeModal,setSnackbar }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'Easy'
  })

  const [sampleTestCases, setSampleTestCases] = useState([
    { input: '', output: '', explanation: '' }
  ])
  const [testCases, setTestCases] = useState([{ input: '', output: '' }])
  const [functionSignatures, setFunctionSignatures] = useState([])
  const [language, setLanguage] = useState('python')
  const [signature, setSignature] = useState('')

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleTestCaseChange = (index, field, value, isSample = false) => {
    const updated = isSample ? [...sampleTestCases] : [...testCases]
    updated[index][field] = value
    isSample ? setSampleTestCases(updated) : setTestCases(updated)
  }

  const addTestCase = (isSample = false) => {
    const newCase = isSample
      ? { input: '', output: '', explanation: '' }
      : { input: '', output: '' }
    isSample
      ? setSampleTestCases([...sampleTestCases, newCase])
      : setTestCases([...testCases, newCase])
  }

  const removeTestCase = (index, isSample = false) => {
    const updated = isSample ? [...sampleTestCases] : [...testCases]
    updated.splice(index, 1)
    isSample ? setSampleTestCases(updated) : setTestCases(updated)
  }

  const addFunctionSignature = () => {
    if (functionSignatures.some(fs => fs.language === language)) {
      alert(`Signature for ${language} already exists`)
      return
    }
    setFunctionSignatures([...functionSignatures, { language, signature }])
    setSignature('') // Clear signature input after adding
  }

  const removeFunctionSignature = index => {
    const updated = [...functionSignatures]
    updated.splice(index, 1)
    setFunctionSignatures(updated)
  }
  const handleSubmit = async e => {
    e.preventDefault()
  
    const payload = {
      ...formData,
      sampleTestCases,
      testCases,
      functionSignatures
    }
  
    try {
      const res = await axios.post(`${BASE_URL}/api/v2/test/problem/add`, { ...formData , sampleTestCases,testCases,functionSignatures }, { withCredentials: true })
      console.log('Submitted data', payload)
      
      // Reset form
      setFormData({ title: '', description: '', difficulty: 'Easy' })
      setSampleTestCases([{ input: '', output: '', explanation: '' }])
      setTestCases([{ input: '', output: '' }])
      setFunctionSignatures([]);
      setSnackbar({
        open: true,
        message: res.data.message,
        severity: 'success'
      })
      closeModal();
    } catch (error) {
      console.error(error)
      setSnackbar({
        open: true,
        message: res.data.message,
        severity: 'error'
      })
    }
  }
  

  return (
    <div className='fixed top-0 left-0 z-50 h-screen overflow-y-scroll bg-opacity-30 inset-0 bg-black rounded-lg'>
      <div className='flex flex-col py-5  w-screen h-screen' >
        <div className='flex w-full fixed top-5 right-5 z-50 justify-end px-6 py-3'>
          <IconButton  sx={{bgcolor:"#000", color:"#fff"}} onClick={closeModal}>
            <Close color='inherit' />
          </IconButton>
        </div>
        <div className='max-w-4xl mx-auto p-6 bg-white shadow rounded-lg'>
          <h2 className='text-2xl font-bold mb-4'>Add a New Problem</h2>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label className='block font-medium'>Title</label>
              <input
                name='title'
                value={formData.title}
                onChange={handleInputChange}
                className='w-full border p-2 rounded mt-1'
                required
              />
            </div>

            <div>
              <label className='block font-medium'>Description</label>
              <textarea
                name='description'
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className='w-full border p-2 rounded mt-1'
                required
              />
            </div>

            <div>
              <label className='block font-medium'>Difficulty</label>
              <select
                name='difficulty'
                value={formData.difficulty}
                onChange={handleInputChange}
                className='w-full border p-2 rounded mt-1'
                required
              >
                <option value='Easy'>Easy</option>
                <option value='Medium'>Medium</option>
                <option value='Hard'>Hard</option>
              </select>
            </div>

            {/* Function Signatures */}
            <div>
              <h3 className='font-semibold mb-2'>Function Signatures</h3>
              {functionSignatures.map((fs, idx) => (
                <div key={idx} className='mb-4 border p-3 rounded'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                    <div>
                      <strong>Language: </strong>
                      {fs.language}
                    </div>
                    <div>
                      <strong>Signature: </strong>
                      {fs.signature}
                    </div>
                  </div>
                  <button
                    type='button'
                    onClick={() => removeFunctionSignature(idx)}
                    className='text-red-500 mt-1 text-sm'
                  >
                    ❌ Remove
                  </button>
                </div>
              ))}
              <div className='grid grid-cols-1  gap-2'>
                <FormControl fullWidth>
                  <Select
                    variant='standard'
                    className='px-3'
                    onChange={e => setLanguage(e.target.value)}
                    value={language}
                  >
                    <MenuItem value='cpp'>C++</MenuItem>
                    <MenuItem value='c'>C</MenuItem>
                    <MenuItem value='java'>Java</MenuItem>
                    <MenuItem value='python'>Python</MenuItem>
                  </Select>
                </FormControl>

                <div className='w-full'>
                  <Editor
                    height='300px'
                    language={language === 'python' ? 'python' : language}
                    theme='vs-light'
                    value={signature}
                    onChange={value => setSignature(value)}
                    options={{
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      fontSize: 14,
                      padding: '10px'
                    }}
                  />
                </div>
              </div>
              <button
                type='button'
                onClick={addFunctionSignature}
                className='bg-green-100 mt-3 border border-green-500 px-2 py-1 rounded text-sm'
              >
                ➕ Add Function Signature
              </button>
            </div>

            {/* Test Cases */}
            <div>
              <h3 className='font-semibold mb-2'>Test Cases</h3>
              {testCases.map((tc, idx) => (
                <div key={idx} className='mb-4 border p-3 rounded'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                    <input
                      type='text'
                      placeholder='Input'
                      value={tc.input}
                      onChange={e =>
                        handleTestCaseChange(idx, 'input', e.target.value)
                      }
                      className='p-2 border rounded'
                      required
                    />
                    <input
                      type='text'
                      placeholder='Output'
                      value={tc.output}
                      onChange={e =>
                        handleTestCaseChange(idx, 'output', e.target.value)
                      }
                      className='p-2 border rounded'
                      required
                    />
                  </div>
                  <button
                    type='button'
                    onClick={() => removeTestCase(idx)}
                    className='text-red-500 mt-1 text-sm'
                  >
                    ❌ Remove
                  </button>
                </div>
              ))}
              <button
                type='button'
                onClick={() => addTestCase()}
                className='bg-green-100 border border-green-500 px-2 py-1 rounded text-sm'
              >
                ➕ Add Test Case
              </button>
            </div>

            {/* Sample Test Cases */}
            <div>
              <h3 className='font-semibold mb-2'>Sample Test Cases</h3>
              {sampleTestCases.map((tc, idx) => (
                <div key={idx} className='mb-4 border p-3 rounded'>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                    <input
                      type='text'
                      placeholder='Input'
                      value={tc.input}
                      onChange={e =>
                        handleTestCaseChange(idx, 'input', e.target.value, true)
                      }
                      className='p-2 border rounded'
                      required
                    />
                    <input
                      type='text'
                      placeholder='Output'
                      value={tc.output}
                      onChange={e =>
                        handleTestCaseChange(
                          idx,
                          'output',
                          e.target.value,
                          true
                        )
                      }
                      className='p-2 border rounded'
                      required
                    />
                    <input
                      type='text'
                      placeholder='Explanation'
                      value={tc.explanation}
                      onChange={e =>
                        handleTestCaseChange(
                          idx,
                          'explanation',
                          e.target.value,
                          true
                        )
                      }
                      className='p-2 border rounded'
                    />
                  </div>
                  <button
                    type='button'
                    onClick={() => removeTestCase(idx, true)}
                    className='text-red-500 mt-1 text-sm'
                  >
                    ❌ Remove
                  </button>
                </div>
              ))}
              <button
                type='button'
                onClick={() => addTestCase(true)}
                className='bg-green-100 border border-green-500 px-2 py-1 rounded text-sm'
              >
                ➕ Add Sample Test Case
              </button>
            </div>

            <div className='pt-4'>
              <button
                type='submit'
                className='bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition'
              >
                Submit Problem
              </button>
            </div>
          </form>
        </div>
         ̰
      </div>
    </div>
  )
}
export default function ManageProblems ({ testId, sectionId }) {
  const [showAddProblemModal, setShowProblemModal] = useState(false)
  const [problems, setProblems] = useState([])
  const [selectedProblemId, setSelectedProblemId] = useState('')
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const getAllProblems = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${BASE_URL}/api/v2/test/problems/get`, {
        withCredentials: true
      })
      setProblems(res.data)
    } catch (err) {
      console.error(err)
      setSnackbar({
        open: true,
        message: 'Failed to fetch problems',
        severity: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const addProblemToSection = async () => {
    if (!selectedProblemId) {
      return setSnackbar({
        open: true,
        message: 'Please select a problem',
        severity: 'warning'
      })
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/api/v2/test/section/${testId}/${sectionId}/add-problem`,
        { problemId: selectedProblemId },
        { withCredentials: true }
      )
      setSnackbar({
        open: true,
        message: res.data.message,
        severity: 'success'
      })
    } catch (err) {
      console.error(err)
      setSnackbar({
        open: true,
        message: err.response?.data?.message || 'Failed to add problem',
        severity: 'error'
      })
    }
  }

  useEffect(() => {
    getAllProblems()
  }, [])

  return (
    <>
      {showAddProblemModal && (
        <AddProblemForm
        setSnackbar={setSnackbar}
          closeModal={() => {
            setShowProblemModal(false)
            getAllProblems() // refresh problem list
          }}
        />
      )}

      <section className='flex justify-between items-center' >
        <Button
          onClick={() => setShowProblemModal(true)}
          variant='contained'
          sx={{ fontSize: 11 }}
          startIcon={<Add />}
        >
          Add New Problem
        </Button>

        <div className='flex gap-4 mt-5 items-center'>
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            <Select
              variant='standard'
              value={selectedProblemId}
              onChange={e => setSelectedProblemId(e.target.value)}
              displayEmpty
              sx={{ minWidth: 250 }}
            >
              <MenuItem value='' disabled>
                Select Problem
              </MenuItem>
              {problems.map(item => (
                <MenuItem key={item._id} value={item._id}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          )}
          <Button
            onClick={addProblemToSection}
            variant='contained'
            color='primary'
            sx={{
              fontSize: 9
            }}
            disabled={!selectedProblemId}
          >
            Add to Section
          </Button>
        </div>
      </section>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant='filled'
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}
