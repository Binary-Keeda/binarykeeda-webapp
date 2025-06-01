import * as xlsx from 'xlsx';

export const csvToJson = (file, quizId) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                
                const binaryString = e.target.result;

                const workbook = xlsx.read(binaryString, { type: 'binary' });

                const sheetName = workbook.SheetNames[0];
                const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

                const formattedData = jsonData.map((row) => ({
                    quizId,
                    question: row['Question'],
                    marks: row['marks'],
                    negative: row['negative'] || 0,
                    category: "MCQ",
                    options: [
                        { text: row['option1'], isCorrect: true },
                        { text: row['option2'], isCorrect: false },
                        { text: row['option3'], isCorrect: false },
                        { text: row['option4'], isCorrect: false },
                    ],
                }));
                resolve(formattedData);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsBinaryString(file);
    });
};


export const jsonToFormattedData = (file, quizId) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target.result;
        const jsonData = JSON.parse(content);

        // Assuming JSON data is an array of questions in this shape:
        // [
        //   {
        //     "Question": "What is 2+2?",
        //     "marks": 5,
        //     "negative": 1,
        //     "option1": "4",
        //     "option2": "3",
        //     "option3": "2",
        //     "option4": "5",
        //     "correctOption": 1
        //   },
        //   ...
        // ]

        const formattedData = jsonData.map((row) => ({
          quizId,
          question: row['Question'],
          marks: row['marks'],
          negative: row['negative'] || 0,
          category: 'MCQ',
          options: [
            { text: row['option1'], isCorrect: row['correctOption'] === 1 },
            { text: row['option2'], isCorrect: row['correctOption'] === 2 },
            { text: row['option3'], isCorrect: row['correctOption'] === 3 },
            { text: row['option4'], isCorrect: row['correctOption'] === 4 },
          ],
        }));

        resolve(formattedData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsText(file);
  });
};
