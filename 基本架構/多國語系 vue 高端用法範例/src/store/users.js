// This is a template of vuex module
import { createTypes, createGetters, createMutations } from './_vuexTool';
import requestSync from './_vuexApi'

const types = createTypes([
    "getUsers",
    "postUsers",
    "putUsers",
    "deleteUsers",
    "getUserById"
])

const state = {

}

const getters = {
    ...createGetters(types)
}

const actions = {
    getUsers: async (store) => {
        return await requestSync(store, types.getUsers, {
            url: '/v1/Users',
        })
    },
    postUsers: async (store, data) => {
        return await requestSync(store, types.postUsers, {
            url: '/v1/Users',
            data,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    },
    putUsers: async (store, data) => {
        return await requestSync(store, types.putUsers, {
            url: '/v1/Users',
            data,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    },
    deleteUsers: async (store, data) => {
        return await requestSync(store, types.deleteUsers, {
            url: '/v1/Users',
            data,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    },
    getUserById: async (store, id) => {
        return await requestSync(store, types.getUserById, {
            url: `/v1/Users/${id}`,
        })
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