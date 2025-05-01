import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { registerUser } from "@/lib/api"
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      setSuccessMessage('Registration successful! Redirecting to login...');
      localStorage.setItem('isLoggedIn', 'true');
      setTimeout(() => {
        navigate('/search');
      }, 1500);
    } catch (error) {
      setError(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex h-[80vh] max-w-2xl flex-col items-center justify-center">
      <div className="mx-auto max-w-2xl flex   flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h2 className='text-4xl font-bold text-center mb-6'>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
              Create an Account
            </span>
          </h2>
          <p className="text-sm text-muted-foreground">
            Enter your details below to create your account
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
              id="name"
              placeholder="Full Name"
              className="w-full h-12 px-4 rounded-md bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400 outline-none"

              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              className="w-full h-12 px-4 rounded-md bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400 outline-none"

              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Input
              id="password"
              placeholder="Password"
              className="w-full h-12 px-4 rounded-md bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400 outline-none"

              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Input
              id="confirmPassword"
              className="w-full h-12 px-4 rounded-md bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400 outline-none"

              placeholder="Confirm Password"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline hover:text-primary">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
