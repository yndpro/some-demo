
function getApi (api) {
    return host + api
}

export default {
    init: getApi('-ajaxInitApp'),
    getPrize: getApi('-ajaxGetPrize'),
    getMyPrize: getApi('-ajaxGetMyPrize'),
    writeUserInfo: getApi('-ajaxWriteUserInfo'),
    postShare: getApi('-ajaxShare'),
    postGuess: getApi('-ajaxGuess'),
    getLottery: getApi('-ajaxLottery'),
}