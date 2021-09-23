import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, Col, Row, message } from "antd";
import axios from "axios";
import _ from "lodash";
import { HeartFilled, ShoppingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/productsActions";
import { setCart, updateCartCount } from "../redux/actions/cartActions";
import {
  setWishlist,
  updateWishlistCount,
} from "../redux/actions/wishlistActions";
const { Meta } = Card;

function Products(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.all);
  const wishlist = useSelector((state) => state.wishlist.all);

  const fetchProducts = async () => {
    const response = await axios
      .get("https://ecommerce-app-locus-backend.herokuapp.com/api/products")
      .catch((err) => {
        console.log("Err: ", err);
      });
    if (response) dispatch(setProducts(response.data));
  };

  useEffect(() => {
    fetchProducts();
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      fetchCart();
      fetchWishlist();
    }
  }, []);

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
      history.push("/login");
    });
    if (response) {
      dispatch(setCart(response.data));
      dispatch(updateCartCount(response.data.length));
    }
  };

  const fetchWishlist = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      method: "GET",
      url: "https://ecommerce-app-locus-backend.herokuapp.com/api/wishlist",
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

  const handleAddToCart = async (id) => {
    message.loading("Adding product to cart...", 0.5);
    const accessToken = localStorage.getItem("accessToken");
    const body = {
      productId: id,
      quantity: 1,
    };
    const config = {
      method: "POST",
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
      message.success("Product added to cart", 1);
      fetchCart();
    }
  };

  const handleAddToWishlist = async (id) => {
    message.loading("Adding product to wishlist...", 0.5);
    const accessToken = localStorage.getItem("accessToken");
    const body = { productId: id };
    const config = {
      method: "POST",
      url: "https://ecommerce-app-locus-backend.herokuapp.com/api/wishlist",
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
      message.success("Product added to wishlist", 1);
      fetchWishlist();
    }
  };

  const handleRemoveFromWishlist = async (id) => {
    message.loading("Removing product from wishlist...", 0.5);

    const accessToken = localStorage.getItem("accessToken");
    const body = { wishlistId: id };
    const config = {
      method: "DELETE",
      url: "https://ecommerce-app-locus-backend.herokuapp.com/api/wishlist",
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
                ß
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

export default Products;
