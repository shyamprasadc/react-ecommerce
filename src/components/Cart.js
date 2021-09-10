import React, { Component } from "react";
import { Row, Col, Card, Typography, Button } from "antd";
import _ from "lodash";
import user from "../assets/data/user.json";
import products from "../assets/data/products.json";
const { Title } = Typography;
const { Meta } = Card;

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  totalRegularPrice = _.sumBy(products, "regularPrice");
  totalDiscountPrice = _.sumBy(products, "discountedPrice");

  handleImageClick = (id) => {
    this.props.history.push(`products/${id}`);
  };

  renderProduct = (product, index) => {
    return (
      <React.Fragment>
        <Col span={24}>
          <Card hoverable style={{ height: 200 }}>
            <Row>
              <Col span={10}>
                <img
                  alt="example"
                  src={product.image}
                  style={{ maxHeight: 150 }}
                  onClick={() => this.handleImageClick(product.productId)}
                />
              </Col>
              <Col span={14}>
                <Meta title={product.name} description={product.description} />
                <br />
                <span style={{ marginInlineEnd: 10 }}>
                  ₹{product.discountedPrice}
                </span>
                <span style={{ textDecoration: "line-through", color: "grey" }}>
                  {` ₹${product.regularPrice} `}
                </span>
                <span style={{ marginInlineStart: 10, color: "orange" }}>
                  {Math.round(
                    ((product.regularPrice - product.discountedPrice) /
                      product.regularPrice) *
                      100
                  )}
                  %
                </span>
                <br />
                <br />
                <p>Quantity: 1</p>
              </Col>
            </Row>
          </Card>
        </Col>
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col span={2}></Col>
          <Col span={9}>
            <Card style={{ width: "100%" }}>
              <p>
                Deliver to: <b>{`${user.name}, ${user.phone}`}</b>
              </p>
              <p>{`${user.address}, ${user.city},${user.postcode}`}</p>
            </Card>
            <br />
            <br />
            <Title level={5}>
              My Shopping Cart{`(${products.length} Items)`}
            </Title>
            <br />
            <Row gutter={[24, 24]}>{products.map(this.renderProduct)}</Row>
          </Col>
          <Col span={2}></Col>
          <Col span={9}>
            <Title level={5}>Price Details</Title>
            <Card style={{ width: "100%" }}>
              <Row>
                <Col span={12} style={{ textAlign: "left" }}>
                  <p>Total MRP</p>
                  <p>Discount on MRP</p>
                  <p>
                    <b>Total Amount</b>
                  </p>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <p>₹{this.totalRegularPrice}</p>
                  <p style={{ color: "orange" }}>-₹{this.totalDiscountPrice}</p>
                  <p>
                    <b>₹{this.totalRegularPrice - this.totalDiscountPrice}</b>
                  </p>
                </Col>
              </Row>
              <Button style={{ width: "100%" }} type="primary">
                Place Order
              </Button>
            </Card>
          </Col>
          <Col span={2}></Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Cart;
