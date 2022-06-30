import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  state = {
    avatar: '',
  }

  async componentDidMount() {
    const { email } = this.props;
    const HASH = md5(email).toString();
    this.setState({ avatar: HASH });
  }

  render() {
    const { user } = this.props;
    const { avatar } = this.state;
    return (
      <header>
        <span>Player: </span>
        <img
          src={ `https://www.gravatar.com/avatar/${avatar}` }
          alt="profile"
          data-testid="header-profile-picture"
        />
        <h1 data-testid="header-player-name">{user}</h1>
        <span>Score: </span>
        <span id="score" data-testid="header-score">0</span>
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  user: state.user.user,
  email: state.user.email,
});

export default connect(mapStateToProps, null)(Header);
