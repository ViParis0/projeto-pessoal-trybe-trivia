import PropTypes, { arrayOf } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchQuestionsThunk } from '../redux/actions';

class Question extends Component {
  state = {
    index: 0,
    showColor: false,
    answers: [],
    payload: [],
  }

  async componentDidMount() {
    const { token, dispatch } = this.props;
    this.result = await dispatch(fetchQuestionsThunk(token));
    this.setState({ payload: this.result.payload });
    this.randomize();
  }

  randomize = () => {
    const { payload: questions } = this.result;
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

  redirect = () => <Redirect to="/feedback" />

  handleNext = () => {
    const { index } = this.state;
    const { setIntervalFunc } = this.props;
    const questionsLength = 5;
    if (index === questionsLength) {
      this.redirect();
    }
    setIntervalFunc();
    this.setState((prevState) => ({
      index: prevState.index + 1,
      showColor: false,
    }), console.log(this.props));
    this.randomize();
  }

  handleClick = () => {
    const { handleTimer } = this.props;
    this.setState({ showColor: true });
    handleTimer();
  }

  render() {
    const { counter } = this.props;
    const { index, showColor, answers, payload } = this.state;
    if (counter === 0 && !showColor) {
      this.setState({ showColor: true });
    }
    return (
      <div>
        <h4 data-testid="question-category">
          {payload[index] && payload[index].category}
        </h4>
        <h4 data-testid="question-text">
          {payload[index] && payload[index].question}
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
          { showColor
           && (
             <button
               onClick={ this.handleNext }
               type="button"
               data-testid="btn-next"
             >
               Next
             </button>
           )}

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
});

Question.propTypes = {
  questions: PropTypes.shape({ questions: arrayOf(PropTypes.object) }),
}.isRequired;

export default connect(mapStateToProps)(Question);
