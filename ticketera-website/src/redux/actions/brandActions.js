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
      console.log("GET URL:", url); // Log URL
      const resp = await fetchConToken(url, {}, "POST");
      const body = await resp.json();
      console.log("GET Response:", body); // Log Response
      if (body.ok) {
        dispatch(brandGetRowsetRedux(body.value));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log("GET Error:", error); // Log Error
      Swal.fire("Error", error.message, "error");
    }
  };
};

export const brandUpdate = (brand) => {
  return async (dispatch, getState) => {
    try {
      const { config } = getState().auth;

      console.log("config", config);
      console.log("Config:", config); // Log config

      let url = getURLFromConfigByName(
        config,
        "api_gateway_host",
        `entities/updateBrand/${brand.id}`
      );
      console.log("UPDATE URL:", url); // Log URL
      console.log("UPDATE Body:", brand); // Log Body
      const resp = await fetchConToken(url, brand, "PUT");
      const body = await resp.json();
      console.log("UPDATE Response:", body); // Log Response
      if (body.ok) {
        dispatch(brandUpdateRedux(brand));
        return body.msg;
      } else {
        throw new Error(body.msg);
      }
    } catch (error) {
      console.log("UPDATE Error:", error); // Log Error
      Swal.fire("Error", error.message, "error");
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
      console.log("CREATE URL:", url); // Log URL
      console.log("CREATE Body:", newBrand); // Log Body
      const resp = await fetchConToken(url, newBrand, "POST");
      const body = await resp.json();
      console.log("CREATE Response:", body); // Log Response
      if (body.ok) {
        dispatch(brandCreateRedux(newBrand));
        Swal.fire("Success", "Brand added successfully");
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log("CREATE Error:", error); // Log Error
      Swal.fire("Error", "An error occurred while adding the brand");
      throw new Error(error.message);
    }
  };
};

export const brandDelete = (id) => {
  return async (dispatch, getState) => {
    try {
      const { config } = getState().auth;
      let url = getURLFromConfigByName(
        config,
        "api_gateway_host",
        `entities/deleteBrand/${id}`
      );
      console.log("DELETE URL:", url); // Log URL
      const resp = await fetchConToken(url, {}, "DELETE");
      const body = await resp.json();
      console.log("DELETE Response:", body); // Log Response
      if (body.ok) {
        dispatch(brandDeleteRedux(id));
        return body.msg;
      } else {
        throw new Error(body.msg);
      }
    } catch (error) {
      console.log("DELETE Error:", error); // Log Error
      Swal.fire("Error", error.message, "error");
    }
  };
};
