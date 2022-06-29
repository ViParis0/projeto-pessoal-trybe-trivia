import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestionsThunk } from '../redux/actions';

class Game extends Component {
  componentDidMount() {
    const { dispatch, token } = this.props;
    dispatch(fetchQuestionsThunk(token));
  }

  render() {
    return (
      <Header />
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
});

Game.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.shape({ token: PropTypes.string }),
}.isRequired;

export default connect(mapStateToProps)(Game);
