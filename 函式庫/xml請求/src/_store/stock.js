import { createTypes, createGetters, createMutations } from './_vuexTool';
import requestSync from './_vuexApi'


const types = createTypes([
    "postSysLogin",
    "postLogin",
    "postSavingSolverXML",
    "postProjectionSolverXML",
    "postWealthSolverXML"
])

const state = {
    // runLoading:false
}

const getters = {
    ...createGetters(types),
}

const actions = {
    postSysLogin: async (store, data) => {
        const response = await requestSync(store, types.postSysLogin, {
            url: '/api/SysLogin',
            data,
            headers: {
                'Content-Type': 'application/json',
                'client_id': 'FCB_APIClient',
                'client_secret': 'secret',
                'grant_type': 'client_credentials',
                'X-Origin-Time': '2019-05-21T09:35:58.881',
            }
        })
        return response
    },
    postLogin: async (store, data) => {
        let AuthToken = sessionStorage.getItem('AuthToken');
        const response = await requestSync(store, types.postLogin, {
            url: '/api/Login',
            data,
            headers:{
                'Content-Type': 'application/json',
                'client_id': 'FCB_API',
                'client_secret': 'secret',
                'grant_type': 'password',
                'X-Origin-Time': '2019-05-13T11:35:58.881',
                'Accept-Language': 'zh-TW',
                'Authorization': 'Bearer ' + AuthToken,
            }
        })
        return response
    },
    postSavingSolverXML: async (store, data) => {
        const response = await requestSync(store, types.postSavingSolverXML, {
            url: '/WFE/SavingSolverXML',
            data,
        })
        return response
    },
    postProjectionSolverXML: async (store, data) => {
        const response = await requestSync(store, types.postProjectionSolverXML, {
            url: '/WFE/ProjectionSolverXML',
            data,
        })
        return response
    },
    postWealthSolverXML: async (store, data) => {
        const response = await requestSync(store, types.postWealthSolverXML, {
            url: '/WFE/WealthSolverXML',
            data,
        })
        return response
    },
}
const mutations = {
    ...createMutations(types)
}

export {
    state,
    getters,
    actions,
    mutations,
}