import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './index.css';
import App from './components/App';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import withSession from './components/withSession';
import Navbar from './components/Navbar';
import Search from './components/Recipe/Search';
import AddRecipe from './components/Recipe/AddRecipe';
import Profile from './components/Profile/Profile';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import RecipePage from './components/Recipe/RecipePage';
var StatsD = require('hot-shots');
var dogstatsd = new StatsD();

// Increment a counter.
dogstatsd.increment('page.views')
const client = new ApolloClient({
    uri: "https://peaceful-crag-22307.herokuapp.com/graphql",
    fetchOptions: {
      credentials: 'include'
    },

    request: operation => {
      const token = localStorage.getItem('token');
      operation.setContext({
        headers: {
          authorization: token
        }
      })
    },

    onError: ({ networkError }) => {
      if(networkError){
        console.log('Network Error', networkError);
     

      }
    }
});

const Root = ({refetch, session}) => (
  <Router>
    <Fragment>
    <Navbar session={session}/>
    <Switch>
      <Route path='/' exact component = {App} />
      <Route path='/search' component = {Search} />
      <Route path='/recipe/add' render = {()=><AddRecipe session={session}/>} />
      <Route path='/recipes/:_id' component = {RecipePage} />
      <Route path='/profile' component = {Profile} />

      <Route path='/signin' exact render={() => <Signin refetch={refetch} />} />
      <Route path='/signup' exact render={() => <Signup refetch={refetch} />} />
      <Redirect to='/' />


    </Switch>
    </Fragment>
  </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
    <ApolloProvider client={client}>
      <RootWithSession />
    </ApolloProvider>,
    document.getElementById('root'),
  );