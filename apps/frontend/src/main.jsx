import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import './ButtonStyles.css'
import { FlashProvider } from './context/FlashContext.jsx'
import FlashMessage from './components/FlashMessage.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <FlashProvider>
      <FlashMessage />
      <ScrollToTop />
      <Navbar/>
      <App />
      <Footer/>
    </FlashProvider>
  </BrowserRouter>,
)

