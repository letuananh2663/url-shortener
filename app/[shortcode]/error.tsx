"use client"

interface ErrorPageProps {
    message: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
            <h1 className="text-2xl font-bold text-red-500">{message}</h1>
            <p className="mt-2 text-gray-700">
                The link you are looking for may have expired or does not exist.
            </p>
        </div>
    );
};

export default ErrorPage;
