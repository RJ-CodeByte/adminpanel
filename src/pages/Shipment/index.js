import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "react-bootstrap/Pagination";
import { Button } from "react-bootstrap";
import AlertModal from "../../components/common/Modal";
import { Link, useNavigate } from "react-router-dom";
import { deleteShipment, shipmentListAction } from "../../Redux/ShipmentSlice";
import moment from "moment";
import "../../scss/formStyle.scss";
import { ToastContainer, toast } from "react-toastify";

export default function Shipment() {
  const dispatch = useDispatch();
  const shipmentList = useSelector((state) => state.shipment.shipmentList);
  const totalRecords = useSelector((state) => state.shipment.totalRecords);
  const shipmentDeleted = useSelector(
    (state) => state.shipment.shipmentDeleted
  );
  const navigation = useNavigate();

  const [deleteId, setDeleteId] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    console.log("id", id);
    setShow(true);
    setDeleteId(id);
  };

  const [state, setState] = useState({
    data: [],
    length: 10,
    activePage: 1,
    selectedLength: 10,
    totalRecords: 0,
    totalPages: 0,
  });

  useEffect(() => {
    const totalPage = Math.ceil(totalRecords / state.length);
    // console.log("total records", totalpage);
    setState((prev) => ({
      ...prev,
      data: shipmentList,
      totalPages: totalPage,
    }));
  }, [shipmentList]);
  useEffect(() => {
    let payload = {
      start: state.activePage == 1 ? 0 : state.activePage,
      length: state.length,
      search: "",
    };
    dispatch(shipmentListAction(payload))
      .then((res) => setState((prev) => ({ ...prev, data: res.data.data })))
      .catch((err) => console.log(err));
  }, [state.length, shipmentDeleted]);

  const handlePageChange = (pageNumber) => {
    setState((prev) => ({ ...prev, activePage: pageNumber }));
    console.log(pageNumber);
    let data = {
      start: Number(pageNumber - 1) * state.length,
      length: state.length,
      search: "",
    };

    dispatch(shipmentListAction(data))
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
    dispatch(deleteShipment(payload))
      .then((res) => toast(res?.message))
      .catch((e) => alert(e));
    setShow(false);
  };

  const onSearchHandler = (e) => {
    console.log(e.target.value);
    let data = {
      start: 0,
      length: state.length,
      search: e.target.value,
    };

    dispatch(shipmentListAction(data))
      .then((res) =>
        setState((prev) => ({
          ...prev,
          data: res.data.data,
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
    setState((prev) => ({ ...prev, length: e.target.value, activePage: 1 }));
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
        style={{ display: "flex", justifyContent: "space-between", margin: 10 }}
      >
        <input
          placeholder="Searth the content..."
          type="text"
          name="text"
          className="search"
          onChange={(e) => onSearchHandler(e)}
        />
        <p>Total Records {totalRecords}</p>
        <Link class="btn btn-primary" to="add" style={{ height: 40 }}>
          Add
        </Link>
      </div>
      <div className="h-100 d-flex flex-column m-2">
        <div className="row justify-content-center">
          <div className="">
            <div className="react-bootstrap-table">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>
                      Patient Name<span class="order-4"></span>
                    </th>
                    <th>
                      Username<span class="order-4"></span>
                    </th>
                    <th> Medicaiton Name</th>
                    <th> Shipment Date</th>
                    <th> Next Shipment Date</th>
                    <th> Track URL</th>
                    <th> Dosage</th>
                    <th> Address</th>
                    <th> Action</th>
                  </tr>
                </thead>
                <tbody>
                  {state.data.length > 0 ? (
                    state.data?.map((item) => {
                      const {
                        _id,
                        patinetName,
                        ownerName,
                        medicationName,
                        deliveryDate,
                        nextDeliveryDate,
                        trackUrl,
                        dosage,
                        addressLine,
                      } = item;
                      const nextdiliveryDate = moment(nextDeliveryDate)
                        .format("DD-MM-YYYY")
                        .toString();
                      const diliveryDate = moment(deliveryDate)
                        .format("DD-MM-YYYY")
                        .toString();

                      return (
                        <tr key={_id} className="list-group-obj">
                          <td>
                            <div className="align-items-center d-flex flex-wrap w-100 justify-content-center">
                              {patinetName}
                            </div>
                          </td>
                          <td>
                            <div className="align-items-center d-flex flex-wrap w-100 justify-content-center">
                              {ownerName}
                            </div>
                          </td>
                          <td>
                            <div className="align-items-center d-flex flex-wrap w-100 justify-content-center">
                              {medicationName}
                            </div>
                          </td>
                          <td>
                            <div className="align-items-center d-flex flex-wrap w-100 justify-content-center">
                              {diliveryDate}
                            </div>
                          </td>
                          <td>
                            <div className="align-items-center d-flex flex-wrap w-100 justify-content-center">
                              {nextdiliveryDate}
                            </div>
                          </td>
                          <td>
                            <div className="align-items-center d-flex flex-wrap w-100 justify-content-center">
                              {trackUrl}
                            </div>
                          </td>
                          <td>
                            <div className="align-items-center d-flex flex-wrap w-100 justify-content-center">
                              {dosage}
                            </div>
                          </td>
                          <td>
                            <div className="align-items-center d-flex flex-wrap w-100 justify-content-center">
                              {addressLine}
                            </div>
                          </td>
                          <td>
                            <Button
                              variant="primary"
                              onClick={() => {
                                navigation(`edit/${_id}`);
                              }}
                            >
                              Edit
                            </Button>{" "}
                            <Button
                              variant="danger"
                              onClick={() => handleShow(_id)}
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
                marginLeft: 1,
                flexDirection: "row-reverse",
              }}
            >
              <Pagination className="px-4">{renderPagination()}</Pagination>
              {DataLength()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
