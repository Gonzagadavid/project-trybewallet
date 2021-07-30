import { string } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Wallet extends Component {
  render() {
    const { emailField } = this.props;
    return (
      <div>
        <header>
          <span data-testid="email-field">{emailField}</span>
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  emailField: user.email,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  emailField: string.isRequired,
};
