import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTokenThunk } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    user: '',
    isDisabled: true,
  };

  handleDisable = () => {
    const { user } = this.state;
    const validEmail = this.validateEmail();
    if (validEmail && user.length) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.handleDisable);
  }

  handleClick = async () => {
    const { dispatch, history } = this.props;
    const { user, email } = this.state;
    await dispatch(fetchTokenThunk(email, user));
    history.push('/game');
  }

  handleSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  validateEmail() {
    const { email } = this.state;
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  render() {
    const { email, user, isDisabled } = this.state;
    // if (token) {
    //   return <Redirect to="/game" />;
    // }
    return (
      <div>
        <form>
          <label htmlFor="input-name">
            Nome
            <input
              type="text"
              name="user"
              data-testid="input-player-name"
              id="input-name"
              onChange={ this.handleChange }
              value={ user }
            />
          </label>
          <label htmlFor="input-email">
            Email
            <input
              type="email"
              name="email"
              data-testid="input-gravatar-email"
              id="input-email"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <button
            disabled={ isDisabled }
            type="button"
            data-testid="btn-play"
            onClick={ this.handleClick }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleSettings }
          >
            Config
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Login.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.shape({ token: PropTypes.string }),
}.isRequired;

export default connect(mapStateToProps)(Login);
