import React, { useState } from 'react';

const ContactForm = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "a597f941-3de0-4e24-a26e-2c9d31723b74");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      setResult("Something went wrong!");
    }
  };

  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
            Contact Us
          </span>
        </h2>
        <p className="text-lg md:text-xl text-gray-400 mb-8">
          Have questions or need support? Send us a message!
        </p>
        
        <form onSubmit={onSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full h-12 px-4 rounded-md bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full h-12 px-4 rounded-md bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400 outline-none"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            className="w-full h-32 p-4 rounded-md bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-cyan-400 outline-none"
          />
          <button
            type="submit"
            className="h-12 w-full bg-white text-black rounded-md hover:bg-gray-300 transition-all"
          >
            Send Message
          </button>
        </form>
        
        {result && (
          <div className="mt-4 text-sm font-medium">
            {result}
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactForm;