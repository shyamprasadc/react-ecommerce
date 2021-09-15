import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
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
} from "antd";
import { HeartOutlined } from "@ant-design/icons";
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

function Product(props) {
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

  const fetchOneProduct = async (id) => {
    const response = await axios
      .get(`http://localhost:8080/api/products/${id}`)
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
      .get(`http://localhost:8080/api/products/groups/${id}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    if (response) dispatch(setProductGroup(response.data));
  };

  const fetchCart = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      method: "GET",
      url: "http://localhost:8080/api/cart",
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
      url: "http://localhost:8080/api/wishlist",
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
      url: "http://localhost:8080/api/cart",
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
      url: "http://localhost:8080/api/wishlist",
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
        <Col span={3}></Col>
        <Col span={9}>
          <Image
            preview={{ visible: false }}
            width={400}
            src={product.image}
            onClick={() => setVisible(true)}
          />
          <div style={{ display: "none" }}>
            <Image.PreviewGroup
              preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
            >
              <Image src={product.image} />
              <Image src={product.image} />
              <Image src={product.image} />
            </Image.PreviewGroup>
          </div>
        </Col>
        <Col span={9}>
          <Title level={3}>{product.name}</Title>
          <Title level={4}>{product.description}</Title>
          <Rate value={3} />
          <br />
          <br />
          <div>
            <Title level={5}>
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
            </Title>
            <br />
            <Button
              shape="circle"
              icon={<HeartOutlined />}
              onClick={() => handleAddToWishlist(product.productId)}
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
                  style={{ color: product.color }}
                  value={product.productId}
                >
                  {product.color}
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
                onClick={() => handleAddToCart(product.productId)}
              >
                Add to cart
              </Button>
            </Space>
          </div>
        </Col>
        <Col span={3}></Col>
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

export default Product;
