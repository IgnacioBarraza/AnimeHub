import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { RegisterFormData, RegisterProps } from '@/utils/interfaces'
import { useForm, SubmitHandler } from 'react-hook-form'

export default function Register({ onSubmit }: RegisterProps) {
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>()

  const handleRegister: SubmitHandler<RegisterFormData> = (data) => {
    onSubmit(data.email, data.password) // Pass email and password back to the parent component
  }

  return (
    <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-light">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          {...register('email', { required: 'Email is required' })}
          className="mt-1 block w-full px-3 py-2 bg-background-light border border-gray-700 rounded-md text-text focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-light">
          Password
        </label>
        <div className="mt-1 relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password', { required: 'Password is required' })}
            className={`block w-full px-3 py-2 bg-background-light border ${errors.password ? 'border-red-500' : 'border-gray-700'} rounded-md text-text focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-text"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {/* {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>} */}
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Account
        </button>
      </div>
    </form>
  )
}
