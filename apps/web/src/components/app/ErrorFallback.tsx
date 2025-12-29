export function ErrorFallback() {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-5 text-center">
      <h1 className="mb-4 text-2xl font-bold">예상치 못한 오류가 발생했습니다</h1>
      <p className="text-gray-600">페이지를 표시하는 중 문제가 발생했습니다.</p>
    </div>
  );
}
