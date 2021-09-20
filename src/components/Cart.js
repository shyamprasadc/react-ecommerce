import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import _ from "lodash";
import { Row, Col, Card, Typography, Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { setUserDetails } from "../redux/actions/userActions";
import { setCart, updateCartCount } from "../redux/actions/cartActions";
const { Title } = Typography;
const { Meta } = Card;

function Cart(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.user.userDetails);
  const cart = useSelector((state) => state.cart.all);

  _.map(cart, (item) => {
    item.totalProductRegularPrice =
      item?.product?.regularPrice * item?.quantity;
    item.totalProductDiscountedPrice =
      item?.product?.discountedPrice * item?.quantity;
  });

  const totalRegularPrice = _.sumBy(cart, "totalProductRegularPrice");
  const totalDiscountPrice = _.sumBy(cart, "totalProductDiscountedPrice");

  const fetchCart = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      method: "GET",
      url: "https://ecommerce-app-locus-backend.herokuapp.com/api/cart",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios(config).catch((err) => {
      console.log("Err: ", err);
      message.info("Please login to continue", 1);
      history.push("/login");
    });
    if (response) {
      dispatch(setCart(response.data));
      dispatch(updateCartCount(response.data.length));
    }
  };

  const fetchUserDetails = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      method: "GET",
      url: "https://ecommerce-app-locus-backend.herokuapp.com/api/users/profile",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios(config).catch((err) => {
      console.log("Err: ", err);
      history.push("/login");
    });
    if (response) dispatch(setUserDetails(response.data));
  };

  useEffect(() => {
    fetchCart();
    fetchUserDetails();
  }, []);

  const handleRemoveCartItemClick = async (id) => {
    message.loading("Removing product from cart...", 0.5);
    const accessToken = localStorage.getItem("accessToken");
    const body = { cartId: id };
    const config = {
      method: "DELETE",
      url: "https://ecommerce-app-locus-backend.herokuapp.com/api/cart",
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
      message.success("Product removed from cart", 1);
      fetchCart();
    }
  };

  const handleImageClick = (id) => {
    history.push(`/products/${id}`);
  };

  const renderProduct = (cartItem, index) => {
    return (
      <React.Fragment>
        <Col span={24}>
          <Card hoverable style={{ width: "80%" }}>
            <Row>
              <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                <img
                  alt="example"
                  src={cartItem?.product?.image}
                  style={{ maxHeight: 150 }}
                  onClick={() => handleImageClick(cartItem?.product?.productId)}
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Meta
                  title={cartItem?.product?.name}
                  description={`${cartItem?.product?.description} (sku#: ${cartItem?.product?.sku})`}
                />
                <br />
                <span style={{ marginInlineEnd: 10 }}>
                  ₹{cartItem?.product?.discountedPrice}
                </span>
                <span style={{ textDecoration: "line-through", color: "grey" }}>
                  {` ₹${cartItem?.product?.regularPrice} `}
                </span>
                <span style={{ marginInlineStart: 10, color: "orange" }}>
                  {Math.round(
                    ((cartItem?.product?.regularPrice -
                      cartItem?.product?.discountedPrice) /
                      cartItem?.product?.regularPrice) *
                      100
                  )}
                  %
                </span>
                <br />
                <br />
                <p>Quantity: {cartItem?.quantity}</p>
              </Col>
              <Col xs={24} sm={24} md={2} lg={2} xl={2}>
                <Button
                  shape="circle"
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveCartItemClick(cartItem?.cartId)}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card style={{ maxWidth: "80%" }}>
            <p>
              Deliver to:{" "}
              <b>
                {`${userDetails?.name}, ${userDetails?.phone}, ${userDetails?.email}`}
              </b>
            </p>
            <p>{`${userDetails?.address}, ${userDetails?.city},${userDetails?.postcode}`}</p>
          </Card>
          <br />
          <br />
          <Title level={5}>My Shopping Cart{`(${cart?.length} Items)`}</Title>
          <br />
          <Row gutter={[24, 24]}>{cart.map(renderProduct)}</Row>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Title level={5}>Price Details</Title>
          <Card style={{ maxWidth: "80%" }}>
            <Row>
              <Col span={12} style={{ textAlign: "left" }}>
                <p>Total MRP</p>
                <p>Discount on MRP</p>
                <p>
                  <b>Total Amount</b>
                </p>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <p>₹{totalRegularPrice}</p>
                <p style={{ color: "orange" }}>
                  -₹{totalRegularPrice - totalDiscountPrice}
                </p>
                <p>
                  <b>₹{totalDiscountPrice}</b>
                </p>
              </Col>
            </Row>
            <Button style={{ maxWidth: "80%" }} type="primary">
              Place Order
            </Button>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default Cart;
