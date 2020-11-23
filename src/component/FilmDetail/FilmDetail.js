import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Select,
  Upload,
  message,
  InputNumber,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { get, omit } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import FilmActions from "../../redux/actions/film/film";
import FilmSelectors from "../../redux/selectors/film/film";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 18 },
};

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const FilmDetail = ({ id, onClose, openModal }) => {
  const [form] = Form.useForm();
  const [_id, setID] = useState(id);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSummit = (value) => {
    console.log("value", value);
  };

  const closeModal = () => {
    if (typeof openModal === "function") {
      openModal(onClose);
    }
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(
        info.file.originFileObj,
        (imageUrl) => setImage(imageUrl),
        setLoading(false)
      );
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="film_detail">
      <Card title={!id ? "Create Film" : "Film Detail & Update"}>
        <Form form={form} {...layout} onFinish={onSummit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input Name Film",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input Description",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input Price",
              },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: false,
                message: "Please choose image",
              },
            ]}
          >
            <Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {image ? (
                <img src={image} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
        </Form>

        <Form.Item {...tailLayout}>
          <>
            <Button type="danger" onClick={closeModal}>
              Close
            </Button>
            <Button type="default">Create</Button>
            <Button type="primary">Update</Button>
          </>
        </Form.Item>
      </Card>
    </div>
  );
};

export default FilmDetail;
