import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';
import { playAgain } from '../redux/actions';

class Ranking extends Component {
  // async componentDidMount() {
  //   const { email } = this.props;
  //   const HASH = md5(email).toString();
  //   this.setState({ avatar: HASH });
  // }

  //   rankingList.sort(function(a, b){return a.score - b.score}); // organizar o array
  // displayCars();

  playAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(playAgain()); // trabalhando aqui
    history.push('/');
  }

  render() {
    const rankingList = JSON.parse(localStorage.getItem('rankingList'));

    console.log(rankingList);
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
