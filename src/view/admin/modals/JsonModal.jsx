import { Close } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { jsonToFormattedData } from '../utils/lib/jsonParser'; // We'll write this next
import { BASE_URL } from '../../../lib/config';

export default function JsonModal({ setModalClose, id }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
    onDropRejected: (rejectedFiles) => {
      rejectedFiles.forEach((file) => {
        console.log(`${file.name} has an invalid MIME type.`);
      });
    },
    accept: {
      'application/json': ['.json'],
    },
  });

  const uploadJson = async () => {
    setLoading(true);
    try {
      const data = await jsonToFormattedData(file, id);
      console.log(data);
      const res = await axios.post(
        `${BASE_URL}/api/v1/quiz/add/questions`,
        { quizId: id , data },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log(res.data);
      setModalClose(true); // Close modal after successful upload
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-opacity-25 px-36 py-24 bg-black fixed top-0 left-0 z-[2099]">
      <div className="rounded-md relative h-full w-full transition-all ease-linear duration-300 bg-white">
        <div className="flex justify-end">
          <IconButton onClick={() => setModalClose(true)}>
            <Close />
          </IconButton>
        </div>
        <section className="p-5 gap-5">
          <div
            className="p-10 cursor-pointer flex-1 flex justify-center border-dashed border-2 border-black"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {file ? (
              <small>{file.name}</small>
            ) : (
              <small>Upload here {'(Only .json supported)'}</small>
            )}
          </div>
          {file && (
            <Button
              onClick={uploadJson}
              className="mt-3"
              sx={{ marginTop: '10px' }}
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Validate & Upload'}
            </Button>
          )}
        </section>
      </div>
    </div>
  );
}
