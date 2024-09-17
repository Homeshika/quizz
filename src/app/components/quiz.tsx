import { useState } from 'react';
import { quizData } from '@/public/quizdata';
import { Button } from '@/components/ui/button';
import { RadioGroup,RadioGroupItem } from '@radix-ui/react-radio-group';

const Quiz = () => {
  const [quiz, setQuiz] = useState({
    currentQuestion: 0,
    score: 0,
    answers: []
  });
  const [currentAnswer, setCurrentAnswer] = useState<number | null>(null);

  const handleAnswerChange = (answerIndex: number) => {
    const correctAnswer = quizData[quiz.currentQuestion]?.correctAnswer;

    setQuiz((prevQuiz) => {
      const isCorrect = answerIndex === correctAnswer;

      return {
        ...prevQuiz,
        score: isCorrect ? prevQuiz.score + 1 : prevQuiz.score,
        answers: [...prevQuiz.answers, answerIndex],
      };
    });
  };

  const handleUpdateCurrentAnswer = (answerIndex: number) => {
    setCurrentAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (quiz.currentQuestion < quizData.length - 1) {
      setQuiz((prevQuiz) => ({
        ...prevQuiz,
        currentQuestion: prevQuiz.currentQuestion + 1,
      }));
      setCurrentAnswer(null);
    }
  };

  if (quiz.currentQuestion >= quizData.length) {
    return (
      <div className="text-center">
        <h1 className="text-xl font-bold">Quiz Completed</h1>
        <p>Your final score is: {quiz.score} / {quizData.length}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold">Quiz</h1>
      <p>Question {quiz.currentQuestion + 1} of {quizData.length}</p>
      <p>{quizData[quiz.currentQuestion].question}</p>
      
      {/* <RadioGroup className="mt-4">
        {quizData[quiz.currentQuestion].options.map((option, index) => (
          <RadioGroupItem 
            key={index} 
            id={`option-${index}`} 
            value={index.toString()}
            onClick={() => {
              handleAnswerChange(index);
              handleUpdateCurrentAnswer(index);
            }}
          >
            {option}
          </RadioGroupItem>
        ))}
      </RadioGroup> */}
      <RadioGroup className="mt-4 space-y-2">
  {quizData[quiz.currentQuestion].options.map((option, index) => (
    <RadioGroupItem 
      key={index} 
      id={`option-${index}`} 
      value={index.toString()}
      className="block p-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
      onClick={() => {
        handleAnswerChange(index);
        handleUpdateCurrentAnswer(index);
      }}
    >
      {option}
    </RadioGroupItem>
  ))}
</RadioGroup>

      {currentAnswer !== null && (
        <p className="mt-4">
          {currentAnswer === quizData[quiz.currentQuestion].correctAnswer
            ? 'Correct!'
            : `Incorrect. The correct answer is ${quizData[quiz.currentQuestion].options[quizData[quiz.currentQuestion].correctAnswer]}.`}
        </p>
      )}

      <Button onClick={handleNextQuestion} className="mt-4">
        Next Question
      </Button>
      <p className="mt-4">Score: {quiz.score} / {quizData.length}</p>
    </div>
  );
};

export default Quiz;
