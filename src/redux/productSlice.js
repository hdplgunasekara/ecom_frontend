import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = 'http://127.0.0.1:8080/'

const initialState = {
    isLoading: false,
    productList: [],
    searchResult: [],
    searchResultLength: 0,
    productForEdit: {},
}

export const getProducts = createAsyncThunk('product/', async(payload) => {
    try {
        const res = await axios.get(URL+'product');
        return res.data
    } catch (err) {
        console.log(err)
    }
})

export const getSearchResult = createAsyncThunk('product/search', async(payload) => {
    try {
        const res = await axios.get(URL+`product/search?name=${payload}`);
        return res.data
    } catch (err) {
        console.log(err)
    }
})

export const getProductToEdit = createAsyncThunk('product/getOne', async(payload) => {
      try {
        const res = await axios.get(URL+`product/get-one/${payload}`);
        return res.data
    } catch (err) {
        console.log(err)
    }
})

export const deleteProduct = createAsyncThunk('product/delete', async(payload) => {
    try {
      const res = await axios.delete(URL+`product/delete?id=${payload}`);
      return res.data
  } catch (err) {
      console.log(err)
  }
})

export const addProduct = createAsyncThunk('product/add', async(payload) => {
    try {
        axios({
            method: "post",
            url: URL+`product/`,
            data: payload,
            headers: { "Content-Type": "multipart/form-data" },
          }).then((res) => {
        return res.data
          })
    } catch (err) {
        console.log(err)
    }
})

export const editProduct = createAsyncThunk('product/edit', async(payload) => {
    try {
        axios({
            method: "put",
            url: URL+`product/`,
            data: payload,
            headers: { "Content-Type": "multipart/form-data" },
          }).then((res) => {
        return res.data
          })
    } catch (err) {
        console.log(err)
    }
})

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        clearProduct:(state) => {
            state.productList = [];
        },
    },
    extraReducers:{
        [getProducts.pending] : (state) => {
            state.isLoading = true
        },
        [getProducts.fulfilled] : (state, action) => {
            state.productList = action.payload
            state.isLoading = false
        },
        [getProducts.rejected] : (state) => {
            state.isLoading = false
        },
        [getProductToEdit.pending] : (state) => {
            state.isLoading = true
        },
        [getProductToEdit.fulfilled] : (state, action) => {
        state.productForEdit = action.payload
        state.isLoading = false
        },
        [getProductToEdit.rejected] : (state) => {
            state.isLoading = false
        },
        [addProduct.pending] : (state) => {
            state.isLoading = true
        },
        [addProduct.fulfilled] : (state, action) => {
        state.productList.push(action.payload);
        state.isLoading = false
        },
        [addProduct.rejected] : (state) => {
            state.isLoading = false
        },
        [editProduct.pending] : (state) => {
         state.isLoading = true
        },
        [editProduct.fulfilled] : (state, action) => {
        state.isLoading = false
        },
        [editProduct.rejected] : (state) => {
        state.isLoading = false
        },
        [deleteProduct.pending] : (state) => {
         state.isLoading = true
        },
        [deleteProduct.fulfilled] : (state, action) => {
        state.isLoading = false
        },
        [deleteProduct.rejected] : (state) => {
        state.isLoading = false
        },
        [getSearchResult.pending] : (state) => {
            state.isLoading = true
        },
        [getSearchResult.fulfilled] : (state, action) => {
            state.searchResult = action.payload
            state.searchResultLength = action.payload.length
            state.isLoading = false
        },
        [getSearchResult.rejected] : (state) => {
            state.isLoading = false
        },
    }
})

// console.log(cartSlice)
export const { clearProduct  } = productSlice.actions

export default productSlice.reducer;