import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { playAgain } from '../redux/actions';

class Feedback extends Component {
  rankingPlayers = async () => { // trabalhando aqui
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
    dispatch(playAgain()); // trabalhando aqui
    history.push('/');
  }

  render() {
    const minAcertos = 3;
    const { assertions, score } = this.props;
    return (
      <header>
        <section>
          <Header />
        </section>
        <section>
          {
            assertions < minAcertos ? (
              <h1 data-testid="feedback-text">Could be better...</h1>
            ) : (
              <h1 data-testid="feedback-text">Well Done!</h1>
            )
          }
        </section>

        <section>
          <h1 data-testid="feedback-total-score">
            { score }
          </h1>
          <p data-testid="feedback-total-question">
            { assertions }
          </p>
        </section>

        <section>
          <button
            type="button"
            onClick={ this.playAgain } // trabalhando aqui
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </section>

        <section>
          <button
            type="button"
            onClick={ this.rankingPlayers }
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </section>

      </header>
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
  players: state.player, // trabalhando aqui
  user: state.user, // trabalhando aqui
});

export default connect(mapStateToProps)(Feedback);
