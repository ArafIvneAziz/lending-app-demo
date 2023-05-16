import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import AuthService from '../services/AuthService';

const cookies = new Cookies();

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (isLogin) {
      try {
        const token = await AuthService.login(email, password);
        cookies.set('User_Auth', token.token, { path: '/' });
        cookies.set('User_ID', token.userId, { path: '/' });
        window.location.href = '/'; // redirect to home page
      } catch (error) {
        console.error('Login failed:', error.message);
      }
    } else {
      if (password !== confirmPassword) {
        console.error('Registration failed: Passwords do not match');
        return;
      }
      try {
        const token = await AuthService.register(email, password);
        cookies.set('User_Auth', token.token, { path: '/' });
        cookies.set('User_ID', token.userId, { path: '/' });
        window.location.href = '/'; // redirect to home page
      } catch (error) {
        console.error('Registration failed:', error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl mb-4">{isLogin ? 'Login' : 'Register'}</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {!isLogin && (
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>
          )}
          <div className="flex items-center justify-between">
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="submit"
  >
    {isLogin ? 'Login' : 'Register'}
  </button>
  <button
    className="text-blue-500 hover:text-blue-700 font-bold"
    type="button"
    onClick={() => setIsLogin(!isLogin)}
  >
    {isLogin ? 'Need to register?' : 'Already registered?'}
  </button>
</div>
</form>
</div>
</div>
);
}
export default AuthForm;
