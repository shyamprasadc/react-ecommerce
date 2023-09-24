import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Button, Badge, Popover, message } from "antd";
import {
  ShoppingOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import logo from "../assets/images/hon_logo_1.png";
import { removeCart } from "../redux/actions/cartActions";
import { removeOrders } from "../redux/actions/ordersActions";
import { removeWishlist } from "../redux/actions/wishlistActions";
import {
  removeUserAddress,
  removeUserDetails,
} from "../redux/actions/userActions";
import MiniCart from "./MiniCart";

function NavbarComp() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [current, setCurrent] = useState("2");

  const cartCount = useSelector((state) => state.cart.count);
  const wishlistCount = useSelector((state) => state.wishlist.count);

  const handleMenuClick = (e) => {
    setCurrent(e.key);
    console.log(e.key);
    if (e.key === "1") return history.push("/");
    if (e.key === "10") return handleWishlistClick();
    if (e.key === "11") return;
    if (e.key === "12") return handleOrdersClick();
    if (e.key === "13") return handleProfileClick();
    if (e.key === "14") return handleLogoutClick();
    history.push("/all");
  };

  const handleWishlistClick = () => {
    history.push(`/wishlist`);
  };

  const handleProfileClick = () => {
    history.push(`/login`);
  };

  const handleOrdersClick = () => {
    history.push(`/orders`);
  };

  const handleLogoutClick = () => {
    message
      .loading("Logging out..", 0.5)
      .then(() => message.success("Logout success", 1));
    localStorage.removeItem("accessToken");
    dispatch(removeUserDetails());
    dispatch(removeUserAddress());
    dispatch(removeCart());
    dispatch(removeOrders());
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
        <Menu.Item key="2">All</Menu.Item>
        <Menu.Item key="3">Men</Menu.Item>
        <Menu.Item key="4">Women</Menu.Item>
        <Menu.Item key="5">Kids</Menu.Item>
        <Menu.Item key="6">Home & Living</Menu.Item>
        <Menu.Item key="7">Beauty & Health</Menu.Item>
        <Menu.Item key="8">Jewellery & Accessories</Menu.Item>
        <Menu.Item key="9">Bags & Footwear</Menu.Item>
        <Menu.Item key="10">
          <Badge size="small" count={wishlistCount}>
            <Button shape="circle" icon={<HeartOutlined />} />
          </Badge>
        </Menu.Item>
        <Menu.Item key="11">
          <Popover
            placement="bottomRight"
            overlayStyle={{ maxWidth: 500 }}
            content={MiniCart}
          >
            <Badge size="small" count={cartCount}>
              <Button shape="circle" icon={<ShoppingOutlined />} />
            </Badge>
          </Popover>
        </Menu.Item>
        <Menu.Item key="12">
          <Button shape="circle" icon={<ShoppingCartOutlined />} />
        </Menu.Item>
        <Menu.Item key="13">
          <Button shape="circle" icon={<UserOutlined />} />
        </Menu.Item>
        <Menu.Item key="14">
          <Button shape="circle" icon={<LogoutOutlined />} />
        </Menu.Item>
      </Menu>
    </React.Fragment>
  );
}

export default NavbarComp;
