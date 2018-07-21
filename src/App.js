import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  
  checkCorrect() {
    this.setState({ correct: this.state.questions.every(q => q.correct) }, () => {
      if (!this.state.correct) {
        let { questions } = this.state;
        questions = questions.map(q => { return {...q, invalid: !q.correct} });
        this.setState({ questions });
        return;
      }
    });
  }
  
  getInitialState() {
    const setCorrect = idx => isCorrect => {
      const { questions } = this.state;
      questions[idx].correct = isCorrect;
      this.setState({ questions });
    };
    
    const getRandomNumberUpTo = operandMax => Math.trunc(Math.random() * 1000) % operandMax;
    const createQuestion = (operandMax, operator, number, operatorString) => {
      const operand = getRandomNumberUpTo(operandMax);
      return { operator, number, operand, operatorString, onChange: setCorrect, onEnter: this.checkCorrect.bind(this), invalid: undefined };
    };
    
    return {
      correct: undefined,
      questions: [
        createQuestion(99, (a, b) => a + b, getRandomNumberUpTo(99), "+"),
        createQuestion(99, (a, b) => a - b, getRandomNumberUpTo(99), "-"),
        createQuestion(12, (a, b) => a * b, 4, "x"),
        createQuestion(12, (a, b) => a * b, 5, "x"),
        createQuestion(12, (a, b) => a * b, 6, "x"),
        createQuestion(99, (a, b) => a + b, getRandomNumberUpTo(99), "+"),
        createQuestion(99, (a, b) => a - b, getRandomNumberUpTo(99), "-"),
        createQuestion(12, (a, b) => a * b, 4, "x"),
        createQuestion(12, (a, b) => a * b, 5, "x"),
        createQuestion(12, (a, b) => a * b, 6, "x"),
        createQuestion(99, (a, b) => a + b, getRandomNumberUpTo(99), "+"),
        createQuestion(99, (a, b) => a - b, getRandomNumberUpTo(99), "-"),
        createQuestion(12, (a, b) => a * b, 4, "x"),
        createQuestion(12, (a, b) => a * b, 5, "x"),
        createQuestion(12, (a, b) => a * b, 6, "x"),
        createQuestion(99, (a, b) => a + b, getRandomNumberUpTo(99), "+"),
        createQuestion(99, (a, b) => a - b, getRandomNumberUpTo(99), "-"),
        createQuestion(12, (a, b) => a * b, 4, "x"),
        createQuestion(12, (a, b) => a * b, 5, "x"),
        createQuestion(12, (a, b) => a * b, 6, "x"),
        createQuestion(99, (a, b) => a + b, getRandomNumberUpTo(99), "+"),
        createQuestion(99, (a, b) => a - b, getRandomNumberUpTo(99), "-"),
        createQuestion(12, (a, b) => a * b, 4, "x"),
        createQuestion(12, (a, b) => a * b, 5, "x"),
        createQuestion(12, (a, b) => a * b, 6, "x"),
        createQuestion(99, (a, b) => a + b, getRandomNumberUpTo(99), "+"),
        createQuestion(99, (a, b) => a - b, getRandomNumberUpTo(99), "-"),
        createQuestion(12, (a, b) => a * b, 4, "x"),
        createQuestion(12, (a, b) => a * b, 5, "x"),
        createQuestion(12, (a, b) => a * b, 6, "x"),
      ]
    };
  }

  render() {
    const mathQuestion = ({ operator, number, operand, operatorString, onChange, onEnter, invalid }, idx) => {
      console.log(invalid)
      if (invalid === false) {
        return (
          <div className="math-question" key={idx}>
            <h2>Correct!</h2>
          </div>
        );
      }
      
      const isCorrect = enteredValue => {
        return operator(Math.max(number, operand), Math.min(number, operand)) === parseInt(enteredValue);
      }

      return (
        <div className="math-question" key={idx}>
          {
            (invalid === true
             ? (
              <span>
                <h2>Wrong</h2>
              </span>
             )
             : ''
            )
          }
          <h2>{Math.max(number, operand)}</h2>
          <h2>{operatorString} {Math.min(number, operand)}</h2>
          <input
            autoFocus
            type="number"
            onChange={e => onChange(idx)(isCorrect(e.target.value))}
            onKeyUp={e => e.key === "Enter" && onEnter()}
            className={invalid === true ? "invalid" : ""}
          />
        </div>
      );
    };

    if (this.state.correct) {
      return (
        <span>
          <h2>Correct!</h2>
        </span>
      );
    }
    return (
      <div className="app-form">
        <span className="questions">{this.state.questions.map(mathQuestion)}</span>
        <span>
          <button onClick={this.checkCorrect.bind(this)}>Correct?</button>
        </span>
      </div>
    );
  }
}