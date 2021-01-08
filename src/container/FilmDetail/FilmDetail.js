import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Select,
  Option,
  Image,
  message,
  InputNumber,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { get, cloneDeep } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import FilmActions from "../../redux/actions/film/film";
import FilmSelectors from "../../redux/selectors/film/film";
import TypeFilmSelectors from "../../redux/selectors/type/type";
import { parse } from "query-string";
const { TextArea } = Input;

const layout = {
  labelCol: { offset: 2, span: 10 },
  wrapperCol: { offset: 2, span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 15 },
};

const FilmDetail = ({ id, onClose, openModal }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [name, setName] = useState();
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [types,setTypes] = useState();

  const detail = useSelector(FilmSelectors.getDetail);
  const listTypeFilm = useSelector(TypeFilmSelectors.getList);
  const filmDetail = get(detail, "film");
  const listTypes = get(listTypeFilm, "types");

  console.log("idfilm", id);
  console.log("filmDetail", filmDetail);


  useEffect(() => {
    if (id && id !== get(filmDetail, "_id")) {
      dispatch(FilmActions.onGetDetail(id));
    }
    return () => {
      form.resetFields();
    };
  }, [id,detail,form]);

  const closeModal = () => {
    if (typeof openModal === "function") {
      openModal(onClose);
    }
  };

  const creatFilm = () => {
    const params = new FormData();
    params.append("name", name);
    params.append("description", description);
    params.append("price", price);
    params.append("image", image);
    if(types){ types.map(type =>{
      params.append("types",type);
    }); } 
    dispatch(FilmActions.onCreate(params));
    form.resetFields();
    setImage(null);
  };

  const updateFilm = () => {
    const params = new FormData();
    if(name){params.append("name", name);}
    if(description){params.append("description", description);}
    if(price){params.append("price", price);}
    if(types){ types.map(type =>{
      params.append("types",type);
    }); }  
    if(image){
      params.append("image", image);
    } 
    if (id) {
      dispatch(FilmActions.onUpdate({ id, params }));
    }
  };

  return (
    <div className="film_detail">
      <Card title={!id ? "Create Film" : "Film Detail & Update"}>
        <Form
          form={form}
          {...layout}
          layout="vertical"
          initialValues={id?{
           ...filmDetail,
          }:{}}
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
            <TextArea rows={4} onChange={(e) => setDescription(e.target.value)} />
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
              onChange={(e) => setPrice(e)}
            />
          </Form.Item>
          <Form.Item
            label="Select Type"
            name="types"
            rules={[
              {
                required: true,
                message: "Please choose type film!",
              },
            ]}
          >
            <Select
            mode="multiple"
            showArrow
            style={{ width: "100%" }}
            placeholder="Choose Type Film"
            onChange ={e=>{setTypes(e)}}
            >
             {listTypes? listTypes.map(type =>{
                return (<Select.Option key={type._id} value={type._id}>{type.name}</Select.Option>)
              }):[]}
            </Select>
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
            <Input
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
            {image ? (
              <Image
                width={130}
                height={180}
                style={{ marginTop: 10 }}
                src={URL.createObjectURL(image)}
              />
            ) : null}
          </Form.Item>
        </Form>

        <Form.Item {...tailLayout}>
          <>
            <Button type="danger" onClick={closeModal}>
              Close
            </Button>
            <Button type="primary" hidden={id? true:false} onClick={creatFilm}>
              Create
            </Button>
            <Button type="default" hidden={!id? true:false} onClick={updateFilm}>
              Update
            </Button>
          </>
        </Form.Item>
      </Card>
    </div>
  );
};

export default FilmDetail;
