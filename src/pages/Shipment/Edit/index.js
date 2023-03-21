import React, { useEffect, useState } from "react";
import {
  DropDown,
  RenderDatePicker,
  RenderInput,
} from "../../../components/common/FormField";
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
import moment from "moment";
// import DatePicker from "react-datepicker";
import { DatePicker, Space } from "antd";

import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export default function EditShipment() {
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
        setState((prev) => ({
          ...prev,
          patientAddressOption: res.data,
        }));
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
          toast(res?.message);
          navigation("/add-Shipment");
        })
        .catch((err) => alert(err));
    }
  };

  const onPatientChange = (e) => {
    console.log(e);
    setState((prev) => ({
      ...prev,
      selectedPatient: e,
      selectedAddress: "",
      selectedMedication: "",
    }));
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
          selectedAddress: "",
          patientAddressOption: res.data,
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
          selectedMedication: "",
          medicationsOption: res.data,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Patients = () => {
    const patientNames = patientsList?.map((obj) => {
      return {
        label: obj.name,
        value: obj._id,
      };
    });
    return (
      <div className="col-md-6">
        <DropDown
          name="selectedPatient"
          label="Patient Name:"
          style={{ width: 200 }}
          value={state?.selectedPatient}
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
      console.log(obj);
      return {
        label: obj.name,
        value: obj.medicationId,
      };
    });
    medications.unshift({ label: "Select", value: "" });
    return (
      <div className=" col-md-6">
        <DropDown
          name="selectedMedication"
          label="Medication Name: "
          style={{ width: 200 }}
          // value={state?.selectedMedication}
          {...register("selectedMedication", {
            required: "Medication required",
          })}
          handleChange={(e) => {
            // setState((prev) => ({
            //   ...prev,
            //   selectedMedication: e.target.value,
            // }))
            setValue("selectedMedication", e.target.value);
            clearErrors("selectedMedication", e.target.value);
          }}
          options={medications}
          errors={errors.selectedMedication}
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
      <div className="col-md-8">
        <DropDown
          name="selectedAddress"
          label="Patient Address: "
          style={{ width: 200 }}
          // value={state?.selectedAddress}
          {...register("selectedAddress", {
            required: "Patient address required",
          })}
          handleChange={(e) => {
            //   ...prev,
            //   selectedAddress: e.target.value,
            setValue("selectedAddress", e.target.value);
            clearErrors("selectedAddress", e.target.value);
          }}
          options={address}
          errors={errors?.selectedAddress}
        />
      </div>
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
      <div class="row">
        <div className="col-12 d-flex justify-content-center align-self-center ">
          <div className="card p-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h4
                className="col-sm-12 card-title"
                style={{ textAlign: "center" }}
              >
                Shipment Edit Management
              </h4>
              <div className="row">
                {Patients()}
                {Medications()}
              </div>
              <div className="row">
                <div className=" col-md-6 mt-2">
                  <RenderInput
                    outerStyle={false}
                    name="trackUrl"
                    type="text"
                    labelName="Track Url"
                    id="trackurl"
                    labelStyle={{ marginRight: 10 }}
                    style={{ marginBlock: 15 }}
                    register={{
                      ...register("trackUrl", {
                        required: "URL required",
                        minLength: {
                          value: 2,
                          message: "URL must be at least 2 characters",
                        },
                      }),
                    }}
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
                    // value={state.dosage}
                    style={{ marginBlock: 15 }}
                    labelStyle={{ marginRight: 10 }}
                    register={{
                      ...register("dosage", {
                        required: "Dosage required",
                      }),
                    }}
                    // onChange={(e) =>
                    //   setState((prevState) => ({
                    //     ...prevState,
                    //     dosage: e.target.value,
                    //   }))
                    // }
                    errors={errors?.dosage}
                    placeholder="Dosage"
                  />
                </div>
              </div>
              <div className="row">
                <div className=" col-md-6 mt-2">
                  <RenderDatePicker
                    labelName={"Shipment Date"}
                    value={state?.shipDate}
                    name="shipDate"
                    onChange={(e) => onShipDateChange(e)}
                  />
                </div>
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
                        current && current < dayjs(state.shipDate).add(1, "day")
                      );
                    }}
                    onChange={(e) => onNextDateChange(e)}
                  />
                </div>
              </div>
              {PatientAddress()}
              {/* <input type="submit" /> */}
              <button className="btn btn-primary mt-4" type="submit">
                Submit Shipment
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
