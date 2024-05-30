import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Contacts from './components/Contacts';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route 
          index
          element={<Contacts />}
        />
        <Route
          path="/:id"
          element={<Contacts />}
        />
      </Routes>
    </Layout>
  ); 
}
