import { useEffect, useState } from 'react';

import FileItem from '@/components/common/file/FileItem';
import InputFile from '@/components/common/input/InputFile';
import Title from '@/components/common/title/Title';
import { APPLY_MESSAGE } from '@/constants/applyMessages';
import useCreatePresignedUrlsQuery from '@/hooks/useCreatePresignedUrlsQuery';
import { useToastActions } from '@/stores/toastStore';
import { NewPortfolio, PortfolioResponse } from '@/types/apis/answer';
import { Question } from '@/types/apis/question';
import { PresignedUrlResponse } from '@/types/apis/uploadFile';
import { validateMaxSize } from '@/utils/validateFileMaxSize';
import { splitValidAndInvalidFiles } from '@/utils/validateInvalidFile';

interface FileFieldProps {
  data: Question;
  onChange: (files: PortfolioResponse[]) => void;
}

const formatNewPortfolios = (data: PresignedUrlResponse[], files: File[]) => {
  return data.map((item, index) => ({
    id: crypto.randomUUID(),
    file: files[index],
    presignedUrl: item.presignedUrl,
    fileUrl: item.cdnUrl,
    fileName: files[index].name,
    fileSize: files[index].size.toString(),
    sequence: index.toString(),
  }));
};

const formatForPresignedUrl = (files: File[]) => {
  return files.map(file => ({
    name: file.name,
    contentType: file.type,
    contentLength: file.size,
  }));
};

function FileField({ data, onChange }: FileFieldProps) {
  const [portfolios, setPortfolios] = useState<NewPortfolio[]>([]);
  const [invalidFiles, setInvalidFiles] = useState<File[]>([]);
  const [totalSize, setTotalSize] = useState(0);
  const { createPresignedUrlsMutate } = useCreatePresignedUrlsQuery();
  const { addToast } = useToastActions();

  const addFile = async (newFiles: FileList | null) => {
    if (!newFiles) return;

    const newFilesArr = Array.from(newFiles);

    if (validateMaxSize(totalSize, newFilesArr)) {
      return addToast(APPLY_MESSAGE.invalid.fileSize, 'negative');
    }

    const PdfFiles = newFilesArr.filter(file => file.type === 'application/pdf');
    const { validPdfFiles, invalidPdfFiles } = await splitValidAndInvalidFiles(PdfFiles);

    if (validPdfFiles.length > 0) {
      const formattedFiles = formatForPresignedUrl(validPdfFiles);

      createPresignedUrlsMutate(formattedFiles, {
        onSuccess: ({ data }) =>
          setPortfolios(prev => [...prev, ...formatNewPortfolios(data, validPdfFiles)]),
      });
    }

    if (invalidPdfFiles.length > 0) {
      setInvalidFiles(prev => [...prev, ...invalidPdfFiles]);
      addToast(APPLY_MESSAGE.invalid.unknownFile, 'negative');
    }

    if (PdfFiles.length !== newFiles.length) addToast(APPLY_MESSAGE.invalid.fileType, 'negative');
  };

  const deleteFile = (id: number | string) => {
    if (typeof id === 'string') {
      return setPortfolios(portfolios.filter(file => file.id !== id));
    }

    setInvalidFiles(invalidFiles.filter(file => file.lastModified !== id));
  };

  useEffect(() => {
    onChange(portfolios);
    setTotalSize(portfolios.reduce((acc, portfolio) => acc + Number(portfolio.fileSize), 0));
  }, [portfolios]);

  return (
    <fieldset className='gap-2xl flex flex-col'>
      <Title hierarchy='normal'>{data.title}</Title>
      <InputFile
        labelText='첨부파일'
        maxSize={100}
        fileExtensions={['pdf']}
        currentSize={totalSize}
        isDisabled={false}
        isRequired={data.isRequired}
        onAddFile={fileList => void addFile(fileList)}
      >
        {invalidFiles.length === 0 && portfolios.length === 0 ? null : (
          <>
            {invalidFiles.map(file => (
              <FileItem
                key={file.lastModified}
                file={file}
                onDelete={deleteFile}
                feedback='unknown'
              />
            ))}
            {portfolios.map(portfolio => (
              <FileItem key={portfolio.id} file={portfolio} onDelete={deleteFile} />
            ))}
          </>
        )}
      </InputFile>
    </fieldset>
  );
}

export default FileField;
