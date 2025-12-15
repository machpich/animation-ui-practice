import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Animation1 from './pages/animation/hover-effect/animation-1.tsx'
import './App.css'

function App() {
  return (
    <BrowserRouter basename="/animation-ui-practice">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/animation-1" element={<Animation1 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
