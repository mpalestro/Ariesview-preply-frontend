'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from "next/link"

export default function SignUp() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Signup failed')
        setIsLoading(false)
        return
      }

      router.push('/operations-dashboard/home')
    } catch (err) {
      setError('Something went wrong')
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto w-full">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Create your account</h1>
        <p className="text-gray-600">Join AriesView for powerful real estate analytics</p>
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-lg border border-gray-200">
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">First name</label>
                <input 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  className="form-input w-full py-3 px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200" 
                  type="text" 
                  placeholder="John" 
                  required 
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Last name</label>
                <input 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  className="form-input w-full py-3 px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200" 
                  type="text" 
                  placeholder="Smith" 
                  required 
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
              <input 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="form-input w-full py-3 px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200" 
                type="email" 
                placeholder="your@email.com" 
                required 
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Phone</label>
              <input 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                className="form-input w-full py-3 px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200" 
                type="tel" 
                placeholder="(123) 456-7890" 
                required 
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Password</label>
              <input 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                className="form-input w-full py-3 px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200" 
                type="password" 
                placeholder="••••••••" 
                required 
              />
            </div>
          </div>

          <div className="mt-8">
            <button 
              type="submit" 
              className="btn w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-200 flex justify-center items-center shadow-sm" 
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">
          Already have an account? <Link className="text-blue-600 hover:text-blue-800 font-medium" href="/signin">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
