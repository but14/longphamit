export default function NotFound() {
  return (
    <div className="min-h-[50vh] grid place-items-center">
      <div className="text-center space-y-3">
        <h1 className="text-5xl font-bold">404</h1>
        <p className="text-neutral-300">Không tìm thấy nội dung.</p>
        <a href="/" className="underline">Về trang chủ</a>
      </div>
    </div>
  );
}
