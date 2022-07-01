import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
// import { fetchQuestionsThunk } from '../redux/actions';
import '../App.css';
import { fetchQuestionsThunk } from '../redux/actions';
import Question from '../components/Question';

class Game extends Component {
  state = {
    countDown: 30,
    countZero: false,
  }

  async componentDidMount() {
    const { dispatch, token } = this.props;
    await dispatch(fetchQuestionsThunk(token));
    this.setIntervalFunc();
  }

  setIntervalFunc = () => {
    const intervalMs = 1000;
    const setIntervalId = setInterval(() => this.setState((prevState) => ({
      countDown: prevState.countDown - 1 }), () => {
      const { countDown } = this.state;
      if (countDown === 0) {
        console.log('entrou');
        this.setState({ countZero: true });
        clearInterval(setIntervalId);
      }
    }), intervalMs);
  }

  render() {
    const { history, token, questions } = this.props;
    const { countDown, countZero } = this.state;
    if (token === 'INVALID_TOKEN') {
      localStorage.removeItem('token');
      history.push('/');
    }
    return (
      <div>
        <Header />
        <p>{countDown}</p>
        <Question counter={ countZero } questions={ questions } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  responseCode: state.user.responseCode,
  questions: state.player.questions,
});

Game.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.shape({ token: PropTypes.string, responseCode: PropTypes.string }),
}.isRequired;

export default connect(mapStateToProps)(Game);
