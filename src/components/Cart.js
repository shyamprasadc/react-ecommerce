import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import _ from "lodash";
import {
  Row,
  Col,
  Card,
  Space,
  Typography,
  Button,
  Radio,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { setUserAddress, setUserDetails } from "../redux/actions/userActions";
import { setCart, updateCartCount } from "../redux/actions/cartActions";
import logo from "../assets/images/hon_logo_1.png";
const { Title } = Typography;
const { Meta } = Card;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function Cart(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [selectedAddressId, setSelectedAddressId] = useState(0);

  const userDetails = useSelector((state) => state.user.userDetails);
  const userAddress = useSelector((state) => state.user.userAddress);
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

  const fetchUserAddress = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      method: "GET",
      url: "https://ecommerce-app-locus-backend.herokuapp.com/api/address",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios(config).catch((err) => {
      console.log("Err: ", err);
      history.push("/login");
    });
    if (response) {
      dispatch(setUserAddress(response.data));
      setSelectedAddressId(response.data[0]?.addressId);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchUserDetails();
    fetchUserAddress();
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

  const handleRemoveAddressClick = async (id) => {
    message.loading("Deleting address...", 0.5);
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      method: "DELETE",
      url: `https://ecommerce-app-locus-backend.herokuapp.com/api/address/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios(config).catch((err) => {
      message.info("Please login to continue", 1);
      console.log("Err: ", err);
      history.push("/login");
    });
    if (response) {
      message.success("Address deleted", 1);
      fetchUserAddress();
    }
  };

  const createOrder = async (processId) => {
    const accessToken = localStorage.getItem("accessToken");
    const body = {
      addressId: selectedAddressId,
      processId,
    };
    const config = {
      method: "POST",
      url: "https://ecommerce-app-locus-backend.herokuapp.com/api/orders",
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
      message.success("Order placed", 1);
      fetchCart();
      history.push("/orders");
    }
  };

  const initRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) return message.error("Payment failed", 1);

    const accessToken = localStorage.getItem("accessToken");
    const config = {
      method: "POST",
      url: "https://ecommerce-app-locus-backend.herokuapp.com/api/payments/order",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const razorpayResponse = await axios(config).catch((err) => {
      console.log("Err: ", err);
      message.info("Please login to continue", 1);
      return history.push("/login");
    });

    if (!razorpayResponse.data) message.error("Payment failed", 1);

    const options = {
      key: "rzp_test_IMZaVpjiUiB6G7",
      currency: razorpayResponse.data.currency,
      amount: razorpayResponse.data.amount,
      order_id: razorpayResponse.data.id,
      name: "Pay Amount",
      description: "",
      image: logo,
      handler: function (response) {
        message.info("Payment success", 1);
        createOrder(response.razorpay_payment_id);
      },
      prefill: {
        name: userDetails?.name,
        email: userDetails?.email,
        phone_number: userDetails?.phone,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handlePlaceOrderClick = async (id) => {
    if (!cart.length > 0) return message.warning("No products in cart");
    message.loading("Placing order...", 0.5);
    initRazorpay();
  };

  const handleEditAddressClick = (id) => {
    history.push(`/address/${id}`);
  };

  const handleImageClick = (id) => {
    history.push(`/products/${id}`);
  };

  const handleAddNewAddress = () => {
    history.push("/address");
  };

  const handleAddressChange = (e) => {
    setSelectedAddressId(e.target.value);
  };

  const renderProduct = (cartItem, index) => {
    return (
      <React.Fragment>
        <Col span={24}>
          <Card hoverable>
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
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card>
            <Row>
              <Col span={19}>
                <Title level={5}>Address</Title>
              </Col>
              <Col span={5}>
                <Button
                  size="small"
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => handleAddNewAddress()}
                >
                  Add
                </Button>
              </Col>
            </Row>
            <p>
              Deliver to:
              <b>{`${userDetails?.name}, ${userDetails?.phone}, ${userDetails?.email}`}</b>
            </p>
            <Radio.Group
              onChange={handleAddressChange}
              value={selectedAddressId}
            >
              <Space direction="vertical">
                {userAddress.map((item) => (
                  <Radio value={item?.addressId}>
                    {`${item?.address}, ${item?.city},${item?.postcode} `}
                    <Button
                      shape="circle"
                      size="small"
                      icon={<EditOutlined />}
                      onClick={() => handleEditAddressClick(item?.addressId)}
                    />{" "}
                    <Button
                      shape="circle"
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemoveAddressClick(item?.addressId)}
                    />
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Card>
          <br />
          <br />
          <Title level={5}>My Shopping Cart{`(${cart?.length} Items)`}</Title>
          <br />
          <Row
            gutter={[
              { xs: 8, sm: 16, md: 24, lg: 32 },
              { xs: 8, sm: 16, md: 24, lg: 32 },
            ]}
          >
            {cart.map(renderProduct)}
          </Row>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Title level={5}>Price Details</Title>
          <Card>
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
            <Button
              type="primary"
              style={{ width: "100%" }}
              onClick={() => handlePlaceOrderClick()}
            >
              Place Order
            </Button>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default Cart;
