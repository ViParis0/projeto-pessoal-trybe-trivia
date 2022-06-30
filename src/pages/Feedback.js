import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const numeroDeAcertos = 3;
    const { assertions, score, history } = this.props;
    return (
      <header>

        <section>
          <Header />
        </section>

        <section>
          {
            assertions <= numeroDeAcertos ? (
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
            onClick={ () => history.push('/') }
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </section>

        <section>
          <button
            type="button"
            onClick={ () => history.push('/Ranking') }
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
  assertions: state.user.assertions,
  score: state.user.score,
});

export default connect(mapStateToProps)(Feedback);
