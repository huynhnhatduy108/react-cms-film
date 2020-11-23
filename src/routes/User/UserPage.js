import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Result,
  Skeleton,
  Spin,
  Card,
  Form,
  Input,
  Select,
  Pagination,
  Tag,
  Table,
} from "antd";
import UserDetail from "../../component/UserDetail/UserDetail";

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      onClose: false,
      id: null,
      pagination: {
        pageSize: 10,
        page: 1,
      },
    };
  }

  _openModal = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  };

  openModal = (value) => {
    this.setState({
      openModal: value,
    });
  };

  _onUpdate = (id) => {
    this.setState({
      openModal: true,
    });
    console.log("Update_id", id);
  };

  _onDelete = (id) => {
    console.log("Delete_id", id);
  };

  componentDidMount() {}

  render() {
    const { onClose, openModal, id } = this.state;

    let data = [
      {
        id: 1,
        name: "Nhat Duy",
        email: "duy@gmail.com",
        username: "duy123456",
        role: "USER",
      },
      {
        id: 2,
        name: "Dang Khoa",
        username: "khoa123456",
        email: "khoa@gmail.com",
        role: "USER",
      },
      {
        id: 3,
        name: "Nhat Duy",
        email: "duy@gmail.com",
        username: "duy123456",
        role: "USER",
      },
      {
        id: 4,
        name: "Dang Khoa",
        username: "khoa123456",
        email: "khoa@gmail.com",
        role: "USER",
      },
      {
        id: 5,
        name: "Nhat Duy",
        email: "duy@gmail.com",
        username: "duy123456",
        role: "USER",
      },
      {
        id: 6,
        name: "Dang Khoa",
        username: "khoa123456",
        email: "khoa@gmail.com",
        role: "USER",
      },
      {
        id: 7,
        name: "Nhat Duy",
        email: "duy@gmail.com",
        username: "duy123456",
        role: "USER",
      },
      {
        id: 8,
        name: "Dang Khoa",
        username: "khoa123456",
        email: "khoa@gmail.com",
        role: "ADMIN",
      },
      {
        id: 9,
        name: "Nhat Duy",
        email: "duy@gmail.com",
        username: "duy123456",
        role: "USER",
      },
      {
        id: 10,
        name: "Dang Khoa",
        username: "khoa123456",
        email: "khoa@gmail.com",
        role: "ADMIN",
      },
      {
        id: 11,
        name: "Nhat Duy",
        email: "duy@gmail.com",
        username: "duy123456",
        role: "USER",
      },
      {
        id: 12,
        name: "Dang Khoa",
        username: "khoa123456",
        email: "khoa@gmail.com",
        role: "ADMIN",
      },
      {
        id: 13,
        name: "Nhat Duy",
        email: "duy@gmail.com",
        username: "duy123456",
        role: "USER",
      },
      {
        id: 14,
        name: "Dang Khoa",
        username: "khoa123456",
        email: "khoa@gmail.com",
        role: "ADMIN",
      },
      {
        id: 15,
        name: "Dang Khoa15",
        username: "khoa123456",
        email: "khoa@gmail.com",
        role: "ADMIN",
      },
    ];
    return (
      <div className="container user">
        <div className="row ">
          <div className="col-4 col_left" hidden={!openModal}>
            <UserDetail
              openModal={(value) => this.openModal(value)}
              onClose={onClose}
              id={id}
            />
          </div>
          <div className={openModal === true ? "col-8" : "col-12"}>
            <div className="btn_left" style={{ textAlign: "left" }}>
              <Button
                type="primary"
                style={{ marginBottom: "10px" }}
                onClick={this._openModal}
                hidden={openModal}
              >
                Create new user
              </Button>
              <Card title={"Film Data"}>
                <Table
                  rowKey={(i) => i.id}
                  columns={[
                    {
                      title: "Name",
                      dataIndex: "name",
                      key: "name",
                    },
                    {
                      title: "Email",
                      dataIndex: "email",
                      key: "email",
                    },
                    {
                      title: "Username",
                      dataIndex: "username",
                      key: "username",
                    },
                    {
                      title: "Role",
                      key: "role",
                      dataIndex: "role",
                      render: (role) => <Tag key={role}>{role}</Tag>,
                    },
                    {
                      title: "Action",
                      key: "id",
                      dataIndex: "id",
                      render: (id) => (
                        <>
                          <Button
                            type="default"
                            onClick={() => this._onUpdate(id)}
                          >
                            Update
                          </Button>
                          <Button
                            type="danger"
                            onClick={() => this._onDelete(id)}
                          >
                            Delete
                          </Button>
                        </>
                      ),
                    },
                  ]}
                  dataSource={data}
                  pagination={{
                    pageSize: parseInt(this.state.pagination.pageSize, 10) || 10,
                  }}
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // return {
  //   filmState: FilmSelectors.getState(state),
  //   listItems: FilmSelectors.getList(state),
  //   metadata: FilmSelectors.getMetadata(state),
  //   apiResultGetList: FilmSelectors.apiResultGetList(state),
  // };
};

const mapDispatchToProps = {
  // onGetList: FilmActions.onGetList,
  // onClearDetail: FilmActions.onClearDetail,
  // onClearState: FilmActions.onClearState,
  // onDelete: FilmActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
