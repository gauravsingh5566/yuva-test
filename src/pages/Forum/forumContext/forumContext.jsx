import { useState, createContext, useContext, useReducer } from 'react';
import forumReducer from './forumReducer';
import { apiForum } from 'api';

const ForumContext = createContext();

const initialState = {
  questions: [],
};
const ForumProvider = ({ children }) => {
  const [state, dispatch] = useReducer(forumReducer, initialState);
  const setQuestions = (questions) => {
    return dispatch({
      type: 'SET_QUESTIONS',
      payload: {
        questions: questions,
      },
    });
  };

  const getQuestions = async () => {
    let questions = [];
    try {
      // const res = await apiForum.get(`/v1/api/query?sort=top-questions&filter=${filter}&page=${page}&limit=${limit}&offset=${offset}`);
      const res = await apiForum.get(`/v1/api/query`);
      if (res.status === 200) {
        questions.push(res?.data?.results);
      }
    } catch (error) {}
    return dispatch({
      type: 'GET_QUESTIONS',
      payload: {
        questions: questions,
      },
    });
  };

  // Api
  return (
    <ForumContext.Provider
      value={{
        ...state,
        setQuestions,
        getQuestions,
      }}>
      {children}
    </ForumContext.Provider>
  );
};

//Global custom hook
const useForumContext = () => {
  return useContext(ForumContext);
};

export { ForumContext, ForumProvider, useForumContext };
