import React from 'react'
import UserDashboard from './Userdashboard'
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
function TestList() {
    return (
        <div>
            <Box sx={{  width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 20,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                />
            </Box>
        </div>
    )
}

export default UserDashboard(TestList);
const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'testName', headerName: 'Test Name', width: 200 },
    { field: 'automataMarks', headerName: 'Automata', width: 120 },
    { field: 'codingMarks', headerName: 'Coding', width: 120 },
    { field: 'aptitudeMarks', headerName: 'Aptitude', width: 120 },
    { field: 'totalMarks', headerName: 'Total', width: 100 },
    { field: 'difficulty', headerName: 'Level', width: 120 },
    { field: 'timeBound', headerName: 'Timed', width: 100 },
    { field: 'duration', headerName: 'Duration', width: 120 },
    { field: 'testTaken', headerName: 'Attempted', width: 120 },
    { field: 'score', headerName: 'Score', width: 100 },
    { field: 'accuracy', headerName: 'Accuracy', width: 120 },
    { field: 'passFail', headerName: 'Result', width: 100 },
    { field: 'dateAttempted', headerName: 'Date', width: 140 },
    { field: 'attemptLink', headerName: 'Attempt', width: 200, sortable: false },
];
const rows = [
    {
        id: 1,
        testName: 'Full AMCAT Test',
        automataMarks: 30,
        codingMarks: 40,
        aptitudeMarks: 50,
        totalMarks: 120,
        difficulty: 'Medium',
        timeBound: true,
        duration: 90,
        testTaken: true,
        score: 105,
        accuracy: 88,
        passFail: 'Pass',
        dateAttempted: '2025-03-20',
        attemptLink: 'https://example.com/attempt/amcat1',
    },
    {
        id: 2,
        testName: 'Tech + Apti Test',
        automataMarks: 25,
        codingMarks: 50,
        aptitudeMarks: 40,
        totalMarks: 115,
        difficulty: 'Hard',
        timeBound: true,
        duration: 100,
        testTaken: true,
        score: 90,
        accuracy: 78,
        passFail: 'Pass',
        dateAttempted: '2025-03-18',
        attemptLink: 'https://example.com/attempt/amcat2',
    },
    {
        id: 3,
        testName: 'Logical + Automata',
        automataMarks: 35,
        codingMarks: 30,
        aptitudeMarks: 30,
        totalMarks: 95,
        difficulty: 'Easy',
        timeBound: false,
        duration: 60,
        testTaken: false,
        score: null,
        accuracy: null,
        passFail: null,
        dateAttempted: null,
        attemptLink: 'https://example.com/attempt/amcat3',
    },
];



