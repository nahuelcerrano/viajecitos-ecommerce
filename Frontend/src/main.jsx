import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { ViajecitosApp } from './ViajecitosApp'
import { ScrollToTop } from './helpers/ScrollToTop'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <ViajecitosApp />
    </BrowserRouter>
  </React.StrictMode>,
)
