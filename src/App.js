import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import SignIn from './components/singin/signin';
import Home from './components/home/home';
import SignUp from './components/signup/signup';
import addPost from './components/article/addPost';
import Header from './components/header/header';
import Details from './components/article/articleDetails';
import userDetails from './components/article/userDetails/userDetails';
import { configureStore } from './store';
import './App.css';

const store = configureStore();
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header>
        </Header>
        {/* <Switch> */}
        <Route exact path='/' component={Home} />
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/article/:slug?' component={addPost} />
        <Route path='/details/:slug' component={Details} />
        <Route path='/username/:author' component={userDetails} />
        {/* </Switch> */}
      </Router>
    </Provider>
  );
}

export default App;