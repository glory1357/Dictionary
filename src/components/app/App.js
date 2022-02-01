import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from '../homePage/HomePage';
import Spinner from '../spinner/Spinner';

const Page404 = lazy(() => import('../404/404'));
const ResultPage = lazy(() => import('../resultPage/ResultPage'));

function App() {
  return (
    <Router>
      <div className="app">
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/dictionary" element={<HomePage />} />
              <Route path="/dictionary/:wordKey" element={<ResultPage />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
