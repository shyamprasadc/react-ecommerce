import React, { Component } from "react";
import { Menu, Row, Col, Button, Space } from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import logo from "../assets/images/hon_logo_1.png";

class NavbarComp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: "1",
    };

    this.handleMenuClick.bind(this);
  }

  handleMenuClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  handleWishlistClick = () => {
    this.props.history.push(`wishlist`);
  };

  render() {
    const { current } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Col span={3}>
            <img
              alt="logo"
              src={logo}
              style={{ maxHeight: 30, marginLeft: 10 }}
            />
          </Col>
          <Col span={18}>
            <Menu
              onClick={this.handleMenuClick}
              selectedKeys={[current]}
              mode="horizontal"
            >
              <Menu.Item key="1">ALL</Menu.Item>
              <Menu.Item key="2">DESKS</Menu.Item>
              <Menu.Item key="3">CHAIRS</Menu.Item>
              <Menu.Item key="4">STORAGE & ACCESSORIES</Menu.Item>
              <Menu.Item key="5">SHOP BY SPACE</Menu.Item>
              <Menu.Item key="6">DESIGN YOUR HOME OFFICE</Menu.Item>
            </Menu>
          </Col>
          <Col span={3}>
            <Space>
              <Button
                shape="circle"
                icon={<HeartOutlined />}
                onClick={() => this.handleWishlistClick()}
              />
              <Button shape="circle" icon={<UserOutlined />} />
              <Button shape="circle" icon={<ShoppingCartOutlined />} />
            </Space>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default NavbarComp;
