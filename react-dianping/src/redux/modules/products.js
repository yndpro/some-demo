export const schema = {
  key : "id",
  name : "products"
}

const initialState = {
  items : {},
  keys : []
}

export default (state = initialState, { type, response , payload }) => {
  /**判断action有没有相应的属性来做state的更新 */
  if(response && response[schema.name]){
    return {...state,...response[schema.name]}
  }
  return state;
}


