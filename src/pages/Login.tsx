import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      
      if (isSignUp) {
        await signUp(email, password, {
          username,
          full_name: fullName
        });
        // After signup, user needs to verify their email
        setError('Please check your email for verification link');
      } else {
        await signIn(email, password);
        navigate('/'); // Redirect to home page after successful login
      }
    } catch (err: any) {
      let errorMessage = 'Authentication failed';
      
      if (err.message.includes('Invalid login credentials')) {
        errorMessage = 'Invalid email or password';
      } else if (err.message.includes('User profile not found')) {
        errorMessage = 'Account not found. Please sign up first.';
      } else if (err.message.includes('Email not confirmed')) {
        errorMessage = 'Please verify your email before logging in.';
      }
      
      setError(errorMessage);
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Starry background */}
      <div className="absolute inset-0 stars">
        {/* Shooting stars */}
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        {/* Logo and Title */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Star className="w-12 h-12 text-yellow-200" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-yellow-100/80">
            {isSignUp ? 'Sign up to continue your astrological journey' : 'Sign in to continue your astrological journey'}
          </p>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md bg-black/30 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-yellow-100 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {isSignUp && (
              <>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-yellow-100 mb-2">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-yellow-100 mb-2">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-yellow-100 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-transparent transition-all"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/20 bg-white/10 text-yellow-400 focus:ring-yellow-400/50"
                />
                <label htmlFor="remember-me" className="ml-2 block text-yellow-100">
                  Remember me
                </label>
              </div>
              {!isSignUp && (
                <a href="#" className="text-yellow-200 hover:text-yellow-100 transition-colors">
                  Forgot password?
                </a>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-slate-900 py-3 px-4 rounded-lg font-semibold hover:bg-yellow-300 transition-all shadow-lg hover:shadow-yellow-400/25"
            >
              {loading ? (
                'Processing...'
              ) : (
                <>
                  {isSignUp ? (
                    <>Sign Up</>
                  ) : (
                    <>Sign In</>
                  )}
                </>
              )}
            </button>

            <div className="mt-6 text-center">
              <p className="text-yellow-100">
                {isSignUp ? (
                  <>Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(false)}
                      className="text-yellow-200 hover:text-yellow-100 transition-colors font-semibold"
                    >
                      Sign In
                    </button>
                  </>
                ) : (
                  <>Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(true)}
                      className="text-yellow-200 hover:text-yellow-100 transition-colors font-semibold"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;