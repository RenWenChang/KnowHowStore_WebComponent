import { createTypes, createGetters, createMutations } from './_vuexTool';
import requestSync from './_vuexLINE-api'
import qs from 'qs';

const types = createTypes([
    "postGotToken",
    "GetUserProfile"

])

const state = {
}

const getters = {
    ...createGetters(types),
}

const actions = {
    postGotToken: async (store, datas) => {
        let envs = window.__env__;
        const urlName = `${process.env.VUE_APP_URL_NAME}`;
        let client_id = envs[urlName].VUE_APP_LINE_CLIENT_ID;
        let client_secret = envs[urlName].VUE_APP_LINE_CLIENT_SECRET;
        const response = await requestSync(store, types.postGotToken, {
            url: `https://api.line.me/oauth2/v2.1/token`,
            data: qs.stringify({
                grant_type: 'authorization_code',
                code: datas,
                redirect_uri:`${window.location.origin}/efirstWeb/LINE_Login_Landing`,
                client_id: `${client_id}`,
                client_secret: `${client_secret}`
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache'
            }
        });

        return response
    },
    GetUserProfile: async (store) => {
        const LINE_Token = sessionStorage.getItem('LINE_Token');
        const response = await requestSync(store, types.GetUserProfile, {
            url: `https://api.line.me/v2/profile`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + LINE_Token,
                'Cache-Control': 'no-cache'
            }
        });
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