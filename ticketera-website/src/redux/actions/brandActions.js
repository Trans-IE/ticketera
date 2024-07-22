import { fetchConToken } from "../../helpers/fetch";
import { getURLFromConfigByName } from "../../helpers/getConfigFunctions";
import Swal from "sweetalert2";
import {
  brandGetRowsetRedux,
  brandCreateRedux,
  brandUpdateRedux,
  brandDeleteRedux,
} from "../slices/brandsSlice";

export const brandGetRowset = () => {
  return async (dispatch, getState) => {
    try {
      const { config } = getState().auth;
      let url = getURLFromConfigByName(
        config,
        "api_gateway_host",
        "entities/getAllBrands"
      );
      const resp = await fetchConToken(url, {}, "POST");
      const body = await resp.json();
      if (body.ok) {
        dispatch(brandGetRowsetRedux(body.value));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };
};

export const brandUpdate = (brand) => {
  return async (dispatch, getState) => {
    try {
      const { config } = getState().auth;
      let url = getURLFromConfigByName(
        config,
        "api_gateway_host",
        `entities/updateBrand/${brand.id}`
      );
      const resp = await fetchConToken(url, brand, "PUT");
      const body = await resp.json();
      if (body.ok) {
        dispatch(brandUpdateRedux(body.value));
        Swal.fire("Success", "Brand updated successfully", "success");
        return body.value;
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "An error occurred while updating the brand", "error");
      throw new Error(error.message);
    }
  };
};

export const brandCreate = (brand) => {
  const generateNumericId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  return async (dispatch, getState) => {
    try {
      const { config } = getState().auth;
      const newBrand = { ...brand, habilitado: true, id: generateNumericId() }; // Generar un nuevo id aquí
      let url = getURLFromConfigByName(
        config,
        "api_gateway_host",
        "entities/createBrand"
      );
      const resp = await fetchConToken(url, newBrand, "POST");
      const body = await resp.json();
      if (body.ok) {
        dispatch(brandCreateRedux(newBrand));
        Swal.fire("Success", "Brand added successfully");
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred while adding the brand");
      throw new Error(error.message);
    }
  };
};

export const brandDelete = (brand) => {
  return async (dispatch, getState) => {
    try {
      const { config } = getState().auth;
      let url = getURLFromConfigByName(
        config,
        "api_gateway_host",
        `entities/updateBrand/${brand.id}`
      );
      const brandToDisable = { ...brand, habilitado: false };
      const resp = await fetchConToken(url, brandToDisable, "PUT");
      const body = await resp.json();
      if (body.ok) {
        dispatch(brandDeleteRedux(brand.id));
        Swal.fire("Success", "Brand deleted successfully", "success");
        return body.value;
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "An error occurred while deleting the brand", "error");
      throw new Error(error.message);
    }
  };
};
