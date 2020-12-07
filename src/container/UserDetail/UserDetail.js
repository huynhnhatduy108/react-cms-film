import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Form, Input, Select } from "antd";
import { get, omit } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import UserActions from "../../redux/actions/user/user";
import UserSelectors from "../../redux/selectors/user/user";
import { parse } from "query-string";

const layout = {
  labelCol: { offset: 2, span: 10 },
  wrapperCol: { offset: 2, span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 18 },
};

const UserDetail = ({ id, onClose, openModal }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(UserActions.onGetDetail(id));
    }
    return () => {
      form.resetFields();
    };
  }, [id]);
  const detail = useSelector(UserSelectors.getDetail);
  const userDetail = get(detail, "user", {});
  console.log("userDetail", userDetail);

  const closeModal = () => {
    if (typeof openModal === "function") {
      openModal(onClose);
    }
  };

  const creatFilm = () => {
    const params = {
      name: name,
      description: description,
      email: email,
      password: password,
      role: role,
      username: userName,
    };
    dispatch(UserActions.onCreate({ params }));
    form.resetFields();
  };

  const updateFilm = () => {
    const params = {
      name: name,
      description: description,
      email: email,
      password: password,
      role: role,
      username: userName,
    };
    if (id) {
      dispatch(UserActions.onUpdate({ id, params }));
      form.resetFields();
    }
  };

  return (
    <div className="user_detail">
      <Card title={!id ? "Create User" : "User Detail & Update"}>
        <Form
          form={form}
          {...layout}
          initialValues={{
            ...userDetail,
          }}
          layout="vertical"
        >
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
            <Input onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="User Name"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input User Name",
              },
            ]}
          >
            <Input
              disabled={id ? true : false}
              onChange={(e) => setUserName(e.target.value)}
            />
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
            <Input
             disabled={id ? true : false}
             onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Password"
            // name="password"
            rules={[
              {
                required: true,
                message: "Please input Password",
              },
            ]}
          >
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
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
            <Select onChange={(value) => setRole(value)}>
              <Select.Option key={0} value={0}>
                USER
              </Select.Option>
              <Select.Option key={1} value={1}>
                MANAGERMENT
              </Select.Option>
              <Select.Option key={2} value={2}>
                ADMIN
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <>
              <Button type="danger" onClick={closeModal}>
                Close
              </Button>
              <Button type="default" onClick={creatFilm}>
                Create
              </Button>
              <Button type="primary" onClick={updateFilm}>
                Update
              </Button>
            </>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserDetail;
