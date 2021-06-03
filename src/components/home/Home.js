import React, { useEffect, useState } from "react";
import localStorage from "../../utils/localStorage";

const Home = () => {
  const [quizs, setQuizs] = useState([]);

  const loadQuizs = () => {
    localStorage.getData("quizs").then((res) => setQuizs(res));
  };

  useEffect(() => {
    loadQuizs();
  }, []);

  return (
    <div>
      <h1>All quizs</h1>
      {!quizs.length && <div className="text-600">No quiz</div>}
      {quizs.map((quiz, i) => (
        <div key={i}>{quiz.title}</div>
      ))}
    </div>
  );
};

export default Home;
