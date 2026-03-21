import React, { useState } from 'react';
import { FileNode, parseCode } from "../parser/parseRepo";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null> (null);
  const [parsedData, setParsedData] = useState<FileNode | null> (null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]); 
    }
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const code = e.target?.result as string;
        const result = parseCode(file.name, code);

        setParsedData(result);
        
        console.log("Parsed: ", result);
      };

      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        Upload & Parse
      </button>
      {file && <p>Selected file: {file.name}</p>}

      {parsedData && (
        <div>
          <h3>Parsed Data: </h3>
          <p>Functions: {parsedData.functions.join(", ")}</p>
          <p>Imports: {parsedData.imports.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
