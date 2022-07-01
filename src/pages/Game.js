import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestionsThunk } from '../redux/actions';
import '../App.css';

class Game extends Component {
  state = {
    index: 0,
    answers: [],
    shouldRender: false,
    showColor: false,
    countDown: 30,

  }

  PerguntasRandom = []; // array que vai ficar com as perguntas embaralhadas

  async componentDidMount() {
    const { dispatch, token } = this.props;
    const intervalMs = 1000;
    await dispatch(fetchQuestionsThunk(token));
    this.setState({ shouldRender: true });
    setInterval(this.handleCountdown(), intervalMs);
  }

  randomOrder = (questions) => {
    if (questions.length === 0) return;
    const { index } = this.state;
    const question = questions[index];
    const incorrects = question.incorrect_answers
      .map((answer, i) => ({ answer, test: `wrong-answer-${i}`, class: 'incorrects' }));
    const perguntas = [{ answer: question.correct_answer,
      test: 'correct-answer',
      class: 'correct' }, ...incorrects];

    const PerguntasNaoRandom = [...perguntas]; // novo array com as pergunta aano ebaalhadasrm
    for (let i = PerguntasNaoRandom.length - 1; i >= 0; i -= 1) {
      const randomNumber = (Math.floor(Math.random() * PerguntasNaoRandom.length));
      this.PerguntasRandom.push(PerguntasNaoRandom[randomNumber]);
      PerguntasNaoRandom.splice(randomNumber, 1);
    }
    this.setState({ answers: this.PerguntasRandom, shouldRender: false });
  }

  handleClick = () => {
    this.setState({ showColor: true });
  }

  handleCountdown = () => {
    this.setState((prevState) => ({ countDown: prevState.countDown - 1 }));
  }

  render() {
    const { history, token, questions } = this.props;
    const { index, answers, shouldRender, showColor, countDown } = this.state;
    if (token === 'INVALID_TOKEN') {
      localStorage.removeItem('token');
      history.push('/');
    }
    if (shouldRender) {
      this.randomOrder(questions);
    }
    return (
      <div>
        <Header />
        <p>{countDown}</p>
        <h4 data-testid="question-category">
          {questions[index] && questions[index].category}
        </h4>
        <h4 data-testid="question-text">
          {questions[index] && questions[index].question}
        </h4>
        <div data-testid="answer-options">
          {answers && answers.map((quest, i) => (
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

const mapStateToProps = (state) => ({
  token: state.user.token,
  responseCode: state.user.responseCode,
  questions: state.game.questions,
});

Game.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.shape({ token: PropTypes.string, responseCode: PropTypes.string }),
}.isRequired;

export default connect(mapStateToProps)(Game);
