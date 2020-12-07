import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Tag,
  Table,
  Input,
  Card,
} from "antd";
import ConfirmDeleteButton from "../../container/ConfirmDelete";
import UserDetail from "../../container/UserDetail/UserDetail";
import UserSelectors from "../../redux/selectors/user/user";
import UserActions from "../../redux/actions/user/user";
import {userRole} from "../../constants";


class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      onClose: false,
      id: null,
      detail:null,
      filter: {
        keyword: "",
        sort: 0,
      },
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

  _onUpdate = (id) => {
    this.setState({
      openModal: true,
      id:id
    });
  };

  _handleDelete = (e, id) => {
    e.stopPropagation();
    this.props.onDelete({id});
  };

  onSearch = (e) => {
    this.setState({
      filter: {
        keyword: e.target.value,
      },
    });
  };

  componentDidMount() {
    this.props.onGetList();
    this.props.onClearState();
  }

  render() {
    const { listItems } = this.props;
    const { onClose, openModal, id, filter } = this.state;
    const { keyword, sort } = filter;
    var {users} =listItems;
    

    var data = [
      {
        _id: 1,
        name: "Nhat Duy",
        email: "duy@gmail.com",
        username: "duy123456",
        role: "USER",
      },
      {
        _id: 2,
        name: "Dang Khoa",
        username: "khoa123456",
        email: "khoa@gmail.com",
        role: "USER",
      },
      {
        _id: 3,
        name: "Nhat Duy",
        email: "duy@gmail.com",
        username: "duy123456",
        role: "USER",
      },
      {
        _id: 4,
        name: "Dang Khoa",
        username: "khoa123456",
        email: "khoa@gmail.com",
        role: "USER",
      },
      {
        _id: 5,
        name: "Nhat Duy",
        email: "duy@gmail.com",
        username: "duy123456",
        role: "USER",
      },
      {
        _id: 6,
        name: "Dang Khoa",
        username: "khoa123456",
        email: "khoa@gmail.com",
        role: "USER",
      },
      {
        _id: 7,
        name: "Nhat Duy",
        email: "duy@gmail.com",
        username: "duy123456",
        role: "USER",
      },
      {
        _id: 8,
        name: "Dang Khoa",
        username: "khoa123456",
        email: "khoa@gmail.com",
        role: "ADMIN",
      },
      {
        _id: 9,
        name: "Nhat Duy",
        email: "duy@gmail.com",
        username: "duy123456",
        role: "USER",
      },
      {
        _id: 10,
        name: "Dang Khoa",
        username: "khoa123456",
        email: "khoa@gmail.com",
        role: "ADMIN",
      },
      {
        _id: 11,
        name: "Nhat Duy",
        email: "duy@gmail.com",
        username: "duy123456",
        role: "USER",
      },
      {
        _id: 12,
        name: "Dang Khoa",
        username: "khoa123456",
        email: "khoa@gmail.com",
        role: "ADMIN",
      },
      {
        _id: 13,
        name: "Nhat Duy",
        email: "duy@gmail.com",
        username: "duy123456",
        role: "USER",
      },
      {
        _id: 14,
        name: "Dang Khoa",
        username: "khoa123456",
        email: "khoa@gmail.com",
        role: "ADMIN",
      },
      {
        _id: 15,
        name: "Dang Khoa15",
        username: "khoa123456",
        email: "khoa@gmail.com",
        role: "ADMIN",
      },
    ];

    if (keyword) {
      users = users.filter((item) => {
        return item.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }

    return (
      <div className="container user">
        <div className="row ">
          <div className="col-4 col_left" hidden={!openModal}>
            <UserDetail
              openModal={(value) => {
                this.setState({
                  openModal: value,
                  id:null
                });
              }}
              onClose={onClose}
              id={id}
            />
          </div>
          <div className={openModal === true ? "col-8" : "col-12"}>
            <div className="btn_left" style={{ textAlign: "left" }}>
              <div className="row">
                <div className="btn_left col-2" style={{ textAlign: "left" }}>
                  <Button
                    type="primary"
                    style={{ marginBottom: "10px" }}
                    onClick={this._openModal}
                    hidden={openModal}
                  >
                    Create new User
                  </Button>
                </div>
                <div className="col-6">
                  <Input.Search
                    onChange={this.onSearch}
                    placeholder="input keywork"
                    enterButton
                  />
                </div>
              </div>
              <Card title={"User Data"}>
                <Table
                  rowKey={(i) => i._id}
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
                      render: (role) =>{
                        let tag;
                        userRole.map(item =>{
                          if(item.id===role) return tag = item
                        })
                        return <Tag key={role}>{tag.role}</Tag>;
                      },
                    },
                    {
                      title: "Action",
                      key: "_id",
                      dataIndex: "_id",
                      render: (id) => (
                        <>
                          <Button
                            type="default"
                            onClick={() => this._onUpdate(id)}
                          >
                            Update
                          </Button>
                          <ConfirmDeleteButton
                            onConfirm={(e) => this._handleDelete(e, id)}
                          />
                        </>
                      ),
                    },
                  ]}
                  dataSource={users}
                  pagination={{
                    pageSize:
                      parseInt(this.state.pagination.pageSize, 10) || 10,
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
  return {
    filmState: UserSelectors.getState(state),
    listItems: UserSelectors.getList(state),
    metadata: UserSelectors.getMetadata(state),
    apiResultGetList: UserSelectors.apiResultGetList(state),
  };
};

const mapDispatchToProps = {
  onGetList: UserActions.onGetList,
  onClearDetail: UserActions.onClearDetail,
  onClearState: UserActions.onClearState,
  onDelete: UserActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
