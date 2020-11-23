import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Result,
  Skeleton,
  Spin,
  Card,
  Form,
  Input,
  Select,
  Option,
  InputNumber,
} from "antd";
import { get, omit } from "lodash";
import { useDispatch, useSelector } from "react-redux";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 18 },
};

 const TypeFilmDetail =({ id, onClose, openModal })=> {
    const [form] = Form.useForm();

    const closeModal = () => {
        if (typeof openModal === "function") {
          openModal(onClose);
        }
      };

    return (
        <div className="film_type_detail">
      <Card title={!id ? "Create Type Film" : "Type Film Detail & Update"}>
        <Form form={form} {...layout}>
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
            <Input />
          </Form.Item>
          <Form.Item
            label="Discription"
            name="discription"
            rules={[
              {
                required: true,
                message: "Please input Discription",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Key Code"
            name="keycode"
            rules={[
              {
                required: false,
                message: "Please input Key Code",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Films"
            name="films"
            rules={[
              {
                required: true,
                message: "Please choose films",
              },
            ]}
          >
            <Select mode="multiple">
              <Select.Option>Iron Man</Select.Option>
              <Select.Option>Superman</Select.Option>
              <Select.Option>Kẻ Hủy Diệt</Select.Option>
              <Select.Option>Mắt Biếc</Select.Option>
            </Select>
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
    )
}
 
export default TypeFilmDetail;
