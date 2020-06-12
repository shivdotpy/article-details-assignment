import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../header/header.css';
class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      username: ''
    }
  }

  componentDidMount() {
    this.setState({ token: localStorage.getItem('AuthToken') })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ token: localStorage.getItem('AuthToken') })
  }

  /**
   * logoutBtnClick should remove items from localstorage and should route to login page
   */
  logoutBtnClick = () => {
    const token = localStorage.removeItem('AuthToken');
    const username = localStorage.removeItem('UserName');
    this.setState({ token: '', username: '' });
    this.props.history.push('/signin');
  }

  render() {
    const { token } = this.state;
    return (
      <div className="headerContainer">
        <Link to="/" className="headerTitleWithLink">Articles</Link>
        <div>
          <Link to="/" className="linkClass">Home</Link>
          {token ? (<>
            <Link to="/article" className="linkClass">New Post</Link>
            <Link to="/signin" className="linkClass" onClick={this.logoutBtnClick}>Logout</Link>
          </>
          ) : (
              <>
                <Link to="/signin" className="linkClass">Sign in</Link>
                <Link to="/signup" className="linkClass">Sign up</Link>
              </>
            )}

        </div>
      </div>
    );
  }
}

export default withRouter(Header);