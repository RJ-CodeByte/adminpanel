import React, { useEffect, useState } from "react";
import { RenderInput } from "../../../components/common/FormField";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addShipment,
  getMedications,
  getPatientAddress,
  getPatients,
  getShipment,
  shipmentListAction,
} from "../../../Redux/ShipmentSlice";
import { useNavigate, useParams } from "react-router-dom";
import { API_IMAGE_BASE } from "../../../constants";
import moment from "moment";
import dayjs from "dayjs";
import { DatePicker, Space } from "antd";

export default function AddShipment() {
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

  const params = useParams();
  const [state, setState] = useState({
    trackUrl: "",
    dosage: "",
    nextShipDate: null,
    shipDate: null,
    selectedPatient: "",
    selectedMedication: "",
    selectedAddress: "",
    patientsOption: [],
    medicationsOption: [],
    patientAddressOption: [],
  });

  useEffect(() => {
    let payload = {
      length: 10000,
      start: 0,
    };
    dispatch(getPatients(payload))
      .then((res) =>
        setState((prev) => ({ ...prev, patientsOption: res?.data.data }))
      )
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    reset(state);
  }, [state]);
  console.log("errors", errors);
  const onSubmit = (data) => {
    console.log(data);
    if (data) {
      const {
        dosage,
        trackUrl,
        selectedPatient,
        selectedMedication,
        selectedAddress,
        nextShipDate,
        shipDate,
      } = data;

      const nextDeliveryDate = moment(nextShipDate.$d)
        .format("YYYY-MM-DD")
        .toString();
      const deliveryDate = moment(shipDate.$d).format("YYYY-MM-DD").toString();
      let payload = {
        patientId: selectedPatient,
        medicationId: selectedMedication,
        deliveryDate: deliveryDate,
        nextDeliveryDate: nextDeliveryDate,
        trackUrl: trackUrl,
        dosage: dosage,
        addressId: selectedAddress,
      };
      dispatch(addShipment(payload))
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
        setState((prev) => ({ ...prev, patientAddressOption: res.data }));
      })
      .catch((err) => {
        console.log(err);
      });
    let medicationPayload = {
      _id: id,
    };
    dispatch(getMedications(medicationPayload))
      .then((res) => {
        setState((prev) => ({ ...prev, medicationsOption: res.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Patients = () => {
    return (
      <div>
        <label htmlFor="password">Patient Name:</label>
        <select
          name="selectedPatient"
          style={{ width: 200 }}
          value={state?.selectedPatient}
          onChange={(e) => onPatientChange(e)}
        >
          <option>select</option>
          {state.patientsOption?.map((obj) => {
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
        <label htmlFor="medication">Medication Name</label>
        <select
          style={{ width: 200 }}
          name="selectedMedication"
          value={state?.selectedMedication}
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
        <label htmlFor="password">Patient Address</label>
        <select
          name="selectedAddress"
          style={{ width: 200 }}
          value={state.selectedAddress}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              selectedAddress: e.target.value,
            }))
          }
        >
          <option>select</option>
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
              value={state.trackUrl}
              style={{ marginBlock: 15 }}
              register={{
                ...register("trackUrl", {
                  required: "Track URL required",
                  // minLength: {
                  //   value: 2,
                  //   message: "Track URL must be at least 2 characters",
                  // },
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
              placeholder="Dosage"
            />

            {/* dates */}
            <div>
              <label>Shipment Date</label>
              <DatePicker
                value={state.shipDate}
                format="MM/DD/YYYY"
                allowClear={false}
                name={"startdate"}
                onChange={(e) => onShipDateChange(e)}
                style={{ margin: 10 }}
              />
              <RenderInput
                value={state?.nextShipDate}
                outerStyle={false}
                type="hidden"
                name="startdate"
                register={{
                  ...register("startdate", {
                    required: "Delivery Date is Required",
                  }),
                }}
                errors={errors}
              />
            </div>
            {state.shipDate ? (
              <div>
                <label>Next Shipment Date</label>
                <DatePicker
                  value={state.nextShipDate}
                  format="MM/DD/YYYY"
                  onChange={(e) => onNextDateChange(e)}
                  name={"enddate"}
                  disabledDate={(current) => {
                    return (
                      current && current < dayjs(state.shipDate).add(1, "day")
                    );
                  }}
                  allowClear={false}
                />
                <RenderInput
                  outerStyle={false}
                  value={state?.nextShipDate}
                  type="hidden"
                  name="enddate"
                  register={{
                    ...register("enddate", {
                      required: "Shipment Date is Required",
                    }),
                  }}
                  errors={errors}
                />
              </div>
            ) : null}
          </div>
          <input type="submit" />
        </form>
      </div>
    </>
  );
}
