import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Button, Card, Form, Input } from "antd";
import AuthSelectors from "../../redux/selectors/auth/auth";
import AuthActions from "../../redux/actions/auth/auth";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

class register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      name: "",
    };
  }

  handleLogin = () => {};
  hanleRegister = () => {
    const { username, password, email, name } = this.state;
    const params = {
      username,
      password,
      email,
      name,
    };
    console.log(params);
    this.props.onRegister(params);
  };

  render() {
    // const {username, email, password} = this.state;
    // console.log("",username,"",email,"",password);

    return (
      <div className="row register" style={{ marginTop: 100 }}>
        <div className="col-3"></div>
        <div className="col-6">
          <Card title={"Register"}>
            <Form {...layout}>
              <Form.Item
                label="Full Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input Name",
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    this.setState({ name: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input username",
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    this.setState({ username: e.target.value });
                  }}
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
                  onChange={(e) => {
                    this.setState({ email: e.target.value });
                  }}
                />
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
                <Input.Password
                  onChange={(e) => {
                    this.setState({ password: e.target.value });
                  }}
                />
              </Form.Item>
              <Form.Item>
                <>
                  <Button type="primary" onClick={this.hanleRegister}>
                    Register
                  </Button>
                  <Button
                    type=""
                    style={{ marginLeft: 10 }}
                    onClick={this.handleLogin}
                  >
                    Login
                  </Button>
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
const mapStateToProps = (state) => {
  return {
    AuthState: AuthSelectors.getState(state),
    // user: AuthSelectors.getUser(state),
    apiResult: AuthSelectors.apiResult(state),
  };
};

const mapDispatchToProps = {
  onRegister: AuthActions.onRegister,
  onClearState: AuthActions.onClearState,
};

export default connect(mapStateToProps, mapDispatchToProps)(register);
