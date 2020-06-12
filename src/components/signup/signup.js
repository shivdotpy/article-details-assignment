import React, { Component } from 'react';
import { signUp } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import './signup.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      displayError: {
        emailError: '',
        passwordError: '',
        usernameError: ''
      },
      emailValid: false,
      passwordValid: false,
      usernameValid: false
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
   * validateUserName: should validate Name
   * {string} name which you entered to validate
   * should return boolean value after validating email
   */
  validateUserName = (name) => {
    const nameRgx = /^[a-zA-Z ]*$/;
    return name.match(nameRgx);
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
            emailError: "Please Enter Valid Email Addres which should include '@' and '.'"
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
    }
    else if (fieldName === "username") {
      if (!this.validateUserName(value)) {
        this.setState({
          displayError: {
            usernameError: "It contains alphabet characters only"
          },
          usernameValid: false
        })
      } else {
        this.setState({
          displayError: {
            username: ""
          },
          usernameValid: true
        })
      }
    }
    if (fieldName === "password") {
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
   * should call Api method to register user
   * {event} event
   */
  handleSubmit = (event) => {
    event.preventDefault();
    const { signUp } = this.props;
    const userData = {
      user: {
        "username": this.state.username,
        "email": this.state.email,
        "password": this.state.password
      }
    };

    signUp(userData).then(response => {
      this.props.history.push('/signin');
      this.setState({
        user: {
          username: '',
          email: '',
          password: ''
        }
      });
    }).catch(errors => {
      console.log(errors);
    });
  }

  render() {
    const { email, password, username } = this.state;
    return (
      <div className="container-signup">
        <form>
          <div className="title-signup">Sign Up</div>
          <p className="linksignup">
            <Link to="/signin">
              Have an account?
            </Link>
          </p>
          <div className="form-container-signup">
            <div className="form-group">
              <input type="text" className="form-control-signup" name="username" value={username} onChange={event => this.handleChange(event, 'username')} placeholder="User Name" />
              <div className="errorMsg">{this.state.displayError.usernameError}</div>
            </div>
            <div className='form-group'>
              <input type="email" className="form-control-signup" name="email" value={email} onChange={event => this.handleChange(event, 'email')} placeholder="Email" />
              <div className="errorMsg">{this.state.displayError.emailError}</div>
            </div>

            <div className='form-group'>
              <input type="password" className="form-control-signup" name="password" value={password} onChange={event => this.handleChange(event, 'password')} placeholder="Password" />
              <div className="errorMsg">{this.state.displayError.passwordError}</div>
            </div>

            <button className="submit-btn-signup" disabled={!(this.state.usernameValid && this.state.emailValid && this.state.passwordValid)} onClick={this.handleSubmit}>Register</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    registeredUser: state.AuthReducer.registeredUser,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  ...bindActionCreators({
    signUp,
  },
    dispatch),
});

//connect : This function connects a React component to a Redux store.
export default connect(mapStateToProps,
  mapDispatchToProps)(SignUp);