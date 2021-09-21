import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import _ from "lodash";
import {
  Row,
  Col,
  Button,
  Space,
  Image,
  Rate,
  Select,
  Divider,
  Typography,
  Radio,
  message,
  Card,
} from "antd";
import { HeartFilled } from "@ant-design/icons";
import {
  setProductDetails,
  removeProductDetails,
  setProductGroup,
  removeProductGroup,
} from "../redux/actions/productsActions";
import { setCart, updateCartCount } from "../redux/actions/cartActions";
import {
  setWishlist,
  updateWishlistCount,
} from "../redux/actions/wishlistActions";
import Review from "./Review";
const { Option } = Select;
const { Title } = Typography;

function ProductDetails(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const { productId } = useParams();

  const [selectedProductId, setSelectedProductId] = useState(
    parseInt(productId)
  );
  const [visible, setVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product = useSelector((state) => state.products.productDetails);
  const productGroup = useSelector((state) => state.products.productGroup);
  const wishlist = useSelector((state) => state.wishlist.all);

  const wishlistItem = _.find(wishlist, {
    product: { productId: selectedProductId },
  });
  const isWishlistItem = _.isEmpty(wishlistItem);

  const fetchOneProduct = async (id) => {
    const response = await axios
      .get(
        `https://ecommerce-app-locus-backend.herokuapp.com/api/products/${id}`
      )
      .catch((err) => {
        console.log("Err: ", err);
      });
    if (response) {
      dispatch(setProductDetails(response.data));
      if (response.data.groupId) {
        await fetchProductGroup(response.data.groupId);
      } else {
        dispatch(setProductGroup([response.data]));
      }
    }
  };

  const fetchProductGroup = async (id) => {
    const response = await axios
      .get(
        `https://ecommerce-app-locus-backend.herokuapp.com/api/products/groups/${id}`
      )
      .catch((err) => {
        console.log("Err: ", err);
      });
    if (response) dispatch(setProductGroup(response.data));
  };

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
      quantity,
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

  useEffect(() => {
    if (productId && productId !== "") fetchOneProduct(productId);

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      fetchCart();
      fetchWishlist();
    }

    return () => {
      dispatch(removeProductDetails());
      dispatch(removeProductGroup());
    };
  }, [productId]);

  function handleQuantityChange(value) {
    setQuantity(value);
  }

  const handleProductChange = (e) => {
    setSelectedProductId(e.target.value);
    // history.push(`/products/${e.target.value}`);
    fetchOneProduct(e.target.value);
  };

  return (
    <React.Fragment>
      <Row>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Row justify="center">
            <Col>
              <Image
                preview={{ visible: false }}
                width={400}
                src={product?.image}
                onClick={() => setVisible(true)}
              />
              <div style={{ display: "none" }}>
                <Image.PreviewGroup
                  preview={{
                    visible,
                    onVisibleChange: (vis) => setVisible(vis),
                  }}
                >
                  <Image src={product?.image} />
                  <Image src={product?.image} />
                  <Image src={product?.image} />
                </Image.PreviewGroup>
              </div>
            </Col>
          </Row>
          <Row
            justify="center"
            gutter={[
              { xs: 8, sm: 16, md: 24, lg: 32 },
              { xs: 8, sm: 16, md: 24, lg: 32 },
            ]}
          >
            <Col>
              <Card hoverable bodyStyle={{ padding: 0 }}>
                <img
                  alt="example"
                  style={{ maxWidth: 100 }}
                  src={product?.image}
                />
              </Card>
            </Col>
            <Col>
              <Card hoverable bodyStyle={{ padding: 0 }}>
                <img
                  alt="example"
                  style={{ maxWidth: 100 }}
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              </Card>
            </Col>
            <Col>
              <Card hoverable bodyStyle={{ padding: 0 }}>
                <img
                  alt="example"
                  style={{ maxWidth: 100 }}
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Row justify="start">
            <Col>
              <Title level={3}>{product?.name}</Title>
              <Title level={4}>{product?.description}</Title>
              <Title level={5}>SKU#: {product?.sku}</Title>
              <Rate value={3} />
              <br />
              <br />
              <div>
                <Title level={5}>
                  <span style={{ marginInlineEnd: 10 }}>
                    ₹{product?.discountedPrice}
                  </span>
                  <span
                    style={{ textDecoration: "line-through", color: "grey" }}
                  >
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
                </Title>
                <br />
                <HeartFilled
                  style={{
                    fontSize: 25,
                    color: isWishlistItem ? "lightGrey" : "red",
                  }}
                  key="heart"
                  onClick={() =>
                    isWishlistItem
                      ? handleAddToWishlist(product?.productId)
                      : handleRemoveFromWishlist(wishlistItem?.wishlistId)
                  }
                />
                <br />
                <br />
                <Title level={5}>Select Color</Title>
                <Radio.Group
                  onChange={handleProductChange}
                  value={selectedProductId}
                >
                  {productGroup.map((product) => (
                    <Radio
                      style={{ color: product?.color }}
                      value={product?.productId}
                    >
                      {product?.color}
                    </Radio>
                  ))}
                </Radio.Group>
                <br />
                <br />
                <Space>
                  <Select
                    defaultValue={quantity}
                    style={{ width: 120 }}
                    onChange={handleQuantityChange}
                  >
                    <Option value={1}>1</Option>
                    <Option value={2}>2</Option>
                    <Option value={3}>3</Option>
                    <Option value={4}>4</Option>
                    <Option value={5}>5</Option>
                  </Select>
                  <Button
                    type="primary"
                    onClick={() => handleAddToCart(product?.productId)}
                  >
                    Add to cart
                  </Button>
                </Space>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <br />
      <Divider />
      <br />
      <Review />
      <Review />
      <Review />
    </React.Fragment>
  );
}

export default ProductDetails;
