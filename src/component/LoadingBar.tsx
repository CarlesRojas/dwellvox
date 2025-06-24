const LoadingBar = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-52 h-2 bg-gray-200 rounded overflow-hidden">
                <div className="h-full bg-indigo-500 animate-loading-bar" style={{ width: "60%" }} />
            </div>
        </div>
    );
};

export default LoadingBar;
