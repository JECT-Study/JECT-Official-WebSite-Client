import { BlockButton, toastController, Uploader } from "@ject/jds";
import { useCallback, useMemo } from "react";

type UploadErrorType = "FILE_TOO_LARGE" | "INVALID_TYPE" | "TOTAL_SIZE_EXCEEDED";
type UploadError = { type: UploadErrorType; file: File };

import {
  ALLOWED_FILE_EXTENSIONS,
  ALLOWED_FILE_TYPE,
  DEFAULT_MAX_FILE_SIZE_MB,
  MB_TO_BYTES,
} from "../constants";
import { formatForPresignedUrl } from "../utils";
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
  const { mutateAsync: uploadFileToS3Async, isPending: isUploadingToS3 } =
    useUploadFileToS3Mutation({ isSuccessToastEnabled: false, isErrorToastEnabled: false });

  const isUploading = isGettingUrls || isUploadingToS3;

  const handleError = useCallback((error: UploadError) => {
    switch (error.type) {
      case "FILE_TOO_LARGE":
      case "TOTAL_SIZE_EXCEEDED":
        toastController.destructive("파일 첨부 최대 용량 초과", APPLY_MESSAGE.invalid.fileSize);
        break;
      case "INVALID_TYPE":
        toastController.destructive("첨부 파일 확장자 오류", APPLY_MESSAGE.invalid.fileType);
        break;
    }
  }, []);

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
      // 4. Pre-signed URL 요청
      const formattedFiles = formatForPresignedUrl(pdfFiles);
      const presignedData = await createPresignedUrlsMutateAsync(formattedFiles);

      // 5. S3에 파일 업로드 (병렬)
      await Promise.all(
        presignedData.map((data, index) =>
          uploadFileToS3Async({
            url: data.presignedUrl,
            file: pdfFiles[index],
          }),
        ),
      );

      // 6. PortfolioFile 생성 및 portfolios 업데이트
      const newPortfolioFiles: PortfolioFile[] = presignedData.map((data, index) => ({
        id: `${pdfFiles[index].name}-${pdfFiles[index].size}-${Date.now()}`,
        fileUrl: data.cdnUrl,
        fileName: pdfFiles[index].name,
        fileSize: pdfFiles[index].size.toString(),
      }));

      onChangePortfolios([...portfolios, ...newPortfolioFiles]);
    } catch {
      toastController.destructive(APPLY_MESSAGE.fail.uploadFile);
    }
  };

  const handleDelete = (id: string) => {
    const filtered = portfolios.filter(p => p.id !== id);
    onChangePortfolios(filtered);
  };

  return (
    <QuestionFieldWrapper title={question.title} isRequired={question.isRequired}>
      <div className='flex flex-col items-start gap-(--semantic-spacing-16) self-stretch rounded-(--semantic-radius-6) border border-(--semantic-stroke-alpha-subtle) bg-(--semantic-surface-standard) p-(--semantic-spacing-12)'>
        {portfolios.length > 0 && (
          <div className='flex flex-col gap-(--semantic-spacing-8) self-stretch'>
            {portfolios.map(portfolio => (
              <PortfolioFileItem key={portfolio.id} portfolio={portfolio} onDelete={handleDelete} />
            ))}
          </div>
        )}
        <Uploader.File
          accept={[...ALLOWED_FILE_EXTENSIONS]}
          maxFileSize={maxSizeBytes}
          existingFilesSize={totalSize}
          isLoading={isUploading}
          isDisabled={isMaxSizeReached}
          onUpload={files => void handleUpload(files)}
          onError={handleError}
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
      </div>
    </QuestionFieldWrapper>
  );
}
