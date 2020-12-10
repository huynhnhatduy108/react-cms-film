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
import ConfirmDeleteButton from "../../container/ConfirmDelete";
import TypeFilmDetail from "../../container/TypeFilmDetail/TypeFilmDetail";
import TypeFilmSelectors from "../../redux/selectors/type/type";
import TypeFilmActions from "../../redux/actions/type/typefilm";
import FilmActions from "../../redux/actions/film/film";


class TypeFilm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      onClose: false,
      id: null,
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
      id:id,
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
    this.props.onClearState();
    this.props.onGetList();
    this.props.onGetlistFilm();
  }

  render() {
    const { onClose, openModal, id, filter } = this.state;
    const { keyword, sort } = filter;
    const { typeFilmState:{loading},listItems } = this.props;
    var {types} =listItems;
    // console.log("Types",types);

    var data = [
      {
        _id: 1,
        name: "Hành Động",
        films: ["Iron Man", "Halo", "Superman"],
        description: "Action",
        keycode: "HD",
      },
      {
        _id: 2,
        name: "Khoa Học Viễn Tưởng",
        films: ["Batman", "Wonder woman", "The Flash"],
        description: "Sience fictional",
        keycode: "KHVT",
      },
    ];

    if (keyword) {
      types = types.filter((item) => {
        return item.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }

    if (loading) {
      return (
        <div className="container" >
          <Spin tip="Loading..." style={{ marginTop:200 }}></Spin>
        </div>
      );
    }

    return (
      <div className="container type_film">
        <div className="row">
          <div className="col-4 col_left" hidden={!openModal}>
            <TypeFilmDetail
              openModal={(value) => {
                this.setState({
                  openModal: value,
                  id: null,
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
                    Create new Type Film
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
              <Card title={"Type Film Data"}>
                <Table
                  rowKey={(i) => i._id}
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
                  dataSource={types}
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
    typeFilmState: TypeFilmSelectors.getState(state),
    listItems: TypeFilmSelectors.getList(state),
    metadata: TypeFilmSelectors.getMetadata(state),
    apiResultGetList: TypeFilmSelectors.apiResultGetList(state),
  };
};

const mapDispatchToProps = {
  onGetList: TypeFilmActions.onGetList,
  onClearDetail: TypeFilmActions.onClearDetail,
  onClearState: TypeFilmActions.onClearState,
  onDelete: TypeFilmActions.onDelete,
  onGetlistFilm :FilmActions.onGetList,
};

export default connect(mapStateToProps, mapDispatchToProps)(TypeFilm);
