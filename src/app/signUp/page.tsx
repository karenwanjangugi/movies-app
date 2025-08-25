'use client';

import { useState } from 'react';
import Button from '../Shared/Button/index'; 
import Input from '../Shared/Input/index';   
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Link from 'next/link';


interface SignUpProps {
  onBackToHome: () => void; 
}


export default function SignUp({ onBackToHome }: SignUpProps) {
  const [formData, setFormData] = useState({
    email: '',           
    password: '',        
    confirmPassword: '', 
    agreeToTerms: false, 
  });

  const [showPassword, setShowPassword] = useState(false); 

  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!formData.agreeToTerms) {
      alert("You must agree to the terms and conditions.");
      return; 
    }

    console.log('Form submitted:', formData);
    alert(`Account creation initiated for: ${formData.email}`); 
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-white"> 

        <div className="text-center mb-8"> 
          <h1 className="text-4xl font-bold mb-2">
            Join <span className="text-[#FEAF23]">Moovie</span> 
          </h1>
          <p className="text-gray-400">Create your account and start streaming</p>
        </div>

        <div className="bg-gray-900/50 border border-gray-700 rounded-lg shadow-md px-6 py-4">
          <h2 className="text-2xl font-semibold mb-1">Create Account</h2>
          <p className="text-gray-400 mb-6">Enter your details to get started</p>

          
          <form onSubmit={handleSubmit} className="space-y-6"> 
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-300"> 
                Email Address
              </label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email"
                value={formData.email} 
                onChange={e => handleChange('email', e.target.value)} 
                className="bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:border-[#FEAF23] focus:ring-1 focus:ring-[#FEAF23]"
                required 
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative"> 
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password (min. 8 characters)"
                  value={formData.password}
                  onChange={e => handleChange('password', e.target.value)}
                  className="bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:border-[#FEAF23] focus:ring-1 focus:ring-[#FEAF23] pr-10" // `pr-10` adds padding on the right for the icon
                  required
                />
                
                <button
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"} 
                >
                  {showPassword ? <FaRegEyeSlash className="w-5 h-5" /> : <FaRegEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={e => handleChange('confirmPassword', e.target.value)}
                  className="bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:border-[#FEAF23] focus:ring-1 focus:ring-[#FEAF23] pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? <FaRegEyeSlash className="w-5 h-5" /> : <FaRegEye className="w-5 h-5" />}
                </button>
              </div>
              {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">Passwords do not match.</p>
              )}
            </div>
            <div className="flex items-center space-x-2 pt-2"> 
              <input
                id="terms" 
                type="checkbox"
                checked={formData.agreeToTerms} 
                onChange={e => handleChange('agreeToTerms', e.target.checked)}
                className="w-4 h-4 text-[#FEAF23] bg-gray-700 border-gray-600 rounded focus:ring-[#FEAF23] focus:ring-offset-0 focus:ring-2"
              />
              <label htmlFor="terms" className="text-sm text-gray-300 select-none cursor-pointer"> 
                I agree to the{' '}
                <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-[#FEAF23] hover:underline"> 
                  Terms of Service
                </a>
                {' '}and{' '}
                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[#FEAF23] hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <Button
              type="submit" 
              disabled={!formData.agreeToTerms || (formData.password !== formData.confirmPassword) || !formData.password}
              className="w-full bg-[#FEAF23] hover:bg-[#FEAF23]/80 text-white py-3 rounded-md font-semibold
                         disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-300" 
            >
              Create Account
            </Button>
          </form>
        </div>

       
        <div className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
         
          <a href="/signin" className="text-[#FEAF23] hover:underline font-medium">
            Sign In
          </a>
        </div>

        <div className="mt-6 text-center">
          <Link href ="/"><Button
            variant="ghost" 
            onClick={onBackToHome} 
            className="text-gray-400 hover:text-[#FEAF23] transition-colors"
            aria-label="Go back to the home page"
          >
            ← Back to Home
          </Button></Link>
        </div>
      </div>
    </div>
  );
}
