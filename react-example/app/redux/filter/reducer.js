import { SET_FILTER } from './actionTypes';

const actionHandle = {
    [SET_FILTER]: (state, payload) => {
        return payload.filter;
    }
};

export default (state = '', action) => {
    return actionHandle[action.type] ? actionHandle[action.type](state, action.payload) : state;
};

// const swiper = {
//   0: (() => console.log(1))(),
//   1: (() => console.log(2))()
// };
// const _maps = new Map([
//   [1, () => console.log(1)],
//   [2, () => console.log(2)]
// ]);
// _maps.get
