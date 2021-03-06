import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Layout } from "antd";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import NotFound from "./components/NotFound";
import NavbarComp from "./components/NavbarComp";
import FooterComp from "./components/FooterComp";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Address from "./components/Address";
import Orders from "./components/Orders";
const { Header, Footer, Content } = Layout;

function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Router>
          <Layout>
            <Header style={{ background: "white", padding: 0 }}>
              <NavbarComp />
            </Header>
            <Content style={{ background: "white", padding: "2%" }}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/all" component={Products} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/products/:productId" component={ProductDetails} />
                <Route path="/wishlist" component={Wishlist} />
                <Route path="/cart" component={Cart} />
                <Route path="/orders" component={Orders} />
                <Route exact path="/address" component={Address} />
                <Route exact path="/address/:addressId" component={Address} />
                <Route component={NotFound} />
              </Switch>
            </Content>
            <Footer style={{ background: "white", padding: 0 }}>
              <FooterComp />
            </Footer>
          </Layout>
        </Router>
      </Provider>
    </React.Fragment>
  );
}

export default App;
