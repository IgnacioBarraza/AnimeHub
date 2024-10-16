import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <form className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-text-light"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full px-3 py-2 bg-background-light border border-gray-700 rounded-md text-text focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-text-light"
        >
          Password
        </label>
        <div className="mt-1 relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            className="block w-full px-3 py-2 bg-background-light border border-gray-700 rounded-md text-text focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-text"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 bg-background-light border-gray-700 rounded text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-text-light font-medium"
          >
            Remember me
          </label>
        </div>
        <div className="text-sm">
          <a href="#" className="font-medium text-blue-500 hover:text-blue-400">
            Forgot your password?
          </a>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign in
        </button>
      </div>
    </form>
  )
}
