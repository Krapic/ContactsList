import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Home from './components/Home';
import Layout from './components/Layout';

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

        <Route 
          path='/fetch-data'
          element={<FetchData />}
        />
      </Routes>
    </Layout>
  ); 
}
