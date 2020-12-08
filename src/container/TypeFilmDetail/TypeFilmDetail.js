import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Select,
  Option,
  InputNumber,
} from "antd";
import { get, omit } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import TypeFilmActions from "../../redux/actions/type/typefilm";
import TypeFilmSelectors from "../../redux/selectors/type/type";
import FilmSelectors from "../../redux/selectors/film/film";
import { parse } from "query-string";

const {TextArea} =Input;

const layout = {
  labelCol: { offset: 2, span: 10 },
  wrapperCol: { offset: 2, span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 18 },
};

const TypeFilmDetail = ({ id, onClose, openModal }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [keycode, setKeycode] = useState("");
  const detail = useSelector(TypeFilmSelectors.getDetail);
  const typeDetail = get(detail, "type");
  console.log("idtypefilm", id);
  console.log("description", description);


  useEffect(() => {
    if (id) {
      dispatch(TypeFilmActions.onGetDetail(id));
    }
    return () => {
      form.resetFields();
    };
  }, [id]);
 

  const closeModal = () => {
    if (typeof openModal === "function") {
      openModal(onClose);
    }
  };

  const creatTypeFilm = () =>{
    const params ={
      name:name,
      description:description,
      keycode:keycode,
    }
    dispatch(TypeFilmActions.onCreate(params));
    form.resetFields();
  }

  const updateTypeFilm = () =>{
    const params ={
      name:name,
      description:description,
      keycode:keycode,
    }
   if(id){  
    dispatch(TypeFilmActions.onUpdate({id,params}));
    form.resetFields();}
  }

  return (
    <div className="film_type_detail">
      <Card title={!id ? "Create Type Film" : "Type Film Detail & Update"}>
        <Form form={form} {...layout} 
        layout="vertical"
        initialValues={id ? {
          ...typeDetail,
         }:{}}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input Name Type Film",
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
            <TextArea rows={4} onChange={(e) => setDescription(e.target.value)}/>
          </Form.Item>
          <Form.Item
            label="Key Code"
            name="keycode"
            rules={[
              {
                required: true,
                message: "Please input Key Code",
              },
            ]}
          >
            <Input onChange={(e) => setKeycode(e.target.value)}/>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <>
              <Button type="danger" onClick={closeModal}>
                Close
              </Button>
              <Button type="default" hidden={id? true:false} onClick={creatTypeFilm}>Create</Button>
              <Button type="primary" hidden={!id? true:false} onClick={updateTypeFilm}>Update</Button>
            </>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default TypeFilmDetail;
