import { fetchConToken } from "../../helpers/fetch";
import { getURLFromConfigByName } from "../../helpers/getConfigFunctions";
import Swal from "sweetalert2";
import {
  holidayGetRowsetRedux,
  holidayCreateRedux,
  holidayUpdateRedux,
  holidayDeleteRedux,
} from "../slices/holidaysSlice";

export const holidayGetRowset = () => {
  return async (dispatch, getState) => {
    try {
      const { config } = getState().auth;
      let url = getURLFromConfigByName(
        config,
        "api_gateway_host",
        "entities/getAllholidays"
      );
      const resp = await fetchConToken(url, {}, "POST");
      const body = await resp.json();
      if (body.ok) {
        dispatch(holidayGetRowsetRedux(body.value));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };
};

export const holidayUpdate = (holiday) => {
  return async (dispatch, getState) => {
    try {
      const { config } = getState().auth;
      let url = getURLFromConfigByName(
        config,
        "api_gateway_host",
        `entities/updateholiday/${holiday.id}`
      );
      const resp = await fetchConToken(url, holiday, "PUT");
      const body = await resp.json();
      if (body.ok) {
        dispatch(holidayUpdateRedux(body.value));
        Swal.fire("Success", "holiday updated successfully", "success");
        return body.value;
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error",
        "An error occurred while updating the holiday",
        "error"
      );
      throw new Error(error.message);
    }
  };
};

export const holidayCreate = (holiday) => {
  const generateNumericId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  return async (dispatch, getState) => {
    try {
      const { config } = getState().auth;
      const newholiday = {
        ...holiday,
        habilitado: true,
        id: generateNumericId(),
      }; // Generar un nuevo id aquí
      let url = getURLFromConfigByName(
        config,
        "api_gateway_host",
        "entities/createholiday"
      );
      const resp = await fetchConToken(url, newholiday, "POST");
      const body = await resp.json();
      if (body.ok) {
        dispatch(holidayCreateRedux(newholiday));
        Swal.fire("Success", "holiday added successfully");
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred while adding the holiday");
      throw new Error(error.message);
    }
  };
};

export const holidayDelete = (holiday) => {
  return async (dispatch, getState) => {
    try {
      const { config } = getState().auth;
      let url = getURLFromConfigByName(
        config,
        "api_gateway_host",
        `entities/updateholiday/${holiday.id}`
      );
      const holidayToDisable = { ...holiday, habilitado: false };
      const resp = await fetchConToken(url, holidayToDisable, "PUT");
      const body = await resp.json();
      if (body.ok) {
        dispatch(holidayDeleteRedux(holiday.id));
        Swal.fire("Success", "holiday deleted successfully", "success");
        return body.value;
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error",
        "An error occurred while deleting the holiday",
        "error"
      );
      throw new Error(error.message);
    }
  };
};
