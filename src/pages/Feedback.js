import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { playAgain } from '../redux/actions';

class Feedback extends Component {
  rankingPlayers = async () => {
    const { history, players, user } = this.props;
    const playerRanking = {
      score: players.score,
      name: user.user,
      email: user.email,
    };
    if (!localStorage.getItem('rankingList')) {
      localStorage.setItem('rankingList', JSON.stringify([]));
    }
    const oldRanking = JSON.parse(localStorage.getItem('rankingList'));
    oldRanking.push(playerRanking);
    oldRanking.sort((a, b) => b.score - a.score);
    localStorage.setItem('rankingList', JSON.stringify(oldRanking));
    history.push('/Ranking');
  }

  playAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(playAgain());
    history.push('/');
  }

  render() {
    const minAcertos = 3;
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <div className="game-conteiner">
          {assertions < minAcertos ? (
            <h1
              data-testid="feedback-text"
              className="question-category"
            >
              Could be better...

            </h1>
          ) : (
            <h1 data-testid="feedback-text" className="question-category">Well Done!</h1>
          )}

          <section>
            <h1 data-testid="feedback-total-score" className="question-category">
              Score:
              {' '}
              { score }
            </h1>
            <p data-testid="feedback-total-question" className="question-category">
              Assertions:
              {' '}
              { assertions }
            </p>
          </section>

          <section>
            <button
              className="btn btn-light"
              type="button"
              onClick={ this.playAgain }
              data-testid="btn-play-again"
            >
              Play Again
            </button>
          </section>

          <section>
            <button
              className="btn btn-light"
              type="button"
              onClick={ this.rankingPlayers }
              data-testid="btn-ranking"
            >
              Ranking
            </button>
          </section>
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  players: state.player,
  user: state.user,
});

export default connect(mapStateToProps)(Feedback);
