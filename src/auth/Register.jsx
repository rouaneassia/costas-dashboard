/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-strings */
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import { axiosClient } from '../api/axios';

import { useAuth } from '../contexts/AuthContext';
import Spinner from '../composantDashbord/Spinner';

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { user, setUser } = useAuth();

  const firstNameInput = useRef();
  const lastNameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = {
      name: `${firstNameInput.current.value} ${lastNameInput.current.value}`,
      email: emailInput.current.value,
      password: passwordInput.current.value,
      password_confirmation: confirmPasswordInput.current.value,
     
    };

    try {
      await axiosClient.get("/sanctum/csrf-cookie");
      const data = await axiosClient.post('/register', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (data.status === 201) {
        setUser(data.data.user);
        navigate('/');
      }
    } catch (error) {
      setErrors(error.response.data.errors);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 bg-gradient-to-br from-sky-50 to-indigo-50 text-gray-800">
      <div className="w-full max-w-xl rounded-xl shadow-md p-4 space-y-4 bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="mt-1 text-gray-600">It's quick and easy.</p>
        </div>

        <div className="border-t border-gray-300 pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
           

            {/* Name Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input ref={firstNameInput} type="text" placeholder="First name" className="w-full px-3 py-2 border rounded-lg" />
              <input ref={lastNameInput} type="text" placeholder="Last name" className="w-full px-3 py-2 border rounded-lg" />
            </div>
            {errors.name && <p className="text-red-700 -mt-4 ms-2">{errors.name}</p>}

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input ref={emailInput} type="text" placeholder="Email address" className="w-full pl-8 py-2 border rounded-lg" />
            </div>
            {errors.email && <p className="text-red-700 -mt-4 ms-2">{errors.email}</p>}

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input ref={passwordInput} type={showPassword ? 'text' : 'password'} placeholder="Password" className="w-full pl-8 py-2 border rounded-lg" />
            </div>
            {errors.password && <p className="text-red-700 -mt-4 ms-2">{errors.password}</p>}

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input ref={confirmPasswordInput} type={showPassword ? 'text' : 'password'} placeholder="Password Confirmation" className="w-full pl-8 py-2 border rounded-lg" />
            </div>


            {loading ? (
              <Spinner type="SignUp..." />
            ) : (
              <button
                type="submit"
                className="w-full cursor-pointer py-3 px-4 font-medium rounded-lg transition duration-200 transform hover:scale-[1.02] bg-blue-600 text-white"
              >
                Sign Up
              </button>
            )}
          </form>

          <p className="mt-4 text-center text-sm">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
