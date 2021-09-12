import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  HeartOutlined,
  EllipsisOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
// import products from "../assets/data/products.json";
import { setProducts } from "../redux/actions/productsActions";
const { Meta } = Card;

function Home(props) {
  let history = useHistory();
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const response = await axios
      .get("http://localhost:8080/api/products")
      .catch((err) => {
        console.log("Err: ", err);
      });
    if (response) dispatch(setProducts(response.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = async (id) => {
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
      console.log("Err: ", err);
    });
    if (response) history.push("/cart");
  };

  const handleAddToWishlist = async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    const body = { productId: id };
    const config = {
      method: "POST",
      url: "http://localhost:8080/api/wishlist",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: body,
    };
    const response = await axios(config).catch((err) => {
      console.log("Err: ", err);
    });
    if (response) history.push("/wishlist");
  };

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
                  <ShoppingOutlined
                    key="shopping"
                    onClick={() => handleAddToCart(product.productId)}
                  />,
                  <HeartOutlined
                    key="heart"
                    onClick={() => handleAddToWishlist(product.productId)}
                  />,
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
