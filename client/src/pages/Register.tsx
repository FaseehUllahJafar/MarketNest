import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { registerThunk } from '../store/authSlice'
import type { AppDispatch } from '../store'
import type { RegisterRequest } from '../types/auth.types'
import { Button, Input } from '../components/ui'

export default function Register() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [form, setForm] = useState<RegisterRequest>({ firstName: '', lastName: '', email: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const set = (key: keyof RegisterRequest) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await dispatch(registerThunk(form)).unwrap()
      navigate('/')
    } catch {
      setError('Could not create the account. The email may already be registered.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="mb-6 text-2xl font-semibold">Create an account</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Input label="First name" value={form.firstName} onChange={set('firstName')} required />
          <Input label="Last name" value={form.lastName} onChange={set('lastName')} required />
        </div>
        <Input label="Email" type="email" value={form.email} onChange={set('email')} required />
        <Input label="Password" type="password" minLength={8} value={form.password} onChange={set('password')} required />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" loading={loading} className="w-full">Create account</Button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Already registered? <Link to="/login" className="text-indigo-600">Sign in</Link>
      </p>
    </div>
  )
}
