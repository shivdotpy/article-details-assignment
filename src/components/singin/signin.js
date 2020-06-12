import React, { Component } from 'react';
import './signin.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { login } from './../../store/actions/authActions';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      displayError: {
        emailError: '',
        passwordError: ''
      },
      emailValid: false,
      passwordValid: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * checkEmailValidation: should validate Email
   * {string} enteredEmail email which you entered to validate
   * should return boolean value after validating email
   */
  checkEmailValidation = (enteredEmail) => {
    const emailRgx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRgx.test(String(enteredEmail).toLowerCase());
  }

  /**
   * handleChange: should work on changes applied
   * {string} fieldName fields name which you entered
   * {event} event
   */
  handleChange = (event, fieldName) => {
    const { value } = event.target;
    this.setState({ [fieldName]: value });
    if (fieldName === "email") {
      if (!this.checkEmailValidation(value)) {
        this.setState({
          displayError: {
            emailError: "Please Enter Valid Email Addres which should include '@' and '.'."
          },
          emailValid: false
        })
      } else {
        this.setState({
          displayError: {
            emailError: ""
          },
          emailValid: true
        })
      }
    } if (fieldName === "password") {
      if (value.length < 8) {
        this.setState({
          displayError: {
            passwordError: "Password length should be minimum 8"
          },
          passwordValid: false
        })
      } else {
        this.setState({
          displayError: {
            passwordError: ""
          },
          passwordValid: true
        })
      }
    }
  }

  /**
   * handleSubmit: should handle submit button click functionality
   * should call Api method to login user
   * {event} event
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { authLogin } = this.props;
    if (email && password) {
      const user = {
        email: email,
        password: password
      };
      authLogin({ user }).then(response => {
        const AuthToken = response.user.token;
        const UserName = response.user.username;
        localStorage.setItem('AuthToken', AuthToken);
        localStorage.setItem('UserName', UserName);
        this.setState({
          email: '',
          password: ''
        });
        this.props.history.push('/');
      }).catch(error => {
        console.log(error);
      });
    }
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="container">
        <form>
          <div className="title-signin">Sign In</div>
          <p className="linksignin">
            <Link to="/signup">
              Need an account?
              </Link>
          </p>
          <div className="form-container">
            <div className="form-group">
              <input type="email" className="form-control" name="email" value={email} onChange={event => this.handleChange(event, 'email')} placeholder="Email" />
              <div className="errorMsg">{this.state.displayError.emailError}</div>
            </div>

            <div className='form-group'>
              <input type="password" className="form-control" name="password" value={password} onChange={event => this.handleChange(event, 'password')} placeholder="Password" />
              <div className="errorMsg">{this.state.displayError.passwordError}</div>
            </div>

            <button className="submit-btn" disabled={!(this.state.emailValid && this.state.passwordValid)} onClick={this.handleSubmit}>Login</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.AuthReducer.loggedInUser,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  ...bindActionCreators({
    authLogin: login,
  },
    dispatch),
});

//connect : This function connects a React component to a Redux store.
//withRouter : It connects component to the router.
export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(SignIn));