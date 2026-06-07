import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Preloader from './components/Preloader/Preloader'
import './index.scss'

function Root() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <React.StrictMode>
      <App />
      <Preloader />
    </React.StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Root />)
