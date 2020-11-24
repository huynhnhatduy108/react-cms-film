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

const UserDetail = ({ id, onClose, openModal }) => {
  const [form] = Form.useForm();

  const closeModal = () => {
    if (typeof openModal === "function") {
      openModal(onClose);
    }
  };

  return (
    <div className="user_detail">
      <Card title={!id ? "Create User" : "User Detail & Update"}>
        <Form form={form} {...layout}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input Name User",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input Email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input Password",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: "Please choose role",
              },
            ]}
          >
            <Select>
              <Select.Option value="USER">USER</Select.Option>
              <Select.Option value="ADMIN">ADMIN</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
          <>
            <Button type="danger" onClick={closeModal}>
              Close
            </Button>
            <Button type="default">Create</Button>
            <Button type="primary">Update</Button>
          </>
        </Form.Item>
        </Form>  
      </Card>
    </div>
  );
};

export default UserDetail;
