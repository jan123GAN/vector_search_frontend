import { Routes, Route, Navigate } from 'react-router-dom';
import About from '@/pages/about';
import Login from '@/pages/auth/login';
import Register from '@/pages/auth/register';
import Privacy from '@/pages/privacy';
import Layout from '@/Layout';
import AddDocument from '@/pages/add-document';
import Search from '@/pages/search';
import HeroSection from '@/component/hero';
import Navbar from '@/component/navbar';
import Footer from './component/footer';
import ReadDocs from './pages/read-docs';
import ContactForm from './component/contact';

const isLoggedIn = () => {
  const loginState = localStorage.getItem('isLoggedIn') === 'true';
  if (!loginState) {
    return false;
  }
  return true;
};

const ProtectedRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={isLoggedIn() ? <Navigate to="/search" /> : <HeroSection />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/doc" element={<ReadDocs />} />
        <Route path="/contact" element={<ContactForm/>}/>
        
        {/* Protected routes */}
        <Route path="/add-document" element={<ProtectedRoute><AddDocument /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
