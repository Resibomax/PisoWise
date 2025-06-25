export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-[#FBF5F3] border-r-[#FBF5F3] border-b-[#FBF5F3] border-l-transparent rounded-full animate-spin mx-auto text-white"></div>
        <p className="mt-4 text-lg text-[#FBF5F3]">Loading...</p>
      </div>
    </div>
  );
}
