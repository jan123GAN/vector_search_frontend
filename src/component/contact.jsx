import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccessMessage('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <h2 className='text-4xl font-bold text-center mb-6'>
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
            Contact Us
          </span>
      </h2>
      <p className="text-lg md:text-xl text-gray-400 mb-8">
          Have questions or need support? Send us a message!
        </p>
      <form onSubmit={handleSubmit} className="space-y-6">
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

        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full h-12 px-4 rounded-md bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400 outline-none"
        
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full h-12 px-4 rounded-md bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400 outline-none"
        
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full h-32 p-4 rounded-md bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400 outline-none"
        
            required
          />
        </div>
        
        <Button type="submit"  disabled={isLoading}
           className="h-12 w-full bg-white text-black rounded-md hover:bg-gray-300 transition-all"
        >
          {isLoading ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </div>
  );
}