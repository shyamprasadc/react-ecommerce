import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
} from "antd";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../redux/actions/productsActions";
// import products from "../assets/data/products.json";
import Review from "./Review";
const { Option } = Select;
const { Title } = Typography;

function Product(props) {
  const { productId } = useParams();
  const [visible, setVisible] = useState(false);
  // const [product] = products.filter((p) => p.productId == productId);
  let product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const fetchOneProduct = async (id) => {
    const response = await axios
      .get(`http://localhost:8080/api/products/${id}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    if (response) dispatch(selectedProduct(response.data));
  };

  useEffect(() => {
    if (productId && productId !== "") fetchOneProduct(productId);
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

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
            <br />
            <Title level={5}>Select size</Title>
            <Space>
              <Button shape="circle">S</Button>
              <Button shape="circle">M</Button>
              <Button shape="circle">L</Button>
              <Button shape="circle">XL</Button>
            </Space>
            <br />
            <br />
            <Space>
              <Select
                defaultValue={1}
                style={{ width: 120 }}
                onChange={handleChange}
              >
                <Option value={1}>1</Option>
                <Option value={2}>2</Option>
                <Option value={3}>3</Option>
                <Option value={4}>4</Option>
                <Option value={5}>5</Option>
              </Select>
              <Button type="primary">Add to cart</Button>
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
