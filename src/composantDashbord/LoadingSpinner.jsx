const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        className="w-15 h-15 border-4 border-t-indigo-600 border-gray-300 rounded-full animate-spin"
      ></div>

    </div>
  );
};

export default LoadingSpinner;