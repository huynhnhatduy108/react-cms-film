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
import { parse } from "query-string";

const layout = {
  labelCol: { offset: 2,span: 10 },
  wrapperCol: {  offset: 2,span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 15 },
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
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  // const [idFilm, setIdFilm] = useState(id);
  const [hidden, setHidden] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();

  const [loading, setLoading] = useState(false);

  const detail = useSelector(FilmSelectors.getDetail);
  const filmDetail = get(detail, "film");
  console.log("id", id);


  useEffect(() => {
    if (id) {
      dispatch(FilmActions.onGetDetail(id));
    }
    return () => {
      form.resetFields();
    };
  }, [id]);

  const onSummit = (value) => {
    console.log("value", value);
  };

  const closeModal = () => {
    if (typeof openModal === "function") {
      openModal(onClose);
    }
    form.resetFields();
    // setHidden(true);
  };

  const creatFilm = () => {
    const params ={
      name:name,
      description:description,
      price:price,
      thumbnail:thumbnail,
    }
    dispatch(FilmActions.onCreate({params}));
      form.resetFields();
  };

  const updateFilm = () => {
    const params ={
      name:name,
      description:description,
      price:price,
      thumbnail:thumbnail,
    }
    if (id) {
      dispatch(FilmActions.onUpdate({id,params}))
    }
    // let id ="5fbbb3dff3332b276cfdc08d";
   
  };

  // Upload img

  // const handleChange = (info) => {
  //   if (info.file.status === "uploading") {
  //     setLoading(true);
  //     return;
  //   }
  //   if (info.file.status === "done") {
  //     getBase64(
  //       info.file.originFileObj,
  //       (imageUrl) => setImage(imageUrl),
  //       setLoading(false)
  //     );
  //   }
  // };
  // const uploadButton = (
  //   <div>
  //     {loading ? <LoadingOutlined /> : <PlusOutlined />}
  //     <div style={{ marginTop: 8 }}>Upload</div>
  //   </div>
  // );

  return (
    <div className="film_detail">
      <Card title={!hidden ? "Create Film" : "Film Detail & Update"}>
        <Form form={form}
         {...layout} 
         layout="vertical"
         initialValues={{
           ...filmDetail,
         }}
         onFinish={onSummit}
         >
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
            <Input onChange={(e) => setName(e.target.value)} />
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
            <Input onChange={(e) => setDescription(e.target.value)} />
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
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              onChange={(e)=>setPrice(e)}
            />
          </Form.Item>
          <Form.Item
            label="Image URL"
            name="thumbnail"
            rules={[
              {
                required: true,
                message: "Please input Image URL",
              },
            ]}
          >
            <Input
              onChange={(e)=>setThumbnail(e.target.value)}
            />
          </Form.Item>
          {/* <Form.Item 
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
          </Form.Item> */}
        </Form>

        <Form.Item {...tailLayout}>
          <>
            <Button type="danger" onClick={closeModal}>
              Close
            </Button>
            <Button type="primary" hidden={false} onClick={creatFilm}>
              Create
            </Button>
            <Button type="default" hidden={false} onClick={updateFilm}>
              Update
            </Button>
          </>
        </Form.Item>
      </Card>
    </div>
  );
};

export default FilmDetail;
