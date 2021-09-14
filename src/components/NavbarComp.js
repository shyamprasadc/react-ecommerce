import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, Row, Col, Button, Space, Badge, message } from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import logo from "../assets/images/hon_logo_1.png";

function NavbarComp() {
  const history = useHistory();
  const [current, setCurrent] = useState("1");
  const cartCount = useSelector((state) => state.cart.count);
  const wishlistCount = useSelector((state) => state.wishlist.count);

  const handleMenuClick = (e) => {
    setCurrent(e.key);
    history.push("/");
  };

  const handleWishlistClick = () => {
    history.push(`/wishlist`);
  };

  const handleProfileClick = () => {
    history.push(`/login`);
  };

  const handleCartClick = () => {
    history.push(`/cart`);
  };

  const handleLogoutClick = () => {
    message
      .loading("Logging out..", 0.5)
      .then(() => message.success("Logout success", 1));
    localStorage.removeItem("accessToken");
    history.push(`/`);
  };

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
            onClick={handleMenuClick}
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
            <Badge size="small" count={wishlistCount}>
              <Button
                shape="circle"
                icon={<HeartOutlined />}
                onClick={() => handleWishlistClick()}
              />
            </Badge>
            <Badge size="small" count={cartCount}>
              <Button
                shape="circle"
                icon={<ShoppingCartOutlined />}
                onClick={() => handleCartClick()}
              />
            </Badge>
            <Button
              shape="circle"
              icon={<UserOutlined />}
              onClick={() => handleProfileClick()}
            />
            <Button
              shape="circle"
              icon={<LogoutOutlined />}
              onClick={() => handleLogoutClick()}
            />
          </Space>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default NavbarComp;
