// components/Background.jsx
export default function Background() {
  return (
    <div className="absolute inset-0 -z-10 animated-gradient overflow-hidden">
      {/* Floating blobs */}
      <div className="absolute w-72 h-72 bg-purple-400 blob-float top-10 left-10 opacity-70 rounded-full"></div>
      <div className="absolute w-96 h-96 bg-pink-400 blob-float bottom-10 right-20 opacity-50 rounded-full"></div>
      <div className="absolute w-64 h-64 bg-yellow-300 blob-float top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-60 rounded-full"></div>
    </div>
  );
}
