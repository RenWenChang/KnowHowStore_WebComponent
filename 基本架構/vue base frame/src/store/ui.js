// This is a template of vuex module
import { createTypes, createGetters, createMutations } from './_vuexTool';

const types = createTypes([

])

const state = {
    page: {},
    memu: true,
    tabs: []
}

const getters = {
    menuState: function(state) {
        return state.memu
    },
    tabs: function(state) {
        let tabs = state.tabs
        if (tabs.length === 0) {
            const tabDocString = sessionStorage.getItem("tabDocs")
            if (tabDocString) {
                tabs = JSON.parse(tabDocString)
            }
        }
        return tabs
    },
    ...createGetters(types)
}

const actions = {
    setMenu: (store, stateValue) => {
        store.commit('setMenu', stateValue);
    },
    createTabs: (store, newTabDocument) => {
        const tabExtraString = sessionStorage.getItem("tabDocs")
        let tabDocs = []
        if (tabExtraString) {
            tabDocs = JSON.parse(tabExtraString)
            const tabCreated = tabDocs.some((tabDoc) => {
                return tabDoc.id === newTabDocument.id
            })
            if (!tabCreated) {
                tabDocs.push(newTabDocument)
            }
        } else {
            tabDocs.push(newTabDocument)
        }
        sessionStorage.setItem("tabDocs", JSON.stringify(tabDocs))
        store.commit('setTabs', tabDocs)
    }
}

const mutations = {
    setPage(state, payload) {
        state.page = payload
    },
    setMenu(state, stateValue) {
        state.memu = stateValue
    },
    setTabs(state, tabs) {
        state.tabs = tabs
    },
    ...createMutations(types)
}

export {
    state,
    getters,
    actions,
    mutations
}