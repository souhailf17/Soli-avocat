import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ActionPage from './pages/ActionPage'
import SuiviPage from './pages/SuiviPage'
import SuiviResultsPage from './pages/SuiviResultsPage'
import RecherchePage from './pages/RecherchePage'
import RechercheResultsPage from './pages/RechercheResultsPage'
import DossiersPage from './pages/DossiersPage'
import { DEFAULT_LANGUAGE } from './config/locale'
import './styles.css'

document.documentElement.lang = DEFAULT_LANGUAGE

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/actions/suivi" element={<SuiviPage />} />
        <Route path="/actions/suivi/resultats" element={<SuiviResultsPage />} />
        <Route path="/actions/recherches" element={<RecherchePage />} />
        <Route path="/actions/recherches/resultats" element={<RechercheResultsPage />} />
        <Route path="/actions/liste-dossiers" element={<DossiersPage />} />
        <Route path="/actions/:action" element={<ActionPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
