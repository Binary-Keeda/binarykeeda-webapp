import React, { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Layout from '../layout/Layout'
gsap.registerPlugin(ScrollTrigger)

const Sheet210Days = () => {
  const [groupedData, setGroupedData] = useState({})
  const [displayNames, setDisplayNames] = useState({})
  const [loading, setLoading] = useState(true)
  const [completed, setCompleted] = useState(() => {
    const stored = localStorage.getItem('completedTasks')
    return stored ? JSON.parse(stored) : {}
  })

  const containerRef = useRef(null)

  useEffect(() => {
    document.title = 'Binary Keeda DSA Sheet | Crack Coding Interviews'

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Get the curated Binary Keeda DSA Sheet to master Data Structures and Algorithms for coding interviews and placements.'
      )
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content =
        'Get the curated Binary Keeda DSA Sheet to master Data Structures and Algorithms for coding interviews and placements.'
      document.head.appendChild(meta)
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      metaKeywords.setAttribute(
        'content',
        'Binary Keeda, DSA Sheet, Data Structures, Algorithms, Interview Preparation, Coding, CP'
      )
    } else {
      const meta = document.createElement('meta')
      meta.name = 'keywords'
      meta.content =
        'Binary Keeda, DSA Sheet, Data Structures, Algorithms, Interview Preparation, Coding, CP'
      document.head.appendChild(meta)
    }
  }, [])
  useEffect(() => {
    const sheetId = '1bwxqxPsdakJl0fjKRIJBFfVGZk8PbebPTzRjyR8655E'
    const apiKey = 'AIzaSyDdhv_BPkl0TiQvmqHwZCdwgKXPEXAgn10'
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?ranges=Sheet1&fields=sheets.data.rowData.values(userEnteredValue,hyperlink)&key=${apiKey}`

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const sheets = data.sheets
        if (!sheets || sheets.length === 0) return setLoading(false)

        const rowData = sheets[0]?.data?.[0]?.rowData || []
        const rows = rowData.map(row => row.values || [])
        const headers = rows[0].map(
          cell => cell?.userEnteredValue?.stringValue || ''
        )

        const grouped = {}
        const displayMap = {}

        for (let i = 1; i < rows.length; i++) {
          const row = rows[i]
          const entry = {}
          row.forEach((cell, index) => {
            const key = headers[index]
            const value = cell?.userEnteredValue?.stringValue || ''
            const link = cell?.hyperlink || null
            entry[key] = { text: value, link }
          })

          const rawTopic = entry['Topic']?.text || ''
          const subTask = entry['Task Assigned ( 10 Hrs Weekly)']?.text || ''

          const baseTopic = rawTopic.split(':')[0].trim().toLowerCase()
          const displayTopic = rawTopic.split(':')[0].trim()

          const day = entry['Day']?.text
          const resource = entry['Free Resource']

          if (!baseTopic || !day) continue

          if (!grouped[baseTopic]) grouped[baseTopic] = []
          if (!displayMap[baseTopic]) displayMap[baseTopic] = displayTopic

          grouped[baseTopic].push({
            day,
            topic: subTask.trim(),
            resourceText: resource?.text,
            resourceLink: resource?.link,
            id: `${baseTopic}-${day}`
          })
        }

        setGroupedData(grouped)
        setDisplayNames(displayMap)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching sheet data:', err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!loading && containerRef.current) {
      const sections = containerRef.current.querySelectorAll('.topic-section')
      sections.forEach(section => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 60%'
            }
          }
        )
      })
    }
  }, [loading])

  const handleCheckboxChange = id => {
    const updated = { ...completed, [id]: !completed[id] }
    setCompleted(updated)
    localStorage.setItem('completedTasks', JSON.stringify(updated))
  }

  const allTasks = Object.values(groupedData).flat()
  const completedCount = allTasks.filter(task => completed[task.id]).length
  const totalCount = allTasks.length
  const progress = totalCount ? (completedCount / totalCount) * 100 : 0

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-white'>
        <div className='loader1'></div>
      </div>
    )
  }

  return (
    <div ref={containerRef}>
      <div className='sticky px-6 py-10 top-[73px] z-50 bg-gray-50 pb-4 pt-3 border-b border-gray-200'>
        <div className='text-left'>
          <h1 className='text-4xl font-extrabold text-black mb-2 drop-shadow-md tracking-wide'>
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-[#db5602] to-orange-300'>
              220 Days Roadmap
            </span>
          </h1>
          {completedCount > 0 ? (
            <p className='text-lg font-medium text-gray-800 italic'>
              You're making progress!{' '}
              <span className='font-bold text-[#db5602]'>{completedCount}</span>{' '}
              of <span className='font-bold text-[#db5602]'>{totalCount}</span>{' '}
              tasks completed (
              <span className='font-bold'>{Math.round(progress)}%</span>)
            </p>
          ) : (
            <p className='text-lg font-medium text-gray-800'>
              <span className='font-bold text-[#db5602]'>{totalCount}</span>{' '}
              tasks waiting to be solved!
            </p>
          )}
        </div>
        <div className='w-full mt-3 px-2'>
          <div className='w-full h-2 bg-gray-200 rounded-full overflow-hidden'>
            <div
              className='h-2 bg-gradient-to-r from-[#db5602] to-orange-500 rounded-full transition-all duration-700 ease-in-out shadow-inner'
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {Object.keys(groupedData).map((topicKey, topicIndex) => (
        <div
          key={topicIndex}
          className='topic-section px-7 mb-12 bg-white shadow-md rounded-xl p-4 w-full mx-auto'
        >
          <h2 className='text-2xl font-bold text-gray-700 mb-4 border-b pb-2'>
            Topic {topicIndex + 1}: {displayNames[topicKey]}
          </h2>

          <div className='w-full overflow-x-auto'>
            <table className='w-full table-auto text-left'>
              <thead className='bg-indigo-100 text-base text-[#db5602] font-semibold'>
                <tr>
                  <th className='px-4 py-3 text-left w-24'>Day</th>
                  <th className='px-4 py-3 text-left w-[50%]'>Topic</th>
                  <th className='py-3 text-center w-24'>Learn</th>
                  <th className='py-3 text-center w-20'>Completed</th>
                </tr>
              </thead>
              <tbody>
                {groupedData[topicKey].map((entry, i) => (
                  <tr
                    key={i}
                    className='border-b even:bg-indigo-50 hover:bg-indigo-100 transition-all duration-200 text-gray-700'
                  >
                    <td className='px-4 py-3 font-medium text-left align-middle w-24'>
                      {entry.day}
                    </td>
                    <td className='px-4 py-3 text-left align-middle w-[50%]'>
                      {entry.topic}
                    </td>
                    <td className='py-3 w-24 text-center align-middle'>
                      {entry.resourceLink ? (
                        <a
                          href={entry.resourceLink}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='bg-[#db5602] text-white px-3 py-1 rounded hover:bg-indigo-600 text-sm transition shadow-md hover:shadow-lg'
                        >
                          Learn
                        </a>
                      ) : (
                        <span className='text-gray-400'>No link</span>
                      )}
                    </td>
                    <td className='py-3 w-20 text-center align-middle'>
                      <input
                        type='checkbox'
                        checked={!!completed[entry.id]}
                        onChange={() => handleCheckboxChange(entry.id)}
                        className='w-5 h-5 cursor-pointer'
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Layout(Sheet210Days)
