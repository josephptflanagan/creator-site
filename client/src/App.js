import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import {ApolloClient, InMemoryCache} from 'apollo-boost';
import { createUploadLink } from "apollo-upload-client";
import { Provider } from 'react-redux';

// import Components

import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home/Home';
import UploadDash from './pages/UploadDash/UploadDash';
import UserProf from './pages/UserProf/UserProf';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import About from './pages/About/About';
import store from './utils/store';
// console.log("Redux store in App.js: ", store.getState());

const token = localStorage.getItem('id_token');


const client = new ApolloClient({
  link: createUploadLink({
    // uri: 'http://localhost:3001/graphql',
    uri: '/graphql',
    headers: {
      authorization : token ? `Bearer ${token}` : ''
    }
  }),
  cache: new InMemoryCache()
})

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<div>
					<Provider store={store}>
						<Navigation />
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/video/:id" component={UploadDash} />
							<Route exact path="/profile/:id" component={UserProf} />
							<Route exact path="/signup" component={Signup} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/about" component={About} />
						</Switch>
					</Provider>
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;