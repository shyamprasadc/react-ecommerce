import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Button, Badge, message } from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import logo from "../assets/images/hon_logo_1.png";
import { removeCart } from "../redux/actions/cartActions";
import { removeWishlist } from "../redux/actions/wishlistActions";
import {
  removeUserAddress,
  removeUserDetails,
} from "../redux/actions/userActions";

function NavbarComp() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [current, setCurrent] = useState("2");

  const cartCount = useSelector((state) => state.cart.count);
  const wishlistCount = useSelector((state) => state.wishlist.count);

  const handleMenuClick = (e) => {
    setCurrent(e.key);
    if (e.key === "1") return history.push("/");
    if (e.key === "9") return handleWishlistClick();
    if (e.key === "10") return handleCartClick();
    if (e.key === "11") return handleProfileClick();
    if (e.key === "12") return handleLogoutClick();
    history.push("/all");
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
    dispatch(removeUserDetails());
    dispatch(removeUserAddress());
    dispatch(removeCart());
    dispatch(removeWishlist());
    history.push(`/`);
  };

  return (
    <React.Fragment>
      <Menu
        onClick={handleMenuClick}
        selectedKeys={[current]}
        mode="horizontal"
      >
        <Menu.Item key="1">
          <img alt="logo" src={logo} style={{ maxWidth: 80 }} />
        </Menu.Item>
        <Menu.Item key="2">ALL</Menu.Item>
        <Menu.Item key="3">DESKS</Menu.Item>
        <Menu.Item key="4">CHAIRS</Menu.Item>
        <Menu.Item key="5">STORAGE & ACCESSORIES</Menu.Item>
        <Menu.Item key="6">SHOP BY SPACE</Menu.Item>
        <Menu.Item key="7">DESIGN YOUR SPACE</Menu.Item>
        <Menu.Item key="8">DESIGN YOUR HOME OFFICE</Menu.Item>
        <Menu.Item key="9">
          <Badge size="small" count={wishlistCount}>
            <Button shape="circle" icon={<HeartOutlined />} />
          </Badge>
        </Menu.Item>
        <Menu.Item key="10">
          <Badge size="small" count={cartCount}>
            <Button shape="circle" icon={<ShoppingCartOutlined />} />
          </Badge>
        </Menu.Item>
        <Menu.Item key="11">
          <Button shape="circle" icon={<UserOutlined />} />
        </Menu.Item>
        <Menu.Item key="12">
          <Button shape="circle" icon={<LogoutOutlined />} />
        </Menu.Item>
      </Menu>
    </React.Fragment>
  );
}

export default NavbarComp;
