import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { FiUpload } from 'react-icons/fi';

import './styles.css';

interface Props {
  onFileUploaded: (file: File) => void;
}

const DropZone: React.FC<Props> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log(acceptedFiles);

      const file = acceptedFiles[0];

      const fileUrl = URL.createObjectURL(file);

      setSelectedFileUrl(fileUrl);
      onFileUploaded(acceptedFiles[0]);
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div className='dropzone' {...getRootProps()}>
      <input {...getInputProps()} accept='image/*' />

      {selectedFileUrl ? (
        <>
          <img src={selectedFileUrl} alt='img' />
        </>
      ) : isDragActive ? (
        <p>Pode soltar o arquivo ...</p>
      ) : (
        <>
          <p>
            <FiUpload />
            Imagem do estabelecimento
          </p>
        </>
      )}
    </div>
  );
};

export default DropZone;
