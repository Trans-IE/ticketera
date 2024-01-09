import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brands: [],


}

export const entitySlice = createSlice(
    {
        name: "entity",
        initialState: initialState,
        reducers: {
            entitiesClearDataRedux: (state, action) => {
                state.brands= [];
            },

            brandGetRowsetRedux: ( state, action) => {
                state.brands= action.payload;
            },
            brandCreateRedux: (state, action ) => {
                state.brands = state.brands.concat(action.payload);
            },
            brandUpdateRedux: (state, action) => {
                state.brands = state.brands.map(
                    e => (e.id === action.payload.id) ? action.payload : e
                );
            }
            
        }
    }
);

export const { entitiesClearDataRedux, brandGetRowsetRedux, brandCreateRedux, brandUpdateRedux  } = entitySlice.actions;
export default entitySlice.reducer;
