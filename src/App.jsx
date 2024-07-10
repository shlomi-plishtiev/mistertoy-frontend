import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToyIndex } from './pages/ToyIndex';
import { ToyDetails } from './cmps/ToyDetails';
import { store } from './store/store';

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<ToyIndex />} />
          <Route path="/toys/:toyId" element={<ToyDetails />} />
        </Routes>
      </Router>
    </Provider>
  );
}
