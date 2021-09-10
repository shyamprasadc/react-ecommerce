import React from "react";
import { useHistory } from "react-router-dom";
import { Card, Col, Row } from "antd";
import {
  HeartOutlined,
  EllipsisOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import products from "../assets/data/products.json";
const { Meta } = Card;

function Home() {
  let history = useHistory();

  const handleImageClick = (id) => {
    history.push(`products/${id}`);
  };

  const renderProduct = (product, index) => {
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
                    src={product.image}
                    onClick={() => handleImageClick(product.productId)}
                  />
                }
                actions={[
                  <ShoppingOutlined key="shopping" />,
                  <HeartOutlined key="heart" />,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta title={product.name} description={product.description} />
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
      <Row gutter={[16, 24]}>{products.map(renderProduct)}</Row>
    </React.Fragment>
  );
}

export default Home;
