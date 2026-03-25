import React, { useState } from 'react';
import { FileNode, parseCode } from "../parser/parseRepo";
import JSZip from "jszip";

type Props = {
  onParsed: (files: FileNode[]) => void;
};

const FileUpload: React.FC<Props> = ({ onParsed }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]); 
    }
  };

  const handleUpload = async() => {
    if (!file) return;

    if (file.name.endsWith('.zip')) {
      const zip = await JSZip.loadAsync(file);
      const results = await Promise.all(
        Object.keys(zip.files)
          .filter(fileName => ['.ts', '.tsx', '.js', '.jsx'].some(ext => fileName.endsWith(ext)))
          .map(async (fileName) => {
            const code = await zip.files[fileName].async("string");
            return parseCode(fileName, code);
          })
      );

      onParsed(results);

    } else {
        const reader = new FileReader();
        
        reader.onload = (e) => {
          const code = e.target?.result as string;
          const result = parseCode(file.name, code);

          onParsed([result]);
          
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
    </div>
  );
};

export default FileUpload;
