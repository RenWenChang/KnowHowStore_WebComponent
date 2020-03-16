import { createTypes, createGetters, createMutations } from './_vuexTool';
import requestSync from './_vuexApi'
let envs = window.__env__;
const urlName = `${process.env.VUE_APP_URL_NAME}`;
let LOGIN_DEV = envs[urlName].LOGIN_DEV;
let FINROBO_DEV = envs[urlName].FINROBO_DEV;
const types = createTypes([
    "getOptionList",
    "postSysLogin",
    "postLogin",
    "getFAQs",
    "getFAQsAnswer",
    "getNEWs",
    "postSysLogin__FINROBO"

])

const state = {
    // runLoading:false
}

const getters = {
    ...createGetters(types),
}

const actions = {
    getOptionList: async (store, datas) => {
        const { data, id } = datas;
        const response = await requestSync(store, types.getOptionList, {
            url: `/Common/Options/${id}`,
            data
        });
        return response
    },
    postSysLogin: async (store, data) => {
        const response = await requestSync(store, types.postSysLogin, {
            url: `${LOGIN_DEV}/SysLogin`,
            data,
            headers: {
                'Content-Type': 'application/json',
                'client_id': 'FCB_APIClient',
                'client_secret': 'secret',
                'grant_type': 'client_credentials',
                'X-Origin-Time': '2019-05-21T09:35:58.881',
                'Cache-Control':'no-cache'
            }
        })
        let sysToken = response.Datas.TokenId;
        sessionStorage.setItem("AuthToken", sysToken);
        return response
    },
    postSysLogin__FINROBO: async (store, data) => {
        Date.prototype.Format = function (fmt) { 
            let o = {
                "M+": this.getMonth() + 1, //月份 
                "d+": this.getDate(), //日 
                "h+": this.getHours(), //小时 
                "m+": this.getMinutes(), //分 
                "s+": this.getSeconds(), //秒 
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                "S": this.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
        
        let time = new Date().Format("yyyy-MM-dd hh:mm:ss.S");
        const response = await requestSync(store, types.postSysLogin__FINROBO, {
            url:  `${FINROBO_DEV}/api/SysLogin`,
            data,
            headers: {
                'Content-Type': 'application/json',
                'client_id': 'FCB_APIClient',
                'client_secret': 'secret',
                'grant_type': 'client_credentials',
                'X-Origin-Time': `${time}`,
                'Cache-Control':'no-cache'
            }
        })
        let sysToken__FINROBO = response.Datas.TokenId;
        sessionStorage.setItem("AuthToken__FINROBO", sysToken__FINROBO);
        return response
    },
    postLogin: async (store, data) => {
        let AuthToken = sessionStorage.getItem('AuthToken');
        const response = await requestSync(store, types.postLogin, {
            url: `${LOGIN_DEV}/Login`,
            data,
            headers: {
                'Content-Type': 'application/json',
                'client_id': 'FCB_API',
                'client_secret': 'secret',
                'grant_type': 'password',
                'X-Origin-Time': '2019-05-13T11:35:58.881',
                'Accept-Language': 'zh-TW',
                'Authorization': 'Bearer ' + AuthToken,
                'Cache-Control':'no-cache'
            }
        })
        return response
    },

    getFAQs: async (store, data) => {
        const response = await requestSync(store, types.getFAQs, {
            url: `/FAQs`,
            data,

        });
        return response
    },
    getFAQsAnswer: async (store, datas) => {
        const { data, id } = datas;
        const response = await requestSync(store, types.getFAQsAnswer, {
            url: `/FAQs/FAQAnswer/${id}`,
            data,

        });
        return response
    },
    getNEWs:async (store, data) => {
        const response = await requestSync(store, types.getNEWs, {
            url: `/NEWs`,
            data,

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