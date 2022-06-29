import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestionsThunk } from '../redux/actions';

class Game extends Component {
  state = {
    // index: 0,
  }

  async componentDidMount() {
    const { dispatch, token } = this.props;
    await dispatch(fetchQuestionsThunk(token));
  }

  render() {
    const { history, responseCode, questions } = this.props;
    // const { index } = this.state;
    if (responseCode !== 0) {
      localStorage.removeItem('token');
      history.push('/');
    }
    return (
      <div>
        <Header />
        <h4>{ questions[0] && questions[0].question }</h4>
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
