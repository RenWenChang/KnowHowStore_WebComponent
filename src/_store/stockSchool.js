import { createTypes, createGetters, createMutations } from './_vuexTool';
import requestSync from './_vuexSchool'


const types = createTypes([
    "getSchoolDatas"
])

const state = {
    // runLoading:false
}

const getters = {
    ...createGetters(types),
}

const actions = {
    getSchoolDatas: async () => {
        const response = await requestSync();
        return response;
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