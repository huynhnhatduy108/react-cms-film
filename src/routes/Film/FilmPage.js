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
import ConfirmDeleteButton from "../../container/ConfirmDelete";
import FilmSelectors from "../../redux/selectors/film/film";
import FilmActions from "../../redux/actions/film/film";
import FilmDetail from "../../container/FilmDetail/FilmDetail";
import TypeFilmActions from "../../redux/actions/type/typefilm";
import TypeFilmSelectors from "../../redux/selectors/type/type";


class FilmPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      onClose: false,
      modalImages: null,
      filter:{ 
        keyword: "",
        sort:0,
      },
      id: null,
      pagination: {
        pageSize: 5,
        page: 1,
      },
    };
  }

  _openModal = () => {
    this.setState({
      openModal: !this.state.openModal,
      id: null,
    });
    
  };

  _onUpdate = (e, id) => {
    e.stopPropagation();
    this.setState({
      openModal: true,
      id,
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
    this.props.onGetlistTypeFilm();
  }

  render() {
    const { filmState:{loading},listItems, listTypeFilm ,isLogin } = this.props;
    const { onClose, openModal, id, filter } = this.state;
    const {types} = listTypeFilm;
    var { films } = listItems;
    const {keyword, sort} = filter;
    console.log("isLoginFilmPage",isLogin);

    var data = [
      {
        _id: 1,
        name: "Kẻ Hủy Diệt",
        types: ["Khoa Học Viễn Tưởng", "Halo", "Hành Động"],
        price: 16000,
        description: "Thứ óc chó",
        image:
          "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTNbBcJ-d3sg2cPl0bzW3z7joZ3b5qofYFsewL1ubd8gXg9yjmF",
      },
      {
        _id: 2,
        name: "Iron man",
        description: "Iron Man (tên thật là Tony Stark)",
        types: ["Khoa Học Viễn Tưởng", "War", "Hành Động", "Hài hước"],
        price: 30000,
        image:
          "https://upload.wikimedia.org/wikipedia/vi/e/e0/Iron_Man_bleeding_edge.jpg",
      },
      {
        _id: 3,
        name: "Superman",
        description: "Superman (tên thật là Siêu Nhân)",
        types: ["Khoa Học Viễn Tưởng", "War", "Hành Động", "Hoạt Hình"],
        price: 15000,
        image:
          "https://znews-photo.zadn.vn/w660/Uploaded/tmuizd/2014_07_05/nhan_1.jpg",
      },
      {
        _id: 4,
        name: "Mắt Biếc",
        description: "Nguyễn Nhật Ánh",
        types: ["Khóc", "Tình Cảm", "Hài hước"],
        price: 56000,
        image:
          "https://upload.wikimedia.org/wikipedia/vi/4/42/%C3%81p_ph%C3%ADch_phim_M%E1%BA%AFt_bi%E1%BA%BFc.jpg",
      },
      {
        _id: 5,
        name: "Batman",
        description: "Iron Man (tên thật là Người dơi)",
        types: ["Khoa Học Viễn Tưởng", "War", "Hành Động", "Hài hước"],
        price: 100000,
        image:
          "https://upload.wikimedia.org/wikipedia/vi/thumb/5/5a/Batman-Arkham-Origins-Logo.jpg/300px-Batman-Arkham-Origins-Logo.jpg",
      },
      {
        _id: 6,
        name: "Fast and Furious",
        description: "Nhanh và tốc độ",
        types: ["Khoa Học Viễn Tưởng", "War", "Hành Động", "Hài hước"],
        price: 53000,
        image:
          "https://www.phimoxy.com/wp-content/uploads/2019/09/qua-nhanh-qua-nguy-hiem-9-fast-furious-presents-hobbs-shaw-2019-poster.jpg",
      },
    ];

    if(keyword){
      films=films.filter((item)=>{
        return item.name.toLowerCase().indexOf(keyword)!== -1;
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
      <div className="container film">
        <div className="row">
          <div className="col-4 col_left" hidden={!openModal}>
            <FilmDetail
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
            <div className="row">
              <div className="btn_left col-2" style={{ textAlign: "left" }}>
                <Button
                  type="primary"
                  style={{ marginBottom: "10px" }}
                  onClick={this._openModal}
                  hidden={openModal}
                >
                  Create new Film
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
            <Card title={"Film Data"}>
              <Table
                rowKey={(i) => i._id}
                columns={[
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
                    render: (image) => (
                      <img src={image} alt="" width={"100px"} />
                    ),
                  },
                  {
                    title: "Type",
                    key: "types",
                    dataIndex: "types",
                    render: (listtypes) => (
                      <>
                        {listtypes.map((type, index) => {
                          let color = index %3 === 0 ? "geekblue" : index %2 === 0 ? "green":"volcano";
                          let tagName;
                          if(types){ 
                            types.map((item)=>{
                              if(item._id ===type) return tagName = item.name;
                           })
                          }
                          return (
                            <Tag color={color} key={type}>
                              {tagName}
                            </Tag>
                          );
                        })}
                      </>
                    ),
                  },
                  {
                    title: "Action",
                    key: "_id",
                    dataIndex: "_id",
                    render: (id) => (
                      <>
                        <Button
                          type="default"
                          onClick={(e) => this._onUpdate(e, id)}
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
                dataSource={films}
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
    listTypeFilm: TypeFilmSelectors.getList(state),
  };
};

const mapDispatchToProps = {
  onGetList: FilmActions.onGetList,
  onClearDetail: FilmActions.onClearDetail,
  onClearState: FilmActions.onClearState,
  onDelete: FilmActions.onDelete,
  onGetlistTypeFilm :TypeFilmActions.onGetList,

};

export default connect(mapStateToProps, mapDispatchToProps)(FilmPage);
