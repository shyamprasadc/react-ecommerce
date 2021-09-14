import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCart, updateCartCount } from "../redux/actions/cartActions";
import {
  setWishlist,
  updateWishlistCount,
} from "../redux/actions/wishlistActions";
import { Form, Input, Button, Checkbox, Card, Row, Col, message } from "antd";

function Login(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const login = async (data) => {
    message.loading("Logging in...", 0.5);
    const body = new URLSearchParams();
    body.append("username", data.username);
    body.append("password", data.password);
    const config = {
      method: "POST",
      url: "http://localhost:8080/api/auth/login",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: body,
    };
    const response = await axios(config).catch((err) => {
      message.error("Username or Password is wrong", 1);
      console.log("Err: ", err);
      history.push("/login");
    });
    if (response) {
      message.success("Login success", 1);
      localStorage.setItem("accessToken", response.data.accessToken);
      fetchCart();
      fetchWishlist();
      history.push(`/`);
    }
  };

  const fetchCart = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      method: "GET",
      url: "http://localhost:8080/api/cart",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios(config).catch((err) => {
      console.log("Err: ", err);
      history.push("/login");
    });
    if (response) {
      dispatch(setCart(response.data));
      dispatch(updateCartCount(response.data.length));
    }
  };

  const fetchWishlist = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      method: "GET",
      url: "http://localhost:8080/api/wishlist",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios(config).catch((err) => {
      console.log("Err: ", err);
      history.push("/login");
    });
    if (response) {
      dispatch(setWishlist(response.data));
      dispatch(updateWishlistCount(response.data.length));
    }
  };

  const onFinish = (values) => {
    login(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleRegisterClick = () => {
    history.push(`/signup`);
  };

  return (
    <React.Fragment>
      <Row>
        <Col span={4}></Col>
        <Col span={16}>
          <Card title="Login">
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                Or <a onClick={() => handleRegisterClick()}>Register now!</a>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={4}></Col>
      </Row>
    </React.Fragment>
  );
}

export default Login;
