/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useRef, useState } from 'react';

import { useAuth } from '../contexts/AuthContext';
import Spinner from '../composantDashbord/Spinner';

export default function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');
  const { login } = useAuth();

  const emailInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('');
    setLoading(true);
    const formData = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
    };

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setErrors(error.response?.data?.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-sky-50 to-indigo-50">
      <div className="w-full max-w-md rounded-2xl shadow-xl p-8 space-y-6 bg-white text-gray-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-gray-600">
            Please sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent bg-white border-gray-300 text-black"
                required
                ref={emailInput}
                defaultValue={'assiarouane@gmail.com'}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent bg-white border-gray-300 text-black"
                required
                ref={passwordInput}
                defaultValue={'assiarouane@gmail.com'}
              />
            </div>
          </div>
          
          {errors && (
            <div className="text-center text-red-500 bg-red-100 p-2 rounded-md">
              {errors}
            </div>
          )}

        

          {loading ? (
            <Spinner type={'Logging in...'} />
          ) : (
            <button
              type="submit"
              className="w-full cursor-pointer py-3 px-4 font-medium rounded-lg transition duration-200 transform hover:scale-[1.02] bg-blue-600 text-white"
            >
              Login
            </button>
          )}
        </form>

        <p className="text-center text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
