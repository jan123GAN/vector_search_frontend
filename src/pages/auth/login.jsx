import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginUser } from "@/lib/api"
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null);

    try {
      const result = await loginUser(formData.email, formData.password)
      localStorage.setItem('isLoggedIn', 'true');
      setSuccessMessage('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/search');
      }, 1500);
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-[80vh] w-full flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
        <h2 className='text-4xl font-bold text-center mb-6'>
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
            Welcoome Back
          </span>
      </h2>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-4 py-2 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-4 py-2 rounded-lg">
              <CheckCircle className="h-5 w-5" />
              <span>{successMessage}</span>
            </div>
          )}
          <div className="space-y-2">
            <Input
              id="email"
              placeholder="name@example.com"
              className="w-full h-12 px-4 rounded-md bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400 outline-none"
        
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Input
              id="password"
              placeholder="Password"
              type="password"
              className="w-full h-12 px-4 rounded-md bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400 outline-none"
        
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="underline hover:text-primary">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

