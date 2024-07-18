import { getURLFromConfigByName } from "../../helpers/getConfigFunctions";
import { fetchConToken } from "../../helpers/fetch";
import Swal from "sweetalert2";
import {
  brandGridDataLoadedRedux,
  productGridDataLoadedRedux,
  createProductRedux,
  updateProductRedux,
  deleteProductRedux,
} from "../slices/productSlice";
import { productSorter } from "../../helpers/sorters";

export const getAllProducts = () => {
  return async (dispatch, getState) => {
    try {
      const { config } = getState().auth;
      let url = getURLFromConfigByName(
        config,
        "api_gateway_host",
        "entities/getAllProducts"
      );
      const resp = await fetchConToken(url, {}, "POST");
      const body = await resp.json();
      if (body.ok) {
        body.value.sort(productSorter);
        dispatch(productGridDataLoadedRedux(body.value));
        return body;
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
      console.log("ERROR SIN BODY");
      throw new Error(error.message);
    }
  };
};

export const getAllBrands = () => {
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
        body.value.sort(productSorter);
        dispatch(brandGridDataLoadedRedux(body.value));
        return body;
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
      console.log("ERROR SIN BODY");
      throw new Error(error.message);
    }
  };
};

export const getProductsByBrand = (marca_id) => {
  return async (dispatch, getState) => {
    try {
      const { config } = getState().auth;
      let url = getURLFromConfigByName(
        config,
        "api_gateway_host",
        "entities/getProductsByBrand"
      );
      const resp = await fetchConToken(url, { marca_id: marca_id }, "POST");
      const body = await resp.json();
      if (body.ok) {
        body.value.sort(productSorter);
        return body;
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
      console.log("ERROR SIN BODY");
      throw new Error(error.message);
    }
  };
};

export const getProductsByBrandAndContract = (marca_id, contract) => {
  return async (dispatch, getState) => {
    try {
      const { config } = getState().auth;
      let url = getURLFromConfigByName(
        config,
        "api_gateway_host",
        "entities/getProductsByBrandAndContract"
      );
      const resp = await fetchConToken(
        url,
        { marca_id: marca_id, contract: contract },
        "POST"
      );
      const body = await resp.json();
      if (body.ok) {
        body.value.sort(productSorter);
        return body;
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
      console.log("ERROR SIN BODY");
      throw new Error(error.message);
    }
  };
};

export const getBrandsByCompany = (companyId) => {
  return async (dispatch, getState) => {
    try {
      const { config } = getState().auth;
      let url = getURLFromConfigByName(
        config,
        "api_gateway_host",
        "entities/getBrandsByCompany"
      );
      const resp = await fetchConToken(url, { company: companyId }, "POST");
      const body = await resp.json();
      if (body.ok) {
        body.value.sort(productSorter);
        return body.value;
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
      console.log("ERROR SIN BODY");
      throw new Error(error.message);
    }
  };
};

export const getBrandsByContract = (contract) => {
  return async (dispatch, getState) => {
    try {
      console.log("CONTRACT", contract);
      const { config } = getState().auth;
      let url = getURLFromConfigByName(
        config,
        "api_gateway_host",
        "entities/getBrandsByContract"
      );
      const resp = await fetchConToken(url, { contract: contract }, "POST");
      const body = await resp.json();
      console.log("BODY", body);
      if (body.ok) {
        body.value.sort(productSorter);
        return body.value;
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
      console.log("ERROR SIN BODY");
      throw new Error(error.message);
    }
  };
};

export const createProduct = (product) => {
  return async (dispatch, getState) => {
    try {
      const { config } = getState().auth;
      const newProduct = { ...product, habilitado: true }; // Asegurarse de que el campo habilitado sea true
      let url = getURLFromConfigByName(
        config,
        "api_gateway_host",
        "entities/createProduct"
      );
      const resp = await fetchConToken(url, newProduct, "POST");
      const body = await resp.json();
      if (body.ok) {
        dispatch(createProductRedux(body.value)); // body.value debería contener el producto creado
        Swal.fire("Success", "Product added successfully", "success");
        return body.value;
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "An error occurred while adding the product", "error");
      throw new Error(error.message);
    }
  };
};

export const updateProduct = (product) => {
  return async (dispatch, getState) => {
    try {
      const { config } = getState().auth;
      let url = getURLFromConfigByName(
        config,
        "api_gateway_host",
        `entities/updateProduct/${product.id}`
      );
      const resp = await fetchConToken(url, product, "PUT");
      const body = await resp.json();
      if (body.ok) {
        dispatch(updateProductRedux(body.value));
        Swal.fire("Success", "Product updated successfully", "success");
        return body.value;
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error",
        "An error occurred while updating the product",
        "error"
      );
      throw new Error(error.message);
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    try {
      const { config } = getState().auth;
      let url = getURLFromConfigByName(
        config,
        "api_gateway_host",
        "entities/deleteProduct"
      );
      const resp = await fetchConToken(url, { id }, "POST");
      const body = await resp.json();
      if (body.ok) {
        dispatch(deleteProductRedux(id));
        Swal.fire("Success", "Product deleted successfully", "success");
        return body.value;
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error",
        "An error occurred while deleting the product",
        "error"
      );
      throw new Error(error.message);
    }
  };
};
