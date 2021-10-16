import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/header';
import Sidebar from './components/sidebar';
import HomeScreen from './screens/home';
import './app.scss';
import { useState } from 'react';
import Login from './screens/login';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import WatchScreen from './screens/watch';
import SearchScreen from './screens/search';
import SubscriptionScreen from './screens/subscription';
import ChannelScreen from './screens/channel';
import PlayListScreen from './screens/playlist';

const Layout = ({ children }) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const handleToggleSideBar = () => {
    setSideBarOpen((value) => !value);
  };

  return (
    <div className='app'>
      <Header handleToggleSideBar={handleToggleSideBar} />
      <div className='app_container '>
        <Sidebar
          sideBarOpen={sideBarOpen}
          handleToggleSideBar={handleToggleSideBar}
        />
        <Container fluid className='app_main'>
          {children}
        </Container>
      </div>
    </div>
  );
};

const App = () => {
  const { accessToken, loading } = useSelector((state) => state.auth);
  const history = useHistory();
  useEffect(() => {
    if (!loading && !accessToken) {
      history.push('/auth');
    }
  }, [accessToken, loading]);

  return (
    <Switch>
      <Route path='/' exact>
        <Layout>
          <HomeScreen />
        </Layout>
      </Route>
      <Route path='/auth'>
        <Login />
      </Route>
      <Route path='/search/:searchTerm'>
        <Layout>
          <SearchScreen />
        </Layout>
      </Route>
      <Route path='/watch/:id'>
        <Layout>
          <WatchScreen />
        </Layout>
      </Route>
      <Route path='/playlist'>
        <Layout>
          <PlayListScreen />
        </Layout>
      </Route>
      <Route path='/channel/:channelId'>
        <Layout>
          <ChannelScreen />
        </Layout>
      </Route>
      <Route path='/feed/subscriptions'>
        <Layout>
          <SubscriptionScreen />
        </Layout>
      </Route>
      <Route to='*'>
        <Redirect to='/' />
      </Route>
    </Switch>
  );
};

export default App;
