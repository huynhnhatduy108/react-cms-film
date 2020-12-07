import React, { Component } from "react";
import Footer from "../../component/Footer/index";
import {
  Button,
  Result,
  Skeleton,
  Spin,
  Card,
  Form,
  Input,
  Select,
  Tag,
  Table,
} from "antd";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

class login extends Component {
  render() {
    return (
      <div className="row login">
        <div className="col-3"></div>
        <div className="col-6">
          <Card title={"Login"}>
            <Form {...layout}>
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
              <Form.Item>
                <>
                  <Button type="primary">Login</Button>
                </>
              </Form.Item>
            </Form>
          </Card>
        </div>
        <div className="col-3"></div>
      </div>
    );
  }
}

export default login;
