import API from '../../utils/api';
import request from '../../utils/request';
import {schema as productsSchema} from './products';

export const types = {
  FETCH_PRODUCT_LIKES_REQUEST : "FETCH_PRODUCT_LIKES_REQUEST",
  FETCH_PRODUCT_LIKES_SUCCESS : "FETCH_PRODUCT_LIKES_SUCCESS",
  FETCH_PRODUCT_LIKES_FAILURE : "FETCH_PRODUCT_LIKES_FAILURE",
}

export const actions = {
  loadProcutLikes(start,end){
    return (dispatch,getState) => {
      /**thunk 控制反转，条件判断，分发action */
      return dispatch(actions.fetchProcutLikes(start,end))
    }
  },
  fetchProcutLikes(start,end){
    return {
      types : [
        types.FETCH_PRODUCT_LIKES_REQUEST,
        types.FETCH_PRODUCT_LIKES_SUCCESS,
        types.FETCH_PRODUCT_LIKES_FAILURE,
      ],
      callApi : () => request.get(`${API.GET_PRODUCT_LIKES}?start=${start}&end=${end}`),
      payload : {},
      schema : productsSchema
    }
  }
}

const initialState = {
  loading : false,
  errorText : ""
}

export default (state = initialState, { type , error}) => {
  switch (type) {
    case types.FETCH_PRODUCT_LIKES_REQUEST:
      return {
        ...state,
        loading : true
      };
    case types.FETCH_PRODUCT_LIKES_SUCCESS:
      return {
        ...state,
        loading : false
      };
    case types.FETCH_PRODUCT_LIKES_FAILURE:
      return {
        ...state,
        errorText : error,
        loading : false
      };
    default:
      return state;
  }
}
