// React
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

// Pages
import HomePage from './pages/home-page/HomePage'
import GameDemoPage from './pages/game-demo/GameDemo'

// Components
import Layout from './components/Layout'
import ClickSpark from './components/ClickSpark'

// Styles
import './App.scss'

function App() {
  return (
    <ClickSpark
      sparkColor='#fff'
      sparkSize={30}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/game-demo" element={<GameDemoPage />} />
          </Route>
        </Routes>
      </Router>
    </ClickSpark>
  )
}

export default App
