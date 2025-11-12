export default function AuthLayout({children}){
    return(
        <>
        <div className="flex items-center justify-center min-h-screen w-screen bg-gray-50">
            <div className="w-full flex items-center justify-center min-h-screen">
                <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">{children}</div>
            </div>
        </div>
        </>
    );
}