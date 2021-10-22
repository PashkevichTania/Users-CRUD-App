import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Home from "pages/home/home";
import Auth from "pages/Auth/Auth";
import {getCookie} from "cookieUtils/cookieUtils";
import {MainWrapper} from "components/StyledComponents/styled";
import Header from "components/Header/Header";
import React from "react";


function App() {

  const loggedIn = getCookie('X-AUTH-USER-CRUD')

  return (
    <div className="App">
      <MainWrapper>
        <Header/>
        <Router>
          <Switch>
            <Route path="/" exact>
              {loggedIn ? <Redirect to="/home"/> : <Redirect to="/auth"/>}
            </Route>
            <Route path="/home">
              <Home/>
            </Route>
            <Route path="/auth">
              <Auth/>
            </Route>
          </Switch>
        </Router>
      </MainWrapper>
    </div>
  );
}

export default App;
