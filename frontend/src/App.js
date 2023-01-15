import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Signup from "./pages/Signup"
import NewPost from "./pages/NewPost"
import EditPost from "./pages/EditPost"
import UserPosts from "./pages/UserPosts"
import SinglePostPage from "./pages/SinglePostPage"
import ErrorPage from "./pages/ErrorPage"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { ToastContainer } from "react-toastify"
import PrivateRoute from "./components/PrivateRoute"
import "react-toastify/dist/ReactToastify.css"
/* import GlobalStyle from "./global" */

function App() {
  return (
   
    <BrowserRouter>
     
      <Navbar />
      <Routes>
        <Route>
          <Route exact path="/" element={<Home />} />  
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/create" element={<NewPost />} />
          <Route path="/posts/userPosts/:id/edit" element={<PrivateRoute><EditPost/></PrivateRoute>} />
          <Route path="/posts/userPosts/:id" element={<PrivateRoute><UserPosts /></PrivateRoute>} />
          <Route path="/posts/:id" element={<SinglePostPage/>} />  
          <Route path="/about" element={<About/>} />     
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
