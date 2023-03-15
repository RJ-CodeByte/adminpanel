import React, { useEffect, useState } from "react";
import { RenderInput } from "../../../components/common/FormField";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  editShipment,
  getMedications,
  getPatientAddress,
  getPatients,
  getShipment,
  shipmentListAction,
} from "../../../Redux/ShipmentSlice";
import { useNavigate, useParams } from "react-router-dom";
import { API_IMAGE_BASE } from "../../../constants";
import moment from "moment";
// import DatePicker from "react-datepicker";
import { DatePicker, Space } from "antd";

import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

export default function EditShipment() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm({
    mode: "onBlur",
  });
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const shipment = useSelector((state) => state.shipment.shipmentDetails);
  const patientsList = useSelector((state) => state.shipment.patientsList);
  const medicationsList = useSelector(
    (state) => state.shipment.medicationsList
  );
  const patientAddressList = useSelector(
    (state) => state.shipment.patientAddress
  );
  const params = useParams();
  const [state, setState] = useState({
    trackUrl: "",
    dosage: "",
    nextShipDate: "",
    shipDate: "",
    selectedPatient: "",
    selectedMedication: "",
    selectedAddress: "",
    medicationsOption: [],
    patientAddressOption: [],
  });

  useEffect(() => {
    let shipPayload = {
      _id: params.id,
    };
    dispatch(getShipment(shipPayload));
  }, []);

  useEffect(() => {
    const {
      patientId,
      trackUrl,
      dosage,
      nextDeliveryDate,
      deliveryDate,
      medicationId,
      addressId,
    } = shipment;
    const shipDate = moment.utc(deliveryDate).format();
    const nextShipDate = moment(nextDeliveryDate);
    // const shipmentDate = moment(shipDate).format("YYYY/MM/DD");
    // console.log(shipmentDate);
    const nextshipmentDate = moment(nextShipDate)
      .format("YYYY/MM/DD")
      .toString();
    const shipmentDate = moment(shipDate).format("YYYY/MM/DD").toString();

    let payload = {
      length: 10000,
      start: 0,
    };
    dispatch(getPatients(payload));
    setState((prev) => ({
      ...prev,
      selectedPatient: patientId,
      selectedMedication: medicationId,
      selectedAddress: addressId,
      trackUrl: trackUrl,
      dosage: dosage,
      nextShipDate: dayjs(nextshipmentDate),
      shipDate: dayjs(shipmentDate),
    }));
  }, [shipment]);

  useEffect(() => {
    const { patientId } = shipment;
    let addressPayload = {
      length: 10000,
      patientId: patientId,
      start: 0,
    };
    dispatch(getPatientAddress(addressPayload))
      .then((res) => {
        setState((prev) => ({ ...prev, patientAddressOption: res.data }));
      })
      .catch((err) => {
        console.log(err);
      });
    let medicationPayload = {
      _id: patientId,
    };
    dispatch(getMedications(medicationPayload))
      .then((res) => {
        setState((prev) => ({ ...prev, medicationsOption: res.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [patientsList]);

  useEffect(() => {
    reset(state);
  }, [state]);

  const onSubmit = (data) => {
    console.log(data);

    if (data) {
      const {
        selectedPatient,
        selectedMedication,
        selectedAddress,
        nextShipDate,
        shipDate,
        trackUrl,
        dosage,
      } = data;

      const nextDeliveryDate = moment(nextShipDate)
        .format("YYYY-MM-DD")
        .toString();
      const deliveryDate = moment(shipDate).format("YYYY-MM-DD").toString();

      let payload = {
        _id: params.id,
        patientId: selectedPatient,
        medicationId: selectedMedication,
        deliveryDate: nextDeliveryDate,
        nextDeliveryDate: deliveryDate,
        trackUrl: trackUrl,
        dosage: dosage,
        addressId: selectedAddress,
      };
      dispatch(editShipment(payload))
        .then((res) => {
          alert(res?.message);
          navigation("/add-Shipment");
        })
        .catch((err) => alert(err));
    }
  };

  const onPatientChange = (e) => {
    setState((prev) => ({ ...prev, selectedPatient: e.target.value }));
    onMedicationAndAddress(e.target.value);
  };

  const onMedicationAndAddress = (id) => {
    let addressPayload = {
      length: 10000,
      patientId: id,
      start: 0,
    };
    dispatch(getPatientAddress(addressPayload))
      .then((res) => {
        setState((prev) => ({ ...prev, selectedAddress: "" }));
      })
      .catch((err) => {
        console.log(err);
      });
    let medicationPayload = {
      _id: id,
    };
    dispatch(getMedications(medicationPayload))
      .then((res) => {
        setState((prev) => ({ ...prev, selectedMedication: "" }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Patients = () => {
    return (
      <div>
        <label htmlFor="pname" style={{ marginRight: 10 }}>
          Patient Name:
        </label>
        <select
          name="selectedPatient"
          value={state?.selectedPatient}
          onChange={(e) => onPatientChange(e)}
        >
          {patientsList?.map((obj) => {
            return <option value={obj?._id}>{obj?.name}</option>;
          })}
        </select>
        <RenderInput
          value={state?.selectedPatient}
          outerStyle={false}
          type="hidden"
          name="selectedPatient"
          register={{
            ...register("selectedPatient", {
              required: "Patient name required",
            }),
          }}
          errors={errors}
        />
      </div>
    );
  };
  const Medications = () => {
    return (
      <div>
        <label htmlFor="mname" style={{ marginRight: 10 }}>
          Medication Name
        </label>
        <select
          name="selectedMedication"
          value={state.selectedMedication}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              selectedMedication: e.target.value,
            }))
          }
        >
          <option value="">select</option>
          {state.medicationsOption?.map((obj) => {
            return <option value={obj.medicationId}>{obj.name}</option>;
          })}
        </select>
        <RenderInput
          outerStyle={false}
          value={state?.selectedMedication}
          type="hidden"
          name="selectedMedication"
          register={{
            ...register("selectedMedication", {
              required: "Medication required",
            }),
          }}
          errors={errors}
        />
      </div>
    );
  };
  const PatientAddress = () => {
    return (
      <>
        <label htmlFor="paddress" style={{ marginRight: 10 }}>
          Patient Address
        </label>
        <select
          name="selectedAddress"
          value={state.selectedAddress}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              selectedAddress: e.target.value,
            }))
          }
        >
          <option value="">select</option>
          {state.patientAddressOption?.map((obj) => {
            const address =
              obj?.addressLine1 + "  " + obj?.addressLine2 + "  " + obj?.city;
            return (
              <option
                value={obj._id}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    selectedAddress: e.target.value,
                  }))
                }
              >
                {address}
              </option>
            );
          })}
        </select>
        <RenderInput
          outerStyle={false}
          value={state?.selectedAddress}
          type="hidden"
          name="selectedAddress"
          register={{
            ...register("selectedAddress", {
              required: "Address required",
            }),
          }}
          errors={errors}
        />
      </>
    );
  };
  const onShipDateChange = (startDate) => {
    setState((prevState) => ({
      ...prevState,
      shipDate: startDate,
    }));
  };
  const onNextDateChange = (endDate) => {
    setState((prevState) => ({
      ...prevState,
      nextShipDate: endDate,
    }));
  };
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Shipment Edit Management</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            flexDirection: "column",
            height: "100vh",
            display: "flex",
          }}
        >
          <br />
          <div>
            {Patients()}
            {Medications()}
            {PatientAddress()}
            <RenderInput
              outerStyle={false}
              name="trackUrl"
              type="text"
              labelName="Track Url"
              id="trackurl"
              value={state.trackUrl}
              labelStyle={{ marginRight: 10 }}
              style={{ marginBlock: 15 }}
              register={{
                ...register("trackUrl", {
                  required: "Track URL required",
                  minLength: {
                    value: 2,
                    message: "Track URL must be at least 2 characters",
                  },
                }),
              }}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  trackUrl: e.target.value,
                }))
              }
              errors={errors}
              placeholder="Track Url"
            />
            <RenderInput
              outerStyle={false}
              labelName="Dosage"
              name="dosage"
              type="text"
              value={state.dosage}
              style={{ marginBlock: 15 }}
              labelStyle={{ marginRight: 10 }}
              register={{
                ...register("dosage", {
                  required: "Dosage required",
                }),
              }}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  dosage: e.target.value,
                }))
              }
              errors={errors}
              placeholder="Track Url"
            />

            <label>Shipment Date</label>
            {/* <DatePicker
              selected={state.shipDate}
              onChange={(e) => onShipDateChange(e)}
              name="startDate"
              dateFormat="MM/dd/yyyy"
            /> */}
            <DatePicker
              value={state.shipDate}
              format="MM/DD/YYYY"
              allowClear={false}
              name={"startdate"}
              onChange={(e) => onShipDateChange(e)}
              style={{ margin: 10 }}
            />
            <RenderInput
              outerStyle={false}
              value={state?.shipDate}
              type="hidden"
              name="startDate"
              register={{
                ...register("startDate", {
                  required: "Delivery Date required",
                }),
              }}
              errors={errors}
            />
            <label>Next Shipment Date</label>
            {/* <DatePicker
              selected={state.nextShipDate}
              onChange={(e) => onNextDateChange(e)}
              name="endDate"
              dateFormat="MM/dd/yyyy"
            /> */}
            <DatePicker
              value={state.nextShipDate}
              format="MM/DD/YYYY"
              onChange={(e) => onNextDateChange(e)}
              name={"enddate"}
              disabledDate={(current) => {
                return current && current < dayjs(state.shipDate).add(1, "day");
              }}
              allowClear={false}
            />
            <RenderInput
              outerStyle={false}
              value={state?.nextShipDate}
              type="hidden"
              name="endDate"
              register={{
                ...register("endDate", {
                  required: "Shipment required",
                }),
              }}
              errors={errors}
            />
          </div>
          <input type="submit" />
        </form>
      </div>
    </>
  );
}
