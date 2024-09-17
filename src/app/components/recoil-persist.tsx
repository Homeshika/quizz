'use client';

import Head from 'next/head';
import Quiz from './components/quiz';
import { useState } from 'react';
import { RecoilRoot } from 'recoil';

function Home() {
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    console.log("Quiz started");
    setQuizStarted(true);
  };

  return (
    <div>
      <Head>
        <title>HTML and CSS Quiz</title>
      </Head>
      {quizStarted ? (
        <RecoilRoot>
          <Quiz />
        </RecoilRoot>
      ) : (
        <button onClick={handleStartQuiz}>Start Quiz</button>
      )}
    </div>
  );
}

export default Home;
