import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ChatBot from './components/ChatBot'
import Home from './pages/Home'
import Browse from './pages/Browse'
import DupeFinder from './pages/DupeFinder'
import PerfumeDetail from './pages/PerfumeDetail'
import './index.css'

// Start each page at the top (BrowserRouter keeps the previous scroll position).
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="grain min-h-screen flex flex-col bg-noir-950 text-ivory-100">
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/dupe-finder" element={<DupeFinder />} />
            <Route path="/perfume/:id" element={<PerfumeDetail />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </Router>
  )
}

export default App
