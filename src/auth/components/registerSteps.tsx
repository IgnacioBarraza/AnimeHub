import { RegisterStepsFormData } from '@/utils/interfaces'
import { RegisterStepsProps } from '@/utils/propsInterface'
import { Check, ChevronLeft, ChevronRight, Upload, User } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export default function RegisterSteps({ email, password }: RegisterStepsProps) {
  const [step, setStep] = useState(1)
  const [profilePicture, setProfilePicture] = useState<string | ArrayBuffer | null>(null)
  const navigate = useNavigate()

  const { register, handleSubmit, watch, setValue } = useForm<RegisterStepsFormData>({
    defaultValues: {
      nickname: '',
      favoriteGenres: [],
      languagePreference: 'subbed',
      email,
      password,
    }
  })

  const genres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy',
    'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life',
  ]

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicture(reader.result)
        setValue('profilePicture', reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenreToggle = (genre: string) => {
    const currentGenres = watch('favoriteGenres')
    const updatedGenres = currentGenres.includes(genre)
      ? currentGenres.filter((g) => g !== genre)
      : [...currentGenres, genre]
    setValue('favoriteGenres', updatedGenres)
  }

  const onSubmit: SubmitHandler<RegisterStepsFormData> = (data) => {
    if (step === 3) {
      console.log('Form submitted:', data)
      navigate('/home')
    } else {
      setStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const nickname = watch('nickname')

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-text mb-2">
                Nickname (required)
              </label>
              <input
                type="text"
                id="nickname"
                {...register('nickname', { required: true })}
                className="w-full px-3 py-2 bg-background-light border border-gray-700 rounded-md text-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your nickname"
              />
            </div>
        )
      case 2:
        return (
          <div>
              <label className="block text-sm font-medium text-text mb-2">
                Profile Picture (optional)
              </label>
              <div className="flex items-center justify-center w-32 h-32 mx-auto mb-4 bg-background-light border-2 border-dashed border-gray-700 rounded-full overflow-hidden">
                {profilePicture ? (
                  <img
                    src={profilePicture as string}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-gray-600" />
                )}
              </div>
              <div className="flex justify-center">
                <label
                  htmlFor="profile-upload"
                  className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  <Upload className="w-5 h-5 inline-block mr-2" />
                  Upload Picture
                </label>
                <input
                  type="file"
                  id="profile-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
        )
      case 3:
        return (
          <div>
              <label className="block text-sm font-medium text-text mb-2">
                Favorite Genres (optional)
              </label>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => handleGenreToggle(genre)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      watch('favoriteGenres').includes(genre)
                        ? 'bg-blue-600 text-white'
                        : 'bg-background-light text-text hover:bg-background-dark'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
              <label className="block text-sm font-medium text-text mb-2">
                Language Preference
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="subbed"
                    {...register('languagePreference')}
                    checked={watch('languagePreference') === 'subbed'}
                    className="mr-2"
                  />
                  <span className="text-text">Subbed</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="dubbed"
                    {...register('languagePreference')}
                    checked={watch('languagePreference') === 'dubbed'}
                    className="mr-2"
                  />
                  <span className="text-text">Dubbed</span>
                </label>
              </div>
            </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-background-lighter shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-text mb-6">
          Complete Your Profile
        </h2>
        <div className="mb-6">
          <div className="flex justify-between text-sm font-medium text-text">
            <span>Step {step} of 3</span>
            <span>{Math.round((step / 3) * 100)}% Complete</span>
          </div>
          <div className="mt-2 h-2 bg-background-light rounded-full">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderStepContent()}
          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center text-blue-500 hover:text-blue-400"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                type="submit"
                className={`ml-auto flex items-center ${
                  nickname ? 'bg-blue-600 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                } px-4 py-2 rounded-md hover:${nickname ? 'bg-blue-700' : ''} transition duration-300`}
                disabled={!nickname}
              >
                Next
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300"
              >
                Complete
                <Check className="w-5 h-5 ml-1" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}