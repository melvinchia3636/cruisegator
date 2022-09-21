import { Route, Routes, useLocation } from 'react-router-dom';
import React from 'react';

import DocumentTitle from 'react-document-title';
import Homepage from './components/Homepage';
import { Nav, Footer } from './components/Utils';
import Error404 from './components/Error';
import Database from './components/Database';
import Map from './components/Map';
import Ship from './components/Ship';

import 'tailwindcss/tailwind.css';
import './style.scss';

export default function App(): JSX.Element {
  const location = useLocation();
  const pathname = location.pathname.match(/\/(.*?)(?:\/|$)/);
  const pagename = pathname != null ? pathname[pathname.length - 1] : 'home';

  console.log(pagename[0]);

  return (
    <div className="flex flex-col bg-white">
      <Nav className={pagename} />
      <DocumentTitle
        title={
          pagename[0] !== undefined
            ? `${pagename[0].toUpperCase() + pagename.slice(1)} - Cruisegator`
            : 'Cruisegator'
        }
      />
      <main
        className={`container-fluid p-0 overflow-hidden h-full ${
          pathname !== null ? pathname[pathname.length - 1] : ''
        }`}
      >
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/database" element={<Database />} />
          <Route path="/map" element={<Map />} />
          <Route path="/ship/:id" element={<Ship />} />
          <Route element={<Error404 />} />
        </Routes>
      </main>
      {!(pagename === 'map') ? <Footer /> : ''}
    </div>
  );
}
