import React, { useEffect, useState } from "react";
import {
  DropDown,
  RenderDatePicker,
  RenderInput,
} from "../../../components/common/FormField";
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
import moment from "moment";
import dayjs from "dayjs";
// import { DatePicker, Space } from "antd";

export default function AddShipment() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm({
    mode: "all",
  });
  const dispatch = useDispatch();
  const navigation = useNavigate();

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

  // useEffect(() => {
  //   reset(state);
  // }, [state]);
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
    // setValue("selectedPatient", e);
    // clearErrors("selectedPatient", e);
    onMedicationAndAddress(e);
  };

  const onMedicationAndAddress = (id) => {
    let addressPayload = {
      length: 10000,
      patientId: id,
      start: 0,
    };
    dispatch(getPatientAddress(addressPayload))
      .then((res) => {
        setState((prev) => ({
          ...prev,
          patientAddressOption: res.data,
          selectedAddress: "",
        }));
      })
      .catch((err) => {
        console.log(err);
      });
    let medicationPayload = {
      _id: id,
    };
    dispatch(getMedications(medicationPayload))
      .then((res) => {
        setState((prev) => ({
          ...prev,
          medicationsOption: res.data,
          selectedMedication: "",
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Patients = () => {
    const patientNames = state.patientsOption?.map((obj) => {
      return {
        label: obj.name,
        value: obj._id,
      };
    });
    patientNames.unshift({ label: "Select", value: "" });
    return (
      <div>
        <DropDown
          name="selectedPatient"
          label="Patient Name:"
          style={{ width: 200 }}
          {...register("selectedPatient", {
            required: "Patient name required",
          })}
          handleChange={(e) => onPatientChange(e.target.value)}
          options={patientNames}
          errors={errors?.selectedPatient}
        />
      </div>
    );
  };
  const Medications = () => {
    const medications = state.medicationsOption?.map((obj) => {
      return {
        label: obj.name,
        value: obj.medicationId,
      };
    });
    console.log(medications);
    medications.unshift({ label: "Select", value: "" });
    return (
      <div>
        <DropDown
          name="selectedMedication"
          label="Medication Name: "
          style={{ width: 200 }}
          {...register("selectedMedication", {
            required: "Medication required",
          })}
          handleChange={(e) => {
            setValue("selectedMedication", e.target.value);
            clearErrors("selectedMedication", e.target.value);
          }}
          options={medications}
          errors={errors?.selectedMedication}
        />
      </div>
    );
  };
  const PatientAddress = () => {
    const address = state.patientAddressOption?.map((obj) => {
      const address =
        obj?.addressLine1 + "  " + obj?.addressLine2 + "  " + obj?.city;
      return {
        label: address,
        value: obj._id,
      };
    });
    address.unshift({ label: "Select", value: "" });
    return (
      <>
        <DropDown
          name="selectedAddress"
          label="Patient Address: "
          style={{ width: 200 }}
          {...register("selectedAddress", {
            required: "Patient address required",
          })}
          handleChange={(e) => {
            setValue("selectedAddress", e.target.value);
            clearErrors("selectedAddress", e.target.value);
          }}
          options={address}
          errors={errors?.selectedAddress}
        />
      </>
    );
  };

  const onShipDateChange = (startDate) => {
    setState((prevState) => ({
      ...prevState,
      shipDate: startDate,
    }));
    setValue("shipDate", startDate);
    clearErrors("shipDate", startDate);
  };

  const onNextDateChange = (endDate) => {
    setState((prevState) => ({
      ...prevState,
      nextShipDate: endDate,
    }));
    setValue("nextShipDate", endDate);
    clearErrors("nextShipDate", endDate);
  };
  return (
    <>
      <div class="row">
        <div className="col-12 d-flex justify-content-center align-self-center ">
          <div className="card p-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h4 className="col-sm-12 card-title">Shipment Add Management</h4>
              <br />
              <div className="row">
                <div className="col-md-6">{Patients()}</div>
                <div className=" col-md-6">{Medications()}</div>
              </div>
              <div className="row">
                <div className=" col-md-6 mt-2">
                  <RenderInput
                    outerStyle={false}
                    name="trackUrl"
                    type="text"
                    labelName="Track Url"
                    value={state.trackUrl}
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
                    errors={errors?.trackUrl}
                    placeholder="Track Url"
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <RenderInput
                    outerStyle={false}
                    labelName="Dosage"
                    name="dosage"
                    type="text"
                    value={state.dosage}
                    register={{
                      ...register("dosage", {
                        required: "Dosage required",
                        minLength: {
                          value: 2,
                          message: "Dosage URL must be at least 2 characters",
                        },
                      }),
                    }}
                    onChange={(e) =>
                      setState((prevState) => ({
                        ...prevState,
                        dosage: e.target.value,
                      }))
                    }
                    errors={errors?.dosage}
                    placeholder="Dosage"
                  />
                </div>
              </div>
              <div className="row">
                {/* dates */}
                <div className=" col-md-6 mt-2">
                  <RenderDatePicker
                    labelName={"Shipment Date"}
                    value={state?.shipDate}
                    name="shipDate"
                    register={{
                      ...register("shipDate", {
                        required: "Please Select",
                      }),
                    }}
                    errors={errors?.shipDate}
                    onChange={(e) => onShipDateChange(e)}
                  />
                </div>
                {state.shipDate ? (
                  <div className=" col-md-6 mt-2">
                    <RenderDatePicker
                      labelName={"Next Shipment Date"}
                      value={state?.nextShipDate}
                      name={"nextShipDate"}
                      register={{
                        ...register("nextShipDate", {
                          required: "Please Select",
                        }),
                      }}
                      errors={errors?.nextShipDate}
                      disabledDate={(current) => {
                        return (
                          current &&
                          current < dayjs(state.shipDate).add(1, "day")
                        );
                      }}
                      onChange={(e) => onNextDateChange(e)}
                    />
                  </div>
                ) : null}
              </div>
              <div className="col-md-8">{PatientAddress()}</div>
              <div>
                <button className="btn btn-primary mt-4" type="submit">
                  Submit Shipment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
