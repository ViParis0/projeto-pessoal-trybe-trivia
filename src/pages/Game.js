import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
// import { fetchQuestionsThunk } from '../redux/actions';
import '../App.css';
// import { fetchQuestionsThunk } from '../redux/actions';
import Question from '../components/Question';

class Game extends Component {
  state = {
    countDown: 30,
    isClicked: false,
  }

  async componentDidMount() {
    // const { dispatch, token } = this.props;
    this.setIntervalFunc();
  }

  componentWillUnmount() {
    clearInterval(this.setIntervalId);
  }

  setIntervalFunc = () => {
    const intervalMs = 1000;
    this.setIntervalId = setInterval(() => this.setState((prevState) => ({
      countDown: prevState.countDown - 1 }), () => {
      const { countDown, isClicked } = this.state;
      if (isClicked) {
        clearInterval(this.setIntervalId);
      }
      if (countDown === 0) {
        clearInterval(this.setIntervalId);
      }
    }), intervalMs);
    this.setState({ isClicked: false, countDown: 30 });
  }

  handleTimer = () => this.setState({ isClicked: true })

  render() {
    const { history, token } = this.props;
    const { countDown } = this.state;
    if (token === 'INVALID_TOKEN') {
      localStorage.removeItem('token');
      history.push('/');
    }
    return (
      <div>
        <Header />
        <div className="game-conteiner">
          <p
            data-testid="countdown-timer"
            id="countdown"
          >
            {`Question timer: ${countDown}`}
          </p>
          <Question
            counter={ countDown }
            handleTimer={ this.handleTimer }
            setIntervalFunc={ this.setIntervalFunc }
            history={ history }
          />
        </div>
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
