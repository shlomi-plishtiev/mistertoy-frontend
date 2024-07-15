import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import '../src/assets/style/main.css'

import { ToyIndex } from './pages/ToyIndex'
import { ToyDetails } from './pages/ToyDetails'
import { store } from './store/store'
import { ToyEdit } from './pages/ToyEdit'
import { Dashboard } from './pages/Dashboard'
import { HomePage } from './pages/HomePage'
import { AboutUs } from './pages/AboutUS'
import { AppHeader } from './cmps/AppHeader'
import { UserMsg } from './cmps/UserMsg'
// import { LoginSignup } from './pages/LoginSignup'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppHeader />
        <UserMsg />

        <main>
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<AboutUs />} path="/about" />
            <Route element={<ToyIndex />} path="/toy" />
            <Route element={<ToyDetails />} path="/toy/:toyId" />
            <Route element={<ToyEdit />} path="/toy/edit/:toyId?" />
            <Route element={<Dashboard />} path="/dashboard" />
            {/* <Route element={<LoginSignup />} path="/LoginSignup" /> */}
          </Routes>
        </main>
      </Router>
    </Provider>
  )
}
