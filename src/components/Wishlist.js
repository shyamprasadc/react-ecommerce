import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Card, Col, Row, Typography, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, ShoppingOutlined } from "@ant-design/icons";
import { setCart, updateCartCount } from "../redux/actions/cartActions";
import {
  setWishlist,
  updateWishlistCount,
} from "../redux/actions/wishlistActions";
const { Meta } = Card;
const { Title } = Typography;

function Wishlist(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist.all);

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

  useEffect(() => {
    fetchWishlist();
  }, []);

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

  const handleAddToCart = async (id) => {
    message.loading("Adding product to cart...", 0.5);
    const accessToken = localStorage.getItem("accessToken");
    const body = {
      productId: id,
      quantity: 1,
    };
    const config = {
      method: "POST",
      url: "http://localhost:8080/api/cart",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: body,
    };
    const response = await axios(config).catch((err) => {
      message.info("Please login to continue", 1);
      console.log("Err: ", err);
      history.push("/login");
    });
    if (response) {
      message.success("Product added to cart", 1);
      fetchCart();
    }
  };

  const handleRemoveWishlistItemClick = async (id) => {
    message.loading("Removing product from wishlist...", 0.5);

    const accessToken = localStorage.getItem("accessToken");
    const body = { wishlistId: id };
    const config = {
      method: "DELETE",
      url: "http://localhost:8080/api/wishlist",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: body,
    };
    const response = await axios(config).catch((err) => {
      message.info("Please login to continue", 1);
      console.log("Err: ", err);
      history.push("/login");
    });
    if (response) {
      message.success("Product removed from wishlist", 1);
      fetchWishlist();
    }
  };

  const handleImageClick = (id) => {
    history.push(`/products/${id}`);
  };

  const renderProduct = (wishlistItem, index) => {
    return (
      <React.Fragment>
        <Col span={6}>
          <Row>
            <Col span={2}></Col>
            <Col span={20}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <img
                    alt="example"
                    src={wishlistItem.product.image}
                    onClick={() =>
                      handleImageClick(wishlistItem.product.productId)
                    }
                  />
                }
                actions={[
                  <ShoppingOutlined
                    key="shopping"
                    onClick={() =>
                      handleAddToCart(wishlistItem.product.productId)
                    }
                  />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() =>
                      handleRemoveWishlistItemClick(wishlistItem.wishlistId)
                    }
                  />,
                ]}
              >
                <Meta
                  title={wishlistItem.product.name}
                  description={wishlistItem.product.description}
                />
                <span style={{ marginInlineEnd: 10 }}>
                  {wishlistItem.product.discountedPrice}
                </span>
                <span style={{ textDecoration: "line-through" }}>
                  {` ${wishlistItem.product.regularPrice} `}
                </span>
                <span style={{ marginInlineStart: 10, color: "orange" }}>
                  {Math.round(
                    ((wishlistItem.product.regularPrice -
                      wishlistItem.product.discountedPrice) /
                      wishlistItem.product.regularPrice) *
                      100
                  )}
                  %
                </span>
              </Card>
            </Col>
            <Col span={2}></Col>
          </Row>
        </Col>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Title level={4}>My Wishlist{`(${wishlist.length} Items)`}</Title>
      <br />
      <Row gutter={[16, 24]}>{wishlist.map(renderProduct)}</Row>
    </React.Fragment>
  );
}

export default Wishlist;
