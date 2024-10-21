import { useState } from 'react'
import { Login } from './components/login'
import Register from './components/register'
import RegisterSteps from './components/registerSteps'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [showRegisterSteps, setShowRegisterSteps] = useState(false)
  const [registerData, setRegisterData] = useState({ email: '', password: '' })

  const handleRegisterSubmit = (email: string, password: string) => {
    // Set the registration data and switch to the steps view
    setRegisterData({ email, password })
    setShowRegisterSteps(true)
  }

  return (
    <div className="flex items-center justify-center" style={{ height: 'calc(90vh - 128px)' }}>
      <div className="flex w-full max-w-4xl bg-background-lighter rounded-lg shadow-lg overflow-hidden mx-auto">
        <div className="hidden md:block w-1/2 relative">
          <img src="/anime-placeholder.webp" alt="Anime character" />
        </div>
        <div className="w-full md:w-1/2 p-8">
          {showRegisterSteps ? (
            <div className="flex items-center justify-center h-full">
              <RegisterSteps email={registerData.email} password={registerData.password} />
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-text mb-6">
                {isLogin ? 'Login' : 'Create Account'}
              </h2>
              {isLogin ? (
                <Login />
              ) : (
                <Register onSubmit={handleRegisterSubmit} />
              )}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
                  <button
                    className="ml-1 font-medium text-blue-500 hover:text-blue-400"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? 'Create one' : 'Sign in'}
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
