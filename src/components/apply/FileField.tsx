import { useEffect, useState } from 'react';

import FileItem from '@/components/common/file/FileItem';
import InputFile from '@/components/common/input/InputFile';
import Title from '@/components/common/title/Title';
import { APPLY_MESSAGE } from '@/constants/applyMessages';
import useCreatePresignedUrlsQuery from '@/hooks/useCreatePresignedUrlsQuery';
import { useToastActions } from '@/stores/toastStore';
import { NewPortfolio, Portfolio } from '@/types/apis/answer';
import { Question } from '@/types/apis/question';
import { PresignedUrl } from '@/types/apis/uploadFile';
import { validateMaxSize } from '@/utils/validateFileMaxSize';

interface FileFieldProps {
  data: Question;
  onChange: (files: Portfolio[]) => void;
  values: Portfolio[];
}

const formatRawFiles = (data: PresignedUrl[], files: File[]) => {
  return data.map((item, index) => ({
    id: crypto.randomUUID(),
    file: files[index],
    presignedUrl: item.presignedUrl,
    fileUrl: item.keyName,
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

const formatDraftValues = (values: Portfolio[]) => {
  return values.map(file => ({
    ...file,
    id: file.fileName.substring(file.fileName.lastIndexOf('_') + 1),
    file: null,
    presignedUrl: null,
  }));
};

function FileField({ data, onChange, values }: FileFieldProps) {
  const [portfolios, setPortfolios] = useState<NewPortfolio[]>(formatDraftValues(values) ?? []);
  const [invalidFiles, setInvalidFiles] = useState<File[]>([]);
  const [totalSize, setTotalSize] = useState(0);
  const { createPresignedUrls } = useCreatePresignedUrlsQuery();
  const { addToast } = useToastActions();

  const addFile = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const newFilesArr = Array.from(newFiles);

    if (validateMaxSize(totalSize, newFilesArr)) {
      return addToast(APPLY_MESSAGE.invalid.fileSize, 'negative');
    }

    const filteredPdfFiles = newFilesArr.filter(file => file.type === 'application/pdf');
    const filteredInvalidFiles = newFilesArr.filter(file => file.type !== 'application/pdf');
    const formattedFiles = formatForPresignedUrl(filteredPdfFiles);

    setInvalidFiles([...invalidFiles, ...filteredInvalidFiles]);
    createPresignedUrls.mutate(formattedFiles, {
      onSuccess: ({ data }) =>
        setPortfolios(prev => [...prev, ...formatRawFiles(data, filteredPdfFiles)]),
    });
  };

  const deleteFile = (id: number | string) => {
    if (typeof id === 'string') {
      setPortfolios(portfolios.filter(file => file.id !== id));
    } else if (typeof id === 'number') {
      setInvalidFiles(invalidFiles.filter(file => file.lastModified !== id));
    }
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
        onAddFile={addFile}
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
