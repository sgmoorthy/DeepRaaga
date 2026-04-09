import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

console.log('Initializing React application')
const rootElement = document.getElementById('root')
console.log('Root element:', rootElement)

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  console.log('Created React root')
  root.render(
    <React.StrictMode>
      <BrowserRouter basename="/DeepRaaga/">
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
  console.log('Rendered App component')
} else {
  console.error('Root element not found!')
}