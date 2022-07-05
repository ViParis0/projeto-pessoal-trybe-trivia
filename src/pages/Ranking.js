import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import { playAgain } from '../redux/actions';

class Ranking extends Component {
  playAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(playAgain());
    history.push('/');
  }

  render() {
    if (!localStorage.getItem('rankingList')) {
      const playerRanking = [{
        score: 200,
        name: 'Usuario Teste',
        email: 'tester@email.com',
      }];
      localStorage.setItem('rankingList', JSON.stringify(playerRanking));
    }
    const rankingList = JSON.parse(localStorage.getItem('rankingList'));
    return (
      <header>
        <h1 data-testid="ranking-title">Ranking</h1>
        {rankingList.map((scorePlayer, index) => (
          <div key={ index }>
            <h3 data-testid={ `player-score-${index}` } key={ index }>
              { scorePlayer.score }
            </h3>
            <h3 data-testid={ `player-name-${index}` } key={ index }>
              { scorePlayer.name }
            </h3>
            <img
              src={ `https://www.gravatar.com/avatar/${MD5(scorePlayer.email).toString()}` }
              alt="profile"
              data-testid="header-profile-picture"
            />
          </div>
        ))}

        <section>
          <button
            type="button"
            onClick={ this.playAgain }
            data-testid="btn-go-home"
          >
            Play Again
          </button>
        </section>

      </header>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.object,
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.user.assertions,
  score: state.user.score,
});

export default connect(mapStateToProps)(Ranking);
