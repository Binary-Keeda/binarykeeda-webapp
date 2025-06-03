import React, { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Layout from '../layout/Layout'
import { Helmet } from 'react-helmet-async'

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

    const setMeta = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`)
      if (meta) {
        meta.setAttribute('content', content)
      } else {
        meta = document.createElement('meta')
        meta.name = name
        meta.content = content
        document.head.appendChild(meta)
      }
    }

    setMeta(
      'description',
      'Get the curated Binary Keeda DSA Sheet to master Data Structures and Algorithms for coding interviews and placements.'
    )
    setMeta(
      'keywords',
      'Binary Keeda, DSA Sheet, Data Structures, Algorithms, Interview Preparation, Coding, CP'
    )
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
    <>
      {/* <Helmet>
        <title>Binary Keeda - 210 Days Roadmap || BK Sheet</title>
        <meta
          name='description'
          content='Binary Keeda helps students and developers master Data Structures, Algorithms, and System Design with structured roadmaps, tutorials, and practice content.'
        />
        <link rel='canonical' href='https://binarykeeda.com/binary-keeda-sheet' />
        <meta property='og:title' content='Binary Keeda - DSA, Coding, and System Design Mastery' />
        <meta property='og:description' content='Master DSA, System Design, and Competitive Programming with our expert-curated sheet and roadmap.' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://binarykeeda.com/binary-keeda-sheet' />
        <meta property='og:image' content='https://binarykeeda.com/og-image.png' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='Binary Keeda - DSA, Coding, and System Design Mastery' />
        <meta name='twitter:description' content="Access Binary Keeda's all-in-one sheet for mastering DSA, CP, and System Design. Tailored for job seekers and students." />
        <meta name='twitter:image' content='https://binarykeeda.com/og-image.png' />
      </Helmet> */}

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
                <span className='font-bold text-[#db5602]'>{completedCount}</span> of{' '}
                <span className='font-bold text-[#db5602]'>{totalCount}</span> tasks completed (
                <span className='font-bold'>{Math.round(progress)}%</span>)
              </p>
            ) : (
              <p className='text-lg font-medium text-gray-800'>
                <span className='font-bold text-[#db5602]'>{totalCount}</span> tasks waiting to be solved!
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
                    <th className='py-3 text-center w-20'>Done</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedData[topicKey].map((entry, idx) => (
                    <tr key={idx} className='border-b'>
                      <td className='px-4 py-2'>{entry.day}</td>
                      <td className='px-4 py-2'>{entry.topic}</td>
                      <td className='text-center'>
                        {entry.resourceLink ? (
                          <a
                            href={entry.resourceLink}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-600 underline font-medium hover:text-blue-800'
                          >
                            {entry.resourceText || 'View'}
                          </a>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className='text-center'>
                        <input
                          type='checkbox'
                          checked={!!completed[entry.id]}
                          onChange={() => handleCheckboxChange(entry.id)}
                          className='h-5 w-5 text-orange-500 focus:ring-orange-500 border-gray-300 rounded'
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
    </>
  )
}

export default Layout(Sheet210Days);
