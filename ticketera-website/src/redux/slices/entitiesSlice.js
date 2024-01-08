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
                state.brands= action.payload;
            },

            brandGetRowsetRedux: ( state, action) => {

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

export const { entitiesClearDataRedux, brandsGetRowsetRedux } = entitySlice.actions;
export default entitySlice.reducer;
