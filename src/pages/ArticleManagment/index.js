import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { articleListAction, deleteArticle } from "../../Redux/ArticleSlice";
import { Pagination } from "react-bootstrap";
import { API_IMAGE_BASE } from "../../constants";
import { Button } from "react-bootstrap";
import AlertModal from "../../components/common/Modal";
import { Link, useNavigate } from "react-router-dom";

export default function ArticleManagement() {
  const dispatch = useDispatch();
  const articleList = useSelector((state) => state.article.articleList);
  const totalRecords = useSelector((state) => state.article.totalRecords);
  const articleDeleted = useSelector((state) => state.article.articleDeleted);
  const navigation = useNavigate();

  const [deleteId, setDeleteId] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setDeleteId(id);
  };

  const [state, setState] = useState({
    data: [],
    length: 10,
    activePage: 1,
    totalRecords: 0,
    selectedLength: 10,
    totalPages: 0,
  });

  useEffect(() => {
    const totalPage = Math.ceil(totalRecords / state.length);

    setState((prev) => ({
      ...prev,
      data: articleList,
      totalPages: totalPage,
    }));
  }, [articleList]);

  useEffect(() => {
    let data = {
      start: state.activePage == 1 ? 0 : state.activePage,
      length: state.length,
      search: "",
    };
    dispatch(articleListAction(data))
      .then((res) =>
        setState((prev) => ({
          ...prev,
          data: res.data.data,
          totalRecords: res.data.recordsTotal,
        }))
      )
      .catch((err) => console.log(err));
  }, [state.length, articleDeleted]);

  const handlePageChange = (pageNumber) => {
    setState((prev) => ({ ...prev, activePage: pageNumber }));
    let data = {
      start: (pageNumber - 1) * state.length,
      length: state.length,
      search: "",
    };

    dispatch(articleListAction(data))
      .then((res) =>
        setState((prev) => ({
          ...prev,
          data: res.data.data,
        }))
      )
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    let payload = {
      _id: deleteId,
    };
    // alert("Are You sure you want to delete");
    dispatch(deleteArticle(payload))
      .then((res) => alert(res?.message))
      .catch((e) => alert(e));
    setShow(false);
  };

  const onSearchHandler = (e) => {
    // console.log(e.target.value);
    let data = {
      start: 0,
      length: state.length,
      search: e.target.value,
    };

    dispatch(articleListAction(data))
      .then((res) =>
        setState((prev) => ({
          ...prev,
          data: res.data.data,
          totalRecords: res.data.recordsTotal,
        }))
      )
      .catch((err) => console.log(err));
  };

  const renderPagination = () => {
    const item = [];
    for (let number = 1; number <= state.totalPages; number++) {
      item.push(number);
    }
    return item.map((_, index) => {
      return (
        <Pagination.Item
          activeLabel=""
          onClick={() => handlePageChange(index + 1)}
          key={index}
          active={index + 1 === state.activePage}
        >
          {index + 1}
        </Pagination.Item>
      );
    });
  };

  const onLengthChange = (e) => {
    console.log(e.target.value);
    setState((prev) => ({ ...prev, length: e.target.value }));
  };
  const DataLength = () => {
    return (
      <>
        <select
          name="selectedLength"
          style={{ height: 40, width: 40 }}
          value={state?.length}
          onChange={(e) => onLengthChange(e)}
        >
          {[10, 20, 30]?.map((obj) => {
            return <option value={obj}>{obj}</option>;
          })}
        </select>
      </>
    );
  };
  return (
    <>
      {show && (
        <AlertModal
          show={show}
          handleClose={handleClose}
          handleSave={handleDelete}
        />
      )}
      <div
        className="m-4"
        style={{ display: "flex", justifyContent: "space-between", margin: 20 }}
      >
        <div class="form-group has-search">
          <span class="fa fa-search form-control-feedback"></span>
          <input
            class="form-control"
            placeholder="Search"
            type="text"
            name="text"
            onChange={(e) => onSearchHandler(e)}
          />
        </div>

        <p>Total Records {totalRecords}</p>

        <Link className="btn btn-primary" to="add">
          Add
        </Link>
      </div>
      <div className="h-100 d-flex flex-column m-4">
        <div className="row justify-content-center">
          <div className="react-bootstrap-table">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>
                    Image<span></span>
                  </th>
                  <th>
                    Title<span></span>
                  </th>
                  <th> Action</th>
                </tr>
              </thead>
              <tbody>
                {/* {console.log(state.data.length != null ? true : false)} */}
                {state.data.length > 0 ? (
                  state.data.map((obj) => {
                    return (
                      <tr key={obj.id} className="list-group-obj">
                        <td className="font-weight-bold pr-2">
                          <div className="align-items-center d-flex flex-wrap w-100 justify-content-center">
                            <img
                              src={API_IMAGE_BASE + "article/" + obj.image}
                              height="50"
                              width="50"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="align-items-center d-flex flex-wrap w-100 justify-content-center">
                            {obj.title}
                          </div>
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={() => {
                              navigation(`edit/${obj._id}`);
                            }}
                          >
                            Edit
                          </Button>{" "}
                          <Button
                            variant="danger"
                            onClick={() => handleShow(obj._id)}
                          >
                            Delete
                          </Button>{" "}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      data-toggle="collapse"
                      className="react-bs-table-no-data"
                      colspan="9"
                    >
                      <h1 style={{ textAlign: "center" }}>
                        !! No Data Avilable !!
                      </h1>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <Pagination className="px-4">{renderPagination()}</Pagination>
            {DataLength()}
          </div>
        </div>
      </div>
    </>
  );
}
