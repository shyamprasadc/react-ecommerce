import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import { Row, Col, Card, Typography, message } from "antd";
import { setOrders } from "../redux/actions/ordersActions";
const { Title } = Typography;
const { Meta } = Card;

function Orders() {
  const history = useHistory();
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders.all);

  const fetchOrders = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      method: "GET",
      url: "http://localhost:8080/api/orders",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios(config).catch((err) => {
      message.info("Please login to continue", 1);
      history.push("/login");
    });
    if (response) {
      dispatch(setOrders(response.data));
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleImageClick = (id) => {
    history.push(`/products/${id}`);
  };

  const renderProduct = (productItem, index) => {
    console.log(productItem);
    return (
      <React.Fragment>
        <Col span={24}>
          <Card>
            <Row>
              <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                <img
                  alt="example"
                  src={productItem?.product?.image}
                  style={{ maxHeight: 150 }}
                  onClick={() =>
                    handleImageClick(productItem?.product?.productId)
                  }
                />
              </Col>
              <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                <Meta
                  title={productItem?.product?.name}
                  description={`${productItem?.product?.description} (sku#: ${productItem?.product?.sku})`}
                />
                <br />
                <span style={{ marginInlineEnd: 10 }}>
                  ₹{productItem?.product?.discountedPrice}
                </span>
                <span style={{ textDecoration: "line-through", color: "grey" }}>
                  {` ₹${productItem?.product?.regularPrice} `}
                </span>
                <span style={{ marginInlineStart: 10, color: "orange" }}>
                  {Math.round(
                    ((productItem?.product?.regularPrice -
                      productItem?.product?.discountedPrice) /
                      productItem?.product?.regularPrice) *
                      100
                  )}
                  %
                </span>
                <br />
                <br />
                <p>Quantity: {productItem?.quantity}</p>
              </Col>
            </Row>
          </Card>
        </Col>
      </React.Fragment>
    );
  };

  const renderOrder = (order, index) => {
    return (
      <React.Fragment>
        <Col span={24}>
          <Card hoverable>
            <Row>
              <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                <Title level={5}>Order #: {order.processId}</Title>
              </Col>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <Title level={5}>
                  Date: {moment(order.createdAt).format("MM/DD/YYYY")}
                </Title>
              </Col>
              <Col xs={24} sm={24} md={5} lg={5} xl={5}>
                <Title level={5}>Total: {order.totalPrice}</Title>
              </Col>
              <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                <Title level={5}>
                  To:{" "}
                  {`${order?.address?.address}, ${order?.address?.city},${order?.address?.postcode} `}
                </Title>
              </Col>
            </Row>
            <Row
              gutter={[
                { xs: 8, sm: 16, md: 24, lg: 32 },
                { xs: 8, sm: 16, md: 24, lg: 32 },
              ]}
            >
              {order?.orderProducts.map(renderProduct)}
            </Row>
          </Card>
        </Col>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Title level={5}>My Orders{`(${orders?.length} placed)`}</Title>
      <br />
      <Row>
        <Col xs={24} sm={24} md={4} lg={4} xl={4}></Col>
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
          <Row
            justify="center"
            gutter={[
              { xs: 8, sm: 16, md: 24, lg: 32 },
              { xs: 8, sm: 16, md: 24, lg: 32 },
            ]}
          >
            {orders.map(renderOrder)}
          </Row>
        </Col>
        <Col xs={24} sm={24} md={4} lg={4} xl={4}></Col>
      </Row>
    </React.Fragment>
  );
}

export default Orders;
