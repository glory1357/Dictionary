import { lazy, Suspense } from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import('../404/404'));
const HomePage = lazy(() => import('../homePage/HomePage'));
const ResultPage = lazy(() => import('../resultPage/ResultPage'));

const App = () => {

    return (
        <Router>
            <div className="app">
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<HomePage/> }/>
                            <Route path="/:wordKey" element={<ResultPage/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
        </div>
        </Router>
    )
   }

export default App;