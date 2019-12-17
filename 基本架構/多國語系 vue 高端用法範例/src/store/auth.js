// This is a template of vuex module
import { createTypes, createGetters, createMutations } from './_vuexTool';
import requestSync from './_vuexApi'

const types = createTypes([
    "postSysLogin",
    "postLogin",
    "postRefreshToken"
])

const state = {

}

const getters = {
    ...createGetters(types)
}

const actions = {
    postSysLogin: async (store, data) => {
        const response = await requestSync(store, types.postSysLogin, {
            url: '/api/SysLogin',
            data,
            headers: {
                'Content-Type': 'application/json',
                'client_id': 'WFP_APIClient',
                'client_secret': 'secret',
                'grant_type': 'client_credentials',
                'X-Origin-Time': '2019-05-21T09:35:58.881',
            }
        })
        return response
    },
    postLogin: async (store, datas) => {
        const { data, headers } = datas;
        const response = await requestSync(store, types.postLogin, {
            url: '/api/Login/',
            data,
            headers
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