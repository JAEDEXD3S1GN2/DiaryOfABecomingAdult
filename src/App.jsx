import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Home from './pages/Home/Home';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Aboutus from './pages/AboutUs/Aboutus';
import Contactus from './pages/ContactUs/Contactus';
import Login from './pages/Login/Login';
import Register from './pages/Signup/Signup';
import NewsletterSignup from './pages/Newsletter/Newsletter';
import Blog from './pages/Blog/Blog';
import { Mode } from './AppContext';
import AdminRoute from './components/adminRoute/adminRoute';
import AdminDashboard from './pages/Admindashboard/adminDashboard';
import AdminCreatePost from './pages/createPost/createPost';
import PostDetails from './pages/postDetails/postDetails';
import EditPost from './pages/editPost/editPost';


function App() {
  const [count, setCount] = useState(0);
  const [isLoggedin, setIsLoggedin] = useState(false);

  return (
    <Mode.Provider value={{isLoggedin, setIsLoggedin}}>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Aboutus />} />
      <Route path="/Contact" element={<Contactus />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Newsletter" element={<NewsletterSignup />} />
      <Route path="/Blog" element={<Blog />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/register" element={<Register />} />
       <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route path='/Create-post' element={<AdminCreatePost/>} />
      <Route path="/blog/:id" element={<PostDetails />} />
      <Route path="/editblogpost/:id" element={<EditPost />} />

    </Routes>
    <Footer />
    </Mode.Provider >
  )
}

export default App
