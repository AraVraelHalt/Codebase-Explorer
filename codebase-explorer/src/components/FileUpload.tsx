import React, { useState } from 'react';
import { FileNode, parseCode } from "../parser/parseRepo";
import JSZip from "jszip";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null> (null);
  const [parsedFiles, setParsedFiles] = useState<FileNode[]> ([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]); 
    }
  };

  const handleUpload = async() => {
    if (!file) return;

    if (file.name.endsWith(".zip")) {
      const zip = await JSZip.loadAsync(file);
      const results: FileNode[] = [];

      await Promise.all(
        Object.keys(zip.files).map(async (fileName) => {
          if ([".ts", ".tsx", ".js", "jsx"].some(ext => fileName.endsWith(ext))) {
            const code = await zip.files[fileName].async("string");

            results.push(parseCode(fileName, code));
          }
        })
      );

      setParsedFiles(results);

      console.log("Parsed Files: ", results);
    } else {
        const reader = new FileReader();
        
        reader.onload = (e) => {
          const code = e.target?.result as string;
          const result = parseCode(file.name, code);

          setParsedFiles([result]);
          
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

      {parsedFiles.length > 0 && (
        <div>
          <h3>Parsed Files: </h3>
          
          {parsedFiles.map((pf: FileNode) => (
            <div key={pf.name}>
              <strong>{pf.name}</strong>
              <p>Functions: {pf.functions.join(", ")}</p>
              <p>Imports: {pf.imports.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
