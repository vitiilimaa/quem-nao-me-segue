import React, { useState } from "react";

type FileUploaderProps = {
  label: string;
  onFilesLoaded: (contents: string[]) => void;
  id: string;
  className?: string;
};

const FileUploader = (props: FileUploaderProps) => {
  const { label, onFilesLoaded, id, className } = props;

  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    setFileNames(fileArray.map((file) => file.name));

    const readers = fileArray.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          resolve(content);
        };
        reader.onerror = (err) => reject(err);
        reader.readAsText(file);
      });
    });

    Promise.all(readers)
      .then((contents) => {
        onFilesLoaded(contents);
      })
      .catch((err) => console.error("Erro ao ler arquivos:", err));
  };

  return (
    <div className={className}>
      <label className="block font-bold mb-1">{label}</label>

      <input
        id={id}
        type="file"
        accept=".html"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      <label
        htmlFor={id}
        className="inline-block bg-gray-400 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-700 transition"
      >
        Importar arquivos
      </label>

      {fileNames.length > 0 && (
        <ul className="mt-2 text-sm text-gray-700">
          {fileNames.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
