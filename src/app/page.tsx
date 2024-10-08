'use client';

import Head from 'next/head';
import Quiz from './components/quiz';
import { useState } from 'react';
import { RecoilRoot } from 'recoil';
import { Button } from '@/components/ui/button';

function Home() {
  const [quizStarted, setQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    console.log("Quiz started");
    setQuizStarted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>HTML and CSS Quiz</title>
      </Head>
      {quizStarted ? (
        <RecoilRoot>
          <Quiz />
        </RecoilRoot>
      ) : (
        <Button onClick={handleStartQuiz} variant="outline">
          Start Quiz
        </Button>
      )}
    </div>
  );
}

export default Home;
