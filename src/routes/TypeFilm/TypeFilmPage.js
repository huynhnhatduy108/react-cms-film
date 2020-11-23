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
  Tag,
  Table,
} from "antd";
import TypeFilmDetail from "../../component/TypeFilmDetail/TypeFilmDetail";


class TypeFilm extends Component {
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

  componentDidMount() {

  }

  render() {
    const { onClose, openModal, id } = this.state;

    let data = [
      {
        id: 1,
        name:"Hành Động",
        films: ["Iron Man", "Halo", "Superman"],
        description:"Action",
        keycode:"HD"
      },
      {
        id: 2,
        name:"Khoa Học Viễn Tưởng",
        films: ["Batman", "Wonder woman", "The Flash"],
        description:"Sience fictional",
        keycode:"KHVT"
      },
    ];

    return (
      <div className="container type_film">
        <div className="row">
          <div className="col-4 col_left" hidden={!openModal}>
            <TypeFilmDetail 
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
                      title: "Key Code",
                      key: "keycode",
                      dataIndex: "keycode",
                      render: (keycode) => <Tag key={keycode}>{keycode}</Tag>,
                    },
                    {
                      title: "Discription",
                      dataIndex: "description",
                      key: "description",
                    },
                    {
                      title: "Film",
                      key: "films",
                      dataIndex: "films",
                      render: (films) => (
                        <>
                          {films.map((film) => {
                            let color = film.length > 6 ? "geekblue" : "green";
                            if (film === "loser") {
                              color = "volcano";
                            }
                            return (
                              <Tag color={color} key={film}>
                                {film}
                              </Tag>
                            );
                          })}
                        </>
                      ),
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

export default connect(mapStateToProps, mapDispatchToProps)(TypeFilm);
