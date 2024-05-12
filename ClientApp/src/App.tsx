import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Counter from './components/Counter';
import Home from './components/Home';
import Layout from './components/Layout';
import Contacts from './components/Contacts';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route 
          index
          element={<Home />}
        />

        <Route 
          path='/counter'
          element={<Counter />}
        />
        
        {/* Dodaj rutu za adresar */}
        <Route
          path='/adresar'
          element={<Contacts />}
        />
      </Routes>
    </Layout>
  ); 
}
