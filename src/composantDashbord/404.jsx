import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center p-5">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <p className="text-xl text-gray-700 mt-4">Page Not Found</p>
            <p className="text-md text-gray-500 mt-2">Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Go Back Home
            </Link>
        </div>
    );
}
