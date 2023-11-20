import React from 'react';
import { useEffect, useState } from 'react';
import Quiz from 'react-quiz-component';
// import Swal from "sweetalert2";

const QuizComp = ({ file, viewIndex, setViewIndex, series, postProgress }) => {
  const [quizData, setQuizData] = useState({
    quizTitle: 'ADOPT CSS QUIZ',
    quizSynopsis: '',
    nrOfQuestions: '4',
    questions: [
      {
        question: 'Which is not a domain name extension',
        questionType: 'text',
        questionPic: '', // if you need to display Picture in Question
        answerSelectionType: 'single',
        answers: ['.mil', '.com', '.int', '.org'],
        correctAnswer: '1',
        messageForCorrectAnswer: 'Correct answer. Good job.',
        messageForIncorrectAnswer: 'Incorrect answer. Please try again.',
        explanation: 'null',
        point: '1',
      },
      {
        question: 'How are links defined in an <a> tag?',
        questionType: 'text',
        questionPic: '', // if you need to display Picture in Question
        answerSelectionType: 'single',
        answers: ['Href', 'Src-link', 'Src', 'Hlink'],
        correctAnswer: '1',
        messageForCorrectAnswer: 'Correct answer. Good job.',
        messageForIncorrectAnswer: 'Incorrect answer. Please try again.',
        explanation: 'null',
        point: '1',
      },
      {
        question: 'When looking for all the processes running on a Linux system, what command should you use?',
        questionType: 'text',
        questionPic: '', // if you need to display Picture in Question
        answerSelectionType: 'single',
        answers: ['service', 'oterm', 'ps', 'xrun'],
        correctAnswer: '3',
        messageForCorrectAnswer: 'Correct answer. Good job.',
        messageForIncorrectAnswer: 'Incorrect answer. Please try again.',
        explanation: 'null',
        point: '1',
      },
      {
        question:
          'Which of the answers listed below refers to a package management system most often used on Debian and Debian-based Linux distributions?',
        questionType: 'text',
        questionPic: '', // if you need to display Picture in Question
        answerSelectionType: 'single',
        answers: ['kde', 'apt', 'yum', 'rpm'],
        correctAnswer: '2',
        messageForCorrectAnswer: 'Correct answer. Good job.',
        messageForIncorrectAnswer: 'Incorrect answer. Please try again.',
        explanation: 'null',
        point: '1',
      },
      {
        question: 'What is the correct HTML for making a hyperlink?',
        questionType: 'text',
        questionPic: '', // if you need to display Picture in Question
        answerSelectionType: 'single',
        answers: [
          '<a href="http://mcqsets.com">MCQ Sets Quiz</a>',
          '<http://mcqsets.com</a>',
          '<a name="http://mcqsets.com">MCQ Sets Quiz</a>',
          'url="http://mcqsets.com">MCQ Sets Quiz',
        ],
        correctAnswer: '1',
        messageForCorrectAnswer: 'Correct answer. Good job.',
        messageForIncorrectAnswer: 'Incorrect answer. Please try again.',
        explanation: 'null',
        point: '1',
      },
      {
        question: 'All variables in PHP start with which symbol?',
        questionType: 'text',
        questionPic: '', // if you need to display Picture in Question
        answerSelectionType: 'single',
        answers: ['&', '!', '#', '$'],
        correctAnswer: '4',
        messageForCorrectAnswer: 'Correct answer. Good job.',
        messageForIncorrectAnswer: 'Incorrect answer. Please try again.',
        explanation: 'null',
        point: '1',
      },
    ],
  });
  const onEndHandler = () => {
    postProgress(series[viewIndex].id);
  };
  return (
    <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
      <Quiz quiz={quizData} showDefaultResult={true} onComplete={onEndHandler} />
      {/* Buttons  */}
      <div style={{ position: 'absolute', top: '45%', width: '100%' }}>
        <div className="w-100 d-flex justify-content-between align-items-center">
          <button
            type="button"
            className="btn btn-outline-warning rounded-pill py-2 px-4"
            disabled={viewIndex === 0}
            onClick={() => setViewIndex(viewIndex - 1)}>
            <i className="bi bi-arrow-left"></i>
          </button>
          <button
            type="button"
            className="btn btn-outline-warning rounded-pill py-2 px-4"
            onClick={() => {
              if (viewIndex === series.length - 1) {
                // setCertificateDownloadable(true);
              } else {
                setViewIndex(viewIndex + 1);
              }
            }}>
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizComp;
