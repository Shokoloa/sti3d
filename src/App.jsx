import React, { useState, useEffect, Suspense, lazy } from "react";
import Snowfall from 'react-snowfall';
import Confetti from "react-confetti";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LetterGlitch } from './components/LetterGlitch';

// CSS
import "./assets/styles/index.css";
import "./assets/styles/medias.css";

const lazyWithDelay = (importFunc, delay = 0) => {
  return lazy(() =>
    Promise.all([
      importFunc(),
      new Promise((resolve) => setTimeout(resolve, delay)),
    ]).then(([module]) => module)
  );
};

const ScrollToTop = lazyWithDelay(() => import("./components/ScrollToTop").then(module => ({ default: module.ScrollToTop })));
import { Analytics } from "@vercel/analytics/react";

// Pages
const Home = lazyWithDelay(() => import("./pages/Home").then(module => ({ default: module.Home })), 2000);
const NotFound = lazyWithDelay(() => import("./pages/NotFound").then(module => ({ default: module.NotFound })));

const Loader = () => {
  return (
    <main>
      <section className="errorBackground">
        <div></div>
      </section>
      <section className="loader">
        <div className="circle">
          <div className="dot"></div>
          <div className="outline"></div>
        </div>
        <div className="circle">
          <div className="dot"></div>
          <div className="outline"></div>
        </div>
        <div className="circle">
          <div className="dot"></div>
          <div className="outline"></div>
        </div>
        <div className="circle">
          <div className="dot"></div>
          <div className="outline"></div>
        </div>
      </section>
    </main >
  )
};

const Content = () => {
  let date = new Date(), currentMonth = date.getMonth(), currentDay = date.getDate();
  const [snowflakeCount, setSnowFlakeCount] = useState(currentMonth === 11 ? (currentDay === 24 ? 500 : currentDay * 3) : 0);
  const windSpeed = currentDay === 24 ? [5, 10] : [0, 1];

  useEffect(() => {
    window.setSnowFlakeCount = setSnowFlakeCount;
    return () => { delete window.setSnowFlakeCount; };
  }, []);

  return (
    <div className="text" style={{ transitionDuration: '1s' }}>
      <section className="bg">
        <LetterGlitch
          glitchSpeed={100}
          centerVignette={true}
          outerVignette={true}
          smooth={true}
        />
      </section>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScrollToTop />
      <Analytics />
      {snowflakeCount > 0 && (
        <div className="snowflakes">
          <Snowfall wind={windSpeed} speed={[0, 2]} snowflakeCount={snowflakeCount} />
        </div>
      )}
      {((currentMonth === 11 && currentDay === 31) || (currentMonth === 0 && currentDay === 1)) && (
        <div className="snowflakes">
          <Confetti width={100} height={100} />
        </div>
      )}
    </div>
  )
}

export const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Content />
      </Suspense>
    </Router>
  )
};