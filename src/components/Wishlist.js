import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, Col, Row, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  HeartOutlined,
  EllipsisOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { setProducts } from "../redux/actions/productsActions";
const { Meta } = Card;
const { Title } = Typography;

function Wishlist(props) {
  let history = useHistory();
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
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
                  {product.discountedPrice}
                </span>
                <span style={{ textDecoration: "line-through" }}>
                  {` ${product.regularPrice} `}
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
      <Title level={4}>My Wishlist</Title>
      <br />
      <Row gutter={[16, 24]}>{products.map(renderProduct)}</Row>
    </React.Fragment>
  );
}

export default Wishlist;
