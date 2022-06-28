import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUserData } from '../actions';

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

    handleClick = () => {
      const { dispatch } = this.props;
      dispatch(addUserData());
    }

    validateEmail() {
      const { email } = this.state;
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }

    render() {
      const { email, user, isDisabled } = this.state;
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
              type="submit"
              data-testid="btn-play"
            >
              Jogar

            </button>
          </form>
        </div>
      );
    }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
