// React
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

// Pages
import HomePage from './pages/home-page/HomePage'

// Components
import Layout from './components/Layout'

// Styles
import './App.scss'

function App() {
  return (
    <Router>
      <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/game-demo" element={<HomePage />} />
          </Route>
      </Routes>
    </Router>
  )
}

export default App
