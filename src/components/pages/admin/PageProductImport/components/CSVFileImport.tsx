import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios, { AxiosRequestConfig } from 'axios';

type CSVFileImportProps = {
  url: string;
  title: string;
};

const axiosConfig: AxiosRequestConfig = {
  headers: {
    'Ocp-Apim-Subscription-Key': import.meta.env.VITE_IMPORTS_KEY,
  },
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async () => {
    console.log('uploadFile to', url);

    //Get the SAS URL
    const response = await axios({
      method: 'GET',
      url,
      params: {
        name: encodeURIComponent(file ? file.name : ''),
      },
      ...axiosConfig,
    });
    console.log('File to upload: ', file ? file.name : '');
    console.log('Uploading to: ', response.data.url);
    const result = await fetch(response.data.url, {
      method: 'PUT',
      body: file,
      headers: {
        'x-ms-blob-type': 'BlockBlob',
      },
    });
    console.log('File uploaded successfully to azure blob storage');
    console.log('Result: ', result);
    setFile(undefined);
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
