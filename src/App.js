import React from "react";
import logo from "./logo.svg";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Product from "./components/Product";
import NotFound from "./components/NotFound";

import NavbarComp from "./components/NavbarComp";

function App() {
  return (
    <React.Fragment>
      <Router>
        <NavbarComp />
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/product" component={Product} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    </React.Fragment>
  );
}

export default App;
