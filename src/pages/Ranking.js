import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    return (
      <header>

        <section>
          <button
            type="button"
            onClick={ () => history.push('/') }
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

export default connect(mapStateToProps, null)(Ranking);
