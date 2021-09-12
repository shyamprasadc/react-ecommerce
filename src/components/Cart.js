import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Typography, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import _ from "lodash";
import user from "../assets/data/user.json";
// import products from "../assets/data/products.json";
import { setProducts } from "../redux/actions/productsActions";
const { Title } = Typography;
const { Meta } = Card;

function Cart(props) {
  let history = useHistory();
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  const totalRegularPrice = _.sumBy(products, "regularPrice");
  const totalDiscountPrice = _.sumBy(products, "discountedPrice");

  const fetchProducts = async () => {
    const response = await axios
      .get("http://localhost:8080/api/cart")
      .catch((err) => {
        console.log("Err: ", err);
      });
    if (response) dispatch(setProducts(response.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleImageClick = (id) => {
    history.push(`/products/${id}`);
  };

  const renderProduct = (product, index) => {
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
                  onClick={() => handleImageClick(product.productId)}
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
          <Row gutter={[24, 24]}>{products.map(renderProduct)}</Row>
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
                <p>₹{totalRegularPrice}</p>
                <p style={{ color: "orange" }}>-₹{totalDiscountPrice}</p>
                <p>
                  <b>₹{totalRegularPrice - totalDiscountPrice}</b>
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

export default Cart;
