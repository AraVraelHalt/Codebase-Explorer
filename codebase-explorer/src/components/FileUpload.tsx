import React, { useState } from 'react';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null> (null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]); 
    }
  };

  const handleUpload = () => {
    if (file) {
      console.log("File ready to parse: ", file.name);
      // Send to parsing logic
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        Upload
      </button>
      {file && <p>Selected file: {file.name}</p>}
    </div>
  );
};

export default FileUpload;
