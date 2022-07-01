import PropTypes, { arrayOf } from 'prop-types';
import React, { Component } from 'react';

class Question extends Component {
  // PERGUNTAS_RANDOM = []; // array que vai ficar com as perguntas embaralhadas

  state = {
    index: 0,
    showColor: false,
    answers: [],
  }

  componentDidMount() {
    const { questions } = this.props;
    console.log(questions, 'props');
    this.randomize();
  }

  randomize = () => {
    const { questions } = this.props;
    // this.PERGUNTAS_RANDOM = [];
    if (questions.length === 0) return;
    const { index } = this.state;
    const question = questions[index];
    const incorrects = question.incorrect_answers
      .map((answer, i) => ({ answer, test: `wrong-answer-${i}`, class: 'incorrects' }));
    const perguntas = [{ answer: question.correct_answer,
      test: 'correct-answer',
      class: 'correct' }, ...incorrects];
    perguntas.sort(() => Math.round(Math.random()) * 2 - 1);
    // this.PERGUNTAS_RANDOM = perguntas;
    this.setState({ answers: perguntas });
    // return this.PERGUNTAS_RANDOM;
  }

  handleClick = () => {
    this.setState({ showColor: true });
  }

  render() {
    const { questions } = this.props;
    const { index, showColor, answers } = this.state;
    // const randomAnswers = this.randomize();
    // if (counter === 0) {
    //   this.setState({ showColor: true });
    // }
    return (
      <div>
        {console.log(questions)}
        <h4 data-testid="question-category">
          {questions[index] && questions[index].category}
        </h4>
        <h4 data-testid="question-text">
          {questions[index] && questions[index].question}
        </h4>
        <div data-testid="answer-options">
          {answers.length && answers.map((quest, i) => (
            (
              <button
                key={ i + 1 }
                type="button"
                data-testid={ quest.test }
                className={ showColor ? quest.class : 'none' }
                onClick={ this.handleClick }
                disabled={ showColor }
              >
                {quest.answer}
              </button>
            )
          ))}
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  questions: PropTypes.shape({ questions: arrayOf(PropTypes.object) }),
}.isRequired;

export default Question;
