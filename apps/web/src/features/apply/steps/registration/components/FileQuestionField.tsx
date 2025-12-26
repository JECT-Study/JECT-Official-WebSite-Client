import { BlockButton, toastController, Uploader } from "@ject/jds";
import { useMemo } from "react";

import {
  ALLOWED_FILE_EXTENSIONS,
  ALLOWED_FILE_TYPE,
  DEFAULT_MAX_FILE_SIZE_MB,
  MB_TO_BYTES,
} from "../constants";
import { createPortfolioFiles, formatForPresignedUrl, markAsUploaded } from "../utils";
import { PortfolioFileItem } from "./PortfolioFileItem";
import { QuestionFieldWrapper } from "./QuestionFieldWrapper";

import type { Question } from "@/apis/apply";
import { APPLY_MESSAGE } from "@/constants/applyMessages";
import { useCreatePresignedUrlsMutation, useUploadFileToS3Mutation } from "@/hooks/apply";
import type { PortfolioFile } from "@/types/apis/application";

interface FileQuestionFieldProps {
  question: Question;
  portfolios: PortfolioFile[];
  onChangePortfolios: (portfolios: PortfolioFile[]) => void;
}

export function FileQuestionField({
  question,
  portfolios,
  onChangePortfolios,
}: FileQuestionFieldProps) {
  const maxSizeMB = question.maxFileSize ?? DEFAULT_MAX_FILE_SIZE_MB;
  const maxSizeBytes = maxSizeMB * MB_TO_BYTES;

  const totalSize = useMemo(
    () => portfolios.reduce((acc, p) => acc + Number(p.fileSize), 0),
    [portfolios],
  );

  const isMaxSizeReached = totalSize >= maxSizeBytes;

  const { mutateAsync: createPresignedUrlsMutateAsync, isPending: isGettingUrls } =
    useCreatePresignedUrlsMutation();
  const { mutateAsync: uploadFileAsync, isPending: isUploadingToS3 } = useUploadFileToS3Mutation({
    showSuccessToast: false,
  });

  const isUploading = isGettingUrls || isUploadingToS3;

  //파일 업로드 핸들러(컬렉션 단위, validation → presigned URL 요청 → S3 업로드 → portfolios 업데이트)

  const handleUpload = async (files: File[]) => {
    // 1. PDF 필터링
    const pdfFiles = files.filter(file => file.type === ALLOWED_FILE_TYPE);
    const nonPdfCount = files.length - pdfFiles.length;

    if (nonPdfCount > 0) {
      toastController.destructive(APPLY_MESSAGE.invalid.fileType);
    }

    if (pdfFiles.length === 0) return;

    // 2. 용량 체크
    const newTotalSize = totalSize + pdfFiles.reduce((acc, f) => acc + f.size, 0);
    if (newTotalSize > maxSizeBytes) {
      toastController.destructive(APPLY_MESSAGE.invalid.fileSize);
      return;
    }

    // 3. 중복 파일명 체크
    const hasDuplicate = pdfFiles.some(f => portfolios.some(p => p.fileName === f.name));
    if (hasDuplicate) {
      toastController.destructive(APPLY_MESSAGE.invalid.sameFile);
      return;
    }

    try {
      // 4. presigned URL 요청
      const formattedFiles = formatForPresignedUrl(pdfFiles);
      const presignedData = await createPresignedUrlsMutateAsync(formattedFiles);

      // 5. PortfolioFile 생성 (pendingUpload 포함)
      const newPortfolioFiles = createPortfolioFiles(presignedData, pdfFiles);

      // 6. S3 업로드 (병렬)
      await Promise.all(
        newPortfolioFiles.map(pf =>
          uploadFileAsync({
            url: pf.pendingUpload!.presignedUrl,
            file: pf.pendingUpload!.rawFile,
          }),
        ),
      );

      // 7. 업로드 완료 → pendingUpload 제거 후 portfolios 업데이트
      const uploadedFiles = newPortfolioFiles.map(markAsUploaded);
      onChangePortfolios([...portfolios, ...uploadedFiles]);
    } catch {
      toastController.destructive(APPLY_MESSAGE.fail.uploadFile);
    }
  };

  const handleDelete = (id: string) => {
    const filtered = portfolios.filter(p => p.id !== id);
    onChangePortfolios(filtered);
  };

  return (
    <QuestionFieldWrapper title={question.title}>
      <div className='gap-md flex flex-col'>
        <Uploader.File
          accept={[...ALLOWED_FILE_EXTENSIONS]}
          maxFileSize={maxSizeBytes}
          existingFilesSize={totalSize}
          isLoading={isUploading}
          isDisabled={isMaxSizeReached}
          onUpload={files => void handleUpload(files)}
          messages={{
            rest: (
              <>
                파일을 드래그&드롭하거나, 직접 선택해 업로드해주세요.
                <br />
                최대 {maxSizeMB}MB 이하의 PDF 파일을 업로드할 수 있어요.
              </>
            ),
            loading: (
              <>
                파일을 업로드하고 있습니다.
                <br />
                잠시만 기다려주세요...
              </>
            ),
            disabled: <>가능한 최대 용량에 도달했어요.</>,
          }}
          uploadButton={triggerUpload => (
            <BlockButton.Basic
              hierarchy='tertiary'
              size='sm'
              variant='outlined'
              suffixIcon='upload-2-line'
              onClick={triggerUpload}
              disabled={isMaxSizeReached}
            >
              파일 업로드
            </BlockButton.Basic>
          )}
        />

        {portfolios.length > 0 && (
          <div className='gap-sm flex flex-col'>
            {portfolios.map(portfolio => (
              <PortfolioFileItem key={portfolio.id} portfolio={portfolio} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </QuestionFieldWrapper>
  );
}
