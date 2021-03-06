import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, Typography, message } from "antd";
const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function Address() {
  const history = useHistory();
  const { addressId } = useParams();

  const [form] = Form.useForm();

  const addNewAddress = async (data) => {
    message.loading("Adding new address...", 0.5);

    const accessToken = localStorage.getItem("accessToken");
    const body = {
      address: data.address,
      city: data.city,
      postcode: data.postcode,
    };
    const config = {
      method: "POST",
      url: "https://ecommerce-app-locus-backend.herokuapp.com/api/address",
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
      message.success("New address added", 1);
      history.push(`/cart`);
    }
  };

  const updateAddress = async (id, data) => {
    message.loading("Updating address...", 0.5);

    const accessToken = localStorage.getItem("accessToken");
    const body = {
      address: data.address,
      city: data.city,
      postcode: data.postcode,
    };
    const config = {
      method: "PUT",
      url: `https://ecommerce-app-locus-backend.herokuapp.com/api/address/${id}`,
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
      message.success("Address update success", 1);
      history.push(`/cart`);
    }
  };

  const fetchOneAddressAndPatchForm = async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      method: "GET",
      url: `https://ecommerce-app-locus-backend.herokuapp.com/api/address/${id}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await axios(config).catch((err) => {
      message.info("Please login to continue", 1);
      console.log("Err: ", err);
      history.push("/login");
    });
    if (response) {
      form.setFieldsValue({
        address: response?.data?.address ?? "",
        city: response?.data?.city ?? "",
        postcode: response?.data?.postcode ?? "",
      });
    }
  };

  useEffect(() => {
    if (addressId && addressId !== "") fetchOneAddressAndPatchForm(addressId);

    return () => {};
  }, [addressId]);

  const onFinish = (values) => {
    if (addressId && addressId !== "") {
      updateAddress(addressId, values);
    } else {
      addNewAddress(values);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <React.Fragment>
      <Title level={4}>Add New Address</Title>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        scrollToFirstError
      >
        <Form.Item
          name="address"
          label="Address"
          tooltip="Your Address"
          rules={[
            {
              required: true,
              message: "Please input your address!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="city"
          label="City"
          tooltip="Your City"
          rules={[
            {
              required: true,
              message: "Please input your city!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="postcode"
          label="Postcode"
          tooltip="Your Postcode"
          rules={[
            {
              required: true,
              message: "Please input your postcode!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
}

export default Address;
