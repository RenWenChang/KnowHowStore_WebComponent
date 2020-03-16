const state = {
    runLoading: false,
    expLightBox: false,
    classroomData: [],
    isExperiencePage: false,
    ispt: false,
    photoShotting: false,
    ExperienceInput: false,
    canRegetRaw:false,
    canRegetRaw__isInit:true,
    blockInvestmentInfo:false,
    toScreen:0,
}

const getters = {
    loadingRes: function(state) {
        return state.runLoading
    },
    expLightBoxRes: function(state) {
        return state.expLightBox
    },
    classroomDataRes: function(state) {
        return state.classroomData
    },
    isExperiencePage: function(state) {
        return state.isExperiencePage
    },
    ispt: function(state) {
        return state.ispt
    },
    photoShotting: function(state) {
        return state.photoShotting
    },
    ExperienceInput: function(state) {
        return state.ExperienceInput
    },
    canRegetRaw: function (state) {
        return state.canRegetRaw
    },
    canRegetRaw__isInit: function (state) {
        return state.canRegetRaw__isInit
    },
    blockInvestmentInfo: function (state) {
        return state.blockInvestmentInfo
    },
    changeScreenRes: function (state) {
        return state.toScreen
    },

}

const actions = {
    toggleLoading: (store, stateValue) => {
        store.commit('setLoading', stateValue)
    },
    toggleExpLightBox: (store, stateValue) => {
        store.commit('setExpLightBox', stateValue)
    },
    toggleClassroomData: (store, stateValue) => {
        store.commit('setClassroomData', stateValue)
    },
    toggleisExperiencePage: (store, stateValue) => {
        store.commit('setExperiencePage', stateValue)
    },
    toggleispr: (store, stateValue) => {
        store.commit('setpt', stateValue)
    },
    togglePhotoShotting: (store, stateValue) => {
        store.commit('setPhotoShotting', stateValue)
    },
    toggleExperienceInput: (store, stateValue) => {
        store.commit('setExperienceInput', stateValue)
    },
    togglecanRegetRaw: (store, stateValue) => {
        store.commit('setcanRegetRaw', stateValue)
    },
    togglecanRegetRaw__isInit: (store, stateValue) => {
        store.commit('setcanRegetRaw__isInit', stateValue)
    },
    toggleBlockInvestmentInfo: (store, stateValue) => {
        store.commit('setBlockInvestmentInfo', stateValue)
    },
    changeScreenAction: (store, stateValue) => {
        store.commit('changeScreen', stateValue)
    },
}

const mutations = {
    setLoading: (state, stateValue) => {
        state.runLoading = stateValue;
    },
    setExpLightBox: (state, stateValue) => {
        state.expLightBox = stateValue;
    },
    setClassroomData: (state, stateValue) => {
        state.classroomData = stateValue;
    },
    setExperiencePage: (state, stateValue) => {
        state.isExperiencePage = stateValue;
    },
    setpt: (state, stateValue) => {
        state.ispt = stateValue;
    },
    setPhotoShotting: (state, stateValue) => {
        state.photoShotting = stateValue;
    },
    setExperienceInput: (state, stateValue) => {
        state.ExperienceInput = stateValue;
    },
    setcanRegetRaw: (state, stateValue) => {
        state.canRegetRaw = stateValue;
    },
    setcanRegetRaw__isInit: (state, stateValue) => {
        state.canRegetRaw__isInit = stateValue;
    },
    setBlockInvestmentInfo: (state, stateValue) => {
        state.blockInvestmentInfo = stateValue;
    },
    changeScreen: (state, stateValue) => {
        state.toScreen = stateValue;
    },
}

export {
    state,
    getters,
    actions,
    mutations,
}