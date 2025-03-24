// import React, { useEffect, useState } from 'react';
// import CodeEditor from './CodeEditor';
// import Problem from './Problem';
// import { Fullscreen, Help } from '@mui/icons-material';
// import Output from './Output';
// import { IconButton } from '@mui/material';
// import axios from 'axios';
// import currProblem from './sample.json';

// const Code = () => {
//     const [output, setOutput] = useState('');
//     const [executing, setExecuting] = useState(false);
//     const [showOutputWindow,setShowOutputWindow] = useState(false);
//     const [status,setStatus] = useState('');
//     const closeExectionWindow = () => {
//         setExecuting(false);
//         setOutput(false);
//         setShowOutputWindow(false);
//     }
//     const getResults = async (tokens) => {
//         try {
//             for (let i = 0; i < 10; i++) { // Polling mechanism
//                 const res = await axios.get(`http://65.2.4.200/submissions/batch?tokens=${tokens.join(',')}`);

//                 let allCompleted = true; // Assume all are done, prove otherwise
//                 let formattedOutputs = [];

//                 res.data.submissions.forEach((submission, index) => {
//                     const status = submission.status.description;

//                     // If any test case is still in queue or processing, continue polling
//                     if (status === "In Queue" || status === "Processing") {
//                         allCompleted = false;
//                     }

//                     // Get output (error, correct output, or compilation output)
//                     const output = (submission.stderr || submission.stdout || submission.compile_output || 'No output')
//                         .replace(/\n/g, "<br/>");

//                     formattedOutputs.push(`Test Case ${index + 1}: ${status} <br/> Output: ${output}`);
//                 });

//                 setOutput(formattedOutputs.join("<br/><br/>"));

//                 if (allCompleted) return; // Stop polling if all test cases have finished

//                 await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2s before next attempt
//             }

//             setOutput('Execution timed out');
//         } catch (error) {
//             console.error('Error fetching batch results:', error);
//             setOutput('Error fetching batch results');
//         } finally {
//             setExecuting(false);
//             setStatus('');
//         }
//     };



//     const submitHandler = async (sourceCode, languageId) => {
//         try {
//             setExecuting(true);

//             // Prepare batch request payload
//             const submissions = currProblem.testCases.map(testCase => ({
//                 source_code: sourceCode,
//                 stdin: testCase.input,
//                 expected_output: testCase.output,
//                 base64_encoded: false,
//                 language_id: languageId,
//             }));

//             // Send batch submission request
//             const res = await axios.post(`http://65.2.4.200/submissions/batch`, {
//                 submissions: submissions,
//             });

//             // Extract tokens from batch response
//             const tokens = res.data.map(submission => submission.token);

//                 await getResults(tokens);

//             setShowOutputWindow(true);
//         } catch (error) {
//             console.error('Submission error:', error);
//             setOutput('Submission failed');
//         }
//     };



//     useEffect(() => {
//         console.log("Initialized");
//     }, []);

//     return (
//         <>
//             <header className='h-[70px] relative w-full'>
//                 <nav className='fixed shadow-sm items-center justify-between px-4 z-40 bg-white flex  h-[70px] w-full'>
//                     <video src='/assets/techease.mp4' loop autoPlay playsInline muted className='w-[140px]' />
//                     <div className='flex items-center' >
//                         <IconButton>
//                             {/* <Help /> */}
//                         </IconButton>
//                         <IconButton>
//                             <Fullscreen />
//                         </IconButton>
//                     </div>
//                 </nav>
//             </header>
//             <section className='flex overflow-hidden justify'>
//                 <div className='flex-1 relative' >
//                     <Problem  currProblem={currProblem} executing={executing} output={output} className="flex-1" />
//                     <Output   setShowOutputWindow={setShowOutputWindow} showOutputWindow={showOutputWindow} closeExectionWindow={closeExectionWindow} executing={executing} output={output} className="flex-1" />
//                 </div>
//                 <CodeEditor status={status}  submitHandler={submitHandler} className="flex-1" />
//             </section>
//         </>
//     );
// };

// export default Code;

// // 
// // 
// // 
// // 
// // 
import { Fullscreen } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import ProblemData from '../CodeExecution/ProblemData';
import CodeEditor from '../CodeExecution/CodeEditor';
import Questions from '../solving/sample.json'
import { useParams } from 'react-router-dom';
import Output from '../CodeExecution/Output';
const Header = () => {
    return <>
        <header className='h-[55px] relative w-full'>
            <nav className='fixed shadow-sm items-center justify-between px-2 z-40 bg-white flex  h-[55px] w-full'>
                <video src='/assets/techease.mp4' loop autoPlay playsInline muted className='w-[100px]' />
                <div className='flex items-center' >
                    <IconButton>
                        {/* <Help /> */}
                    </IconButton>
                    <IconButton>
                        <Fullscreen />
                    </IconButton>
                </div>
            </nav>
        </header>
    </>
}
const Code = () => {
    const { id } = useParams();
    const question = Questions.filter((i) => i._id == id);

    return (
        <>
            <Header />
            <main className='h-[calc(100vh-55px) flex  overflow-hidden custom-scrollbar'>
                <ProblemData />
                <hr className='h-[calc(100vh-55px)] bg-gray-100 w-[1px]' />
                    <CodeEditor question={question} />
                    <Output/>
            </main>

        </>
    );
}

export default Code;
