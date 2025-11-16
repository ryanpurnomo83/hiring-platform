export default function LoadingSpinner(){
    return(
        <div className="flex justify-center items-center w-full h-full py-5">
            <div className="relative w-20 h-20">
                <div className="absolute w-full h-full border-10 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                {/* <div className="absolute w-full h-full rounded-full border-4 border-blue-300 border-t-transparent"></div> */}
            </div>
        </div>
    );
}