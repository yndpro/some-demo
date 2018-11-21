
const host = _zt._ztUrl;

function getApi (api) {
    return host + api
}

export default {
    init: getApi('-ajaxInitApp'),
    getPrize: getApi('-ajaxGetPrize'),
    getMyPrize: getApi('-ajaxGetMyPrize'),
    writeUserInfo: getApi('-ajaxWriteUserInfo'),
}