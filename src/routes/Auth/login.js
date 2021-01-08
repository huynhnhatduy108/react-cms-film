import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  Button,
  Card,
  Form,
  Input,
} from "antd";
import AuthSelectors from "../../redux/selectors/auth/auth";
import AuthActions from "../../redux/actions/auth/auth";

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const params = {
      username,
      password,
    };
    this.props.onLogin(params);
  };

  hanleRegister = () => {
    return (
        <Redirect to="/register" />
    );
  };

  render() {
    const {AuthState:{loading}, user, apiResult} =this.props;

    if(user && user.token){
      localStorage.setItem("user", user);
    }

    return (
      <div className="row login" style={{ marginTop: 100 }}>
        <div className="col-3"></div>
        <div className="col-6">
          <Card title={"Login"}>
            <Form {...layout}>
              <Form.Item
                label="User name"
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
                  <Button type="primary" onClick={this.handleLogin}>
                    Login
                  </Button>
                  <Button
                    type=""
                    style={{ marginLeft: 10 }}
                    onClick={this.hanleRegister}
                  >
                    Register
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
    user: AuthSelectors.getUser(state),
    apiResult: AuthSelectors.apiResult(state),
  };
};

const mapDispatchToProps = {
  onLogin: AuthActions.onLogin,
  onClearState: AuthActions.onClearState,
};

export default connect(mapStateToProps, mapDispatchToProps)(login);
