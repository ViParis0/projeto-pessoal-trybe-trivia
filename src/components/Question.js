import PropTypes, { arrayOf } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestionsThunk, sendScoreThunk } from '../redux/actions';

class Question extends Component {
  state = {
    index: 0,
    showColor: false,
    answers: [],
    payload: [],
  }

  async componentDidMount() {
    const { token, dispatch } = this.props;
    const result = await dispatch(fetchQuestionsThunk(token));
    this.setState({ payload: result.payload });
    this.randomize();
  }
  // teste

  randomize = () => {
    const { payload: questions } = this.state;
    if (questions.length === 0) return;
    const { index } = this.state;
    const question = questions[index];
    const incorrects = question.incorrect_answers
      .map((answer, i) => ({ answer,
        test: `wrong-answer-${i}`,
        class: 'btn btn-danger' }));
    const perguntas = [{
      answer: question.correct_answer,
      test: 'correct-answer',
      class: 'btn btn-success',
    }, ...incorrects];
    perguntas.sort(() => Math.round(Math.random()) * 2 - 1);
    this.setState({ answers: perguntas });
  }

  handleNext = () => {
    const { index } = this.state;
    const { setIntervalFunc, history } = this.props;
    const questionsLength = 4;
    if (index === questionsLength) {
      history.push('/feedback');
    }
    setIntervalFunc();
    this.setState((prevState) => ({
      index: prevState.index + 1,
      showColor: false,
    }), this.randomize);
  }

  handleClick = (answer) => {
    const { handleTimer, counter, dispatch } = this.props;
    const { index, payload } = this.state;
    this.setState({ showColor: true });
    handleTimer();
    if (answer === 'correct-answer') {
      dispatch(sendScoreThunk(counter, payload[index].difficulty));
    }
  }

  render() {
    const { counter } = this.props;
    const { index, showColor, answers, payload } = this.state;
    if (counter === 0 && !showColor) {
      this.setState({ showColor: true });
    }
    return (
      <div className="question-conteiner">
        <div className="question-category">
          <h4 data-testid="question-category">
            {payload[index] && payload[index].category}
          </h4>
        </div>
        <div className="question-text">
          <h4 data-testid="question-text">
            {payload[index] && payload[index].question}
          </h4>
        </div>
        <div data-testid="answer-options" className="answer-questions">
          {answers.length && answers.map((quest, i) => (
            (
              <button
                key={ i + 1 }
                type="button"
                data-testid={ quest.test }
                className={ showColor ? quest.class : 'btn btn-primary' }
                onClick={ () => this.handleClick(quest.test) }
                disabled={ showColor }
              >
                {quest.answer}
              </button>
            )
          ))}
          {showColor
            && (
              <button
                className="btn btn-light"
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
