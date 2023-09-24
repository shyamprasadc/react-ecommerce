import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Carousel, Typography } from "antd";
import { HeartFilled, ShoppingOutlined } from "@ant-design/icons";
import "./Home.css";
import carousel from "../assets/data/carousel.json";
import { fetchProducts } from "../redux/actions/productsActions";
import { fetchCart, addProductToCart } from "../redux/actions/cartActions";
import {
  fetchWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
} from "../redux/actions/wishlistActions";
import ReactPlayer from "react-player";
import _ from "lodash";
const { Meta } = Card;
const { Title } = Typography;

function Home(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [videoPlay, setVideoPlay] = useState(false);
  const [carouselPlay, setCarouselPlay] = useState(false);

  const products = useSelector((state) => state.products.all);
  const wishlist = useSelector((state) => state.wishlist.all);

  useEffect(() => {
    setCarouselPlay(true);
    dispatch(fetchProducts());
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    dispatch(addProductToCart(productId, 1, history));
  };

  const handleAddToWishlist = (productId) => {
    dispatch(addProductToWishlist(productId, history));
  };

  const handleRemoveFromWishlist = (wishlistId) => {
    dispatch(removeProductFromWishlist(wishlistId, history));
  };

  const handleImageClick = (id) => {
    history.push(`/products/${id}`);
  };

  const handleVideoEnd = () => {
    setVideoPlay(false);
    setCarouselPlay(true);
  };

  const handleCarouselChange = (current) => {
    if (current === 3) {
      setVideoPlay(true);
      setCarouselPlay(false);
    } else {
      setVideoPlay(false);
    }
  };

  const renderProduct = (product, index) => {
    const wishlistItem = _.find(wishlist, {
      product: { productId: product.productId },
    });
    const isWishlistItem = _.isEmpty(wishlistItem);

    return (
      <React.Fragment>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <Row justify="center">
            <Col>
              <Card
                hoverable
                style={{ maxWidth: 240 }}
                cover={
                  <img
                    alt="example"
                    src={product?.image}
                    onClick={() => handleImageClick(product?.productId)}
                  />
                }
                actions={[
                  <HeartFilled
                    style={{ color: isWishlistItem ? "lightGrey" : "red" }}
                    key="heart"
                    onClick={() =>
                      isWishlistItem
                        ? handleAddToWishlist(product?.productId)
                        : handleRemoveFromWishlist(wishlistItem?.wishlistId)
                    }
                  />,
                  <ShoppingOutlined
                    key="shopping"
                    onClick={() => handleAddToCart(product?.productId)}
                  />,
                ]}
              >
                <Meta
                  title={product?.name}
                  description={product?.description}
                />
                <span style={{ marginInlineEnd: 10 }}>
                  ₹{product?.discountedPrice}
                </span>
                <span style={{ textDecoration: "line-through", color: "grey" }}>
                  {` ₹${product?.regularPrice} `}
                </span>
                <span style={{ marginInlineStart: 10, color: "orange" }}>
                  {Math.round(
                    ((product?.regularPrice - product?.discountedPrice) /
                      product?.regularPrice) *
                      100
                  )}
                  %
                </span>
              </Card>
            </Col>
          </Row>
        </Col>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Carousel
        autoplay={carouselPlay}
        effect="fade"
        afterChange={handleCarouselChange}
      >
        <div className="carousel-wrapper">
          <img
            className="carousel-content"
            alt="example"
            src={carousel.image1}
          />
        </div>
        <div className="carousel-wrapper">
          <img
            className="carousel-content"
            alt="example"
            src={carousel.image2}
          />
        </div>
        <div className="carousel-wrapper">
          <img
            className="carousel-content"
            alt="example"
            src={carousel.image3}
          />
        </div>
        <div className="carousel-wrapper">
          <ReactPlayer
            className="carousel-content"
            url={carousel.video1}
            playing={videoPlay}
            controls={false}
            onEnded={handleVideoEnd}
          />
        </div>
      </Carousel>
      <br />
      <Title level={4}>BIGGEST DEALS ON TOP BRANDS</Title>
      <br />
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        {products.map(renderProduct)}
      </Row>
    </React.Fragment>
  );
}

export default Home;
