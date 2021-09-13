import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, Col, Row, Typography, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { DeleteOutlined, ShoppingOutlined } from "@ant-design/icons";
import { setWishlist } from "../redux/actions/wishlistActions";
const { Meta } = Card;
const { Title } = Typography;

function Wishlist(props) {
  const history = useHistory();
  const wishlist = useSelector((state) => state.allWishlist.wishlist);
  const dispatch = useDispatch();

  const fetchWishlist = async () => {
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
    if (response) dispatch(setWishlist(response.data));
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemoveWishlistItemClick = async (id) => {
    message.loading("Removing product from wishlist...", 0.5);

    const accessToken = localStorage.getItem("accessToken");
    const body = { wishlistId: id };
    const config = {
      method: "DELETE",
      url: "http://localhost:8080/api/wishlist",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: body,
    };
    const response = await axios(config).catch((err) => {
      message.error("Product remove from wishlist failed", 1);
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

  const renderProduct = (wishlistItem, index) => {
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
                    src={wishlistItem.product.image}
                    onClick={() =>
                      handleImageClick(wishlistItem.product.productId)
                    }
                  />
                }
                actions={[
                  <ShoppingOutlined key="shopping" />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() =>
                      handleRemoveWishlistItemClick(wishlistItem.wishlistId)
                    }
                  />,
                ]}
              >
                <Meta
                  title={wishlistItem.product.name}
                  description={wishlistItem.product.description}
                />
                <span style={{ marginInlineEnd: 10 }}>
                  {wishlistItem.product.discountedPrice}
                </span>
                <span style={{ textDecoration: "line-through" }}>
                  {` ${wishlistItem.product.regularPrice} `}
                </span>
                <span style={{ marginInlineStart: 10, color: "orange" }}>
                  {Math.round(
                    ((wishlistItem.product.regularPrice -
                      wishlistItem.product.discountedPrice) /
                      wishlistItem.product.regularPrice) *
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
      <Title level={4}>My Wishlist{`(${wishlist.length} Items)`}</Title>
      <br />
      <Row gutter={[16, 24]}>{wishlist.map(renderProduct)}</Row>
    </React.Fragment>
  );
}

export default Wishlist;
