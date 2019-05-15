import * as React from 'react';
import './App.css';
import Router from './routes';
import Layout from 'components/Layout/Layout';

class App extends React.Component {
  state = {
    isLoggedIn: true,
  };
  render() {
    const { isLoggedIn } = this.state;
    return (
      <Layout>
        <Router isLoggedIn={isLoggedIn} />
      </Layout>
    );
  }
}

export default App;
