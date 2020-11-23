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
// import { map } from "lodash";
import FilmSelectors from "../../redux/selectors/film/film";
import FilmActions from "../../redux/actions/film/film";
import FilmDetail from "../../component/FilmDetail/FilmDetail";

class FilmPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      onClose: false,
      modalImages: null,
      id: null,
      pagination: {
        pageSize: 5,
        page: 1,
      },
    };
  }

  _openModal = () => {
    this.setState({
      openModal:!this.state.openModal,
    });
  };

  openModal = (value) => {
    this.setState({
      openModal:value,
    });
  };

  _onUpdate = (id) => {
    this.setState({
      openModal:true,
    })
    console.log("Update_id",id);
  };

  _onDelete = (id) => {
    console.log("Delete_id",id);
  };

  componentDidMount() {
    this.props.onClearState();
    this.props.onGetList();
  }

  render() {
    const { listItems } = this.props;
    const { onClose, openModal, id } = this.state;
    console.log("data", listItems);

    let data = [
      {
        id:1,
        name:"Kẻ Hủy Diệt",
        types: ["Khoa Học Viễn Tưởng", "Halo", "Hành Động"],
        price: 16000,
        description:"Thứ óc chó",
        image:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTNbBcJ-d3sg2cPl0bzW3z7joZ3b5qofYFsewL1ubd8gXg9yjmF",
      },
      {
        id:2,
        name:"Iron man",
        description:"Iron Man (tên thật là Tony Stark)",
        types: ["Khoa Học Viễn Tưởng", "War", "Hành Động", "Hài hước"],
        price: 30000,
        image:"https://upload.wikimedia.org/wikipedia/vi/e/e0/Iron_Man_bleeding_edge.jpg",
      }
    ];
    // listItems.map((item) => {
    //   data.push({
    //     name:item.name,
    //     description:item.description,
    //     types: item.types,
    //     price: item.price,
    //     image: item.image,
    //   })
    // })

    return (
      <div className="container film">
        <div className="row">
          <div className="col-4 col_left" hidden={!openModal}>
            <FilmDetail
              openModal={(value)=>this.openModal(value)}
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
                Create new Film
              </Button>
            </div>
            <Card title={"Film Data"}>
              <Table
                rowKey={(i) => i.id}
                columns={ [
                  {
                    title: "Name",
                    dataIndex: "name",
                    key: "name",
                  },
                  {
                    title: "Discription",
                    dataIndex: "description",
                    key: "description",
                  },
                  {
                    title: "Price",
                    dataIndex: "price",
                    key: "price",
                  },
                  {
                    title: "Image",
                    dataIndex: "image",
                    key: "image",
                    render: (image) => <img src={image} alt="" width={"100px"} />,
                  },
                  {
                    title: "Type",
                    key: "types",
                    dataIndex: "types",
                    render: (types) => (
                      <>
                        {types.map((type) => {
                          let color = type.length > 5 ? "geekblue" : "green";
                          if (type === "loser") {
                            color = "volcano";
                          }
                          return (
                            <Tag color={color} key={type}>
                              {type}
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
                        <Button type="default" onClick={()=>this._onUpdate(id)}>
                          Update
                        </Button>
                        <Button type="danger" onClick={()=>this._onDelete(id)}>
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filmState: FilmSelectors.getState(state),
    listItems: FilmSelectors.getList(state),
    metadata: FilmSelectors.getMetadata(state),
    apiResultGetList: FilmSelectors.apiResultGetList(state),
  };
};

const mapDispatchToProps = {
  onGetList: FilmActions.onGetList,
  onClearDetail: FilmActions.onClearDetail,
  onClearState: FilmActions.onClearState,
  onDelete: FilmActions.onDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmPage);
