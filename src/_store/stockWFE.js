import { createTypes, createGetters, createMutations } from './_vuexTool';
import requestSync from './_vuexWFE.js'
import Vue from 'vue'

let envs = window.__env__;
const urlName = `${process.env.VUE_APP_URL_NAME}`;
let FCB_DEV = envs[urlName].FCB_DEV;
let FCB_DEV__pressuretest = envs[urlName].FCB_DEV__pressuretest;
let FINROBO_DEV = envs[urlName].FINROBO_DEV;

let showMsgBox = function (response) {
    if (!response) {
        const globalVue = new Vue({});
        globalVue.$msgBox.showMsgBox({
            content: "網路中斷，請檢查連線狀態",
            BtnText1: "確認",
            isShowBtn1: true,
            titleClass: "",
            isNormalBox:true,
            fn1: () => {
                window.location = '/elements/'
            }
        });
    }

}

const types = createTypes([
    //reGet raw
    "getSavingSolverXml",
    "getWealthSolverXML",
    "getProjectionSolverXML",
    //init
    "getSavingSolverAnswer",
    "getWealthSolverAnswer",
    "getProjectionAnswer",
    "getSavingSolverXml__url",
    "getWealthSolverXML__url",
    "getProjectionSolverXML__url",
    //finrobo
    "putSavingSolver",
    "putWealthSolver",
    "putProjection",
    "getPortPerform",
    "getRiskLevels",
    "getPortfolioAllocates",
    "postCusInfo",
    "getCusInfo",
    "getLimitAmtParam",
    //pressuretest
    "getSavingSolverXml__pressuretest",
    "getWealthSolverXML__pressuretest",
    "getProjectionSolverXML__pressuretest",
    "getPortPerform__pressuretest",
    "getRiskLevels__pressuretest",
    "getPortfolioAllocates__pressuretest",
    "getLimitAmtParam__pressuretest",

])

const state = {
    // runLoading:false
}

const getters = {
    ...createGetters(types),
}


const actions = {
    //ReGetRaw
    getSavingSolverXml: async (store) => {
        let QA = JSON.parse(sessionStorage.getItem('DataToRequestAPI__InitialPage'));
        let ModelID = JSON.parse(sessionStorage.getItem('ModelID'));
        const response = await requestSync(store, types.getSavingSolverXml, {
            url: `${FCB_DEV}/WFE/SavingSolverXml/${QA.CusAge}/${QA.TargetAmt}/${QA.InvYear}/${QA.RiskQuestion}/${QA.InvestableAmt}/${ModelID}`,
        })
        showMsgBox(response);
        return response.Datas
    },
    getWealthSolverXML: async (store) => {
        let QA = JSON.parse(sessionStorage.getItem('DataToRequestAPI__InitialPage'));
        let ModelID = JSON.parse(sessionStorage.getItem('ModelID'));
        const response = await requestSync(store, types.getWealthSolverXML, {
            url: `${FCB_DEV}/WFE/WealthSolverXml/${QA.CusAge}/${QA.WdrawAmt}/${QA.WdrawYear}/${QA.WdrawYM}/${QA.RiskQuestion}/${QA.InvestableAmt}/${ModelID}`,
        })
        showMsgBox(response);
        return response.Datas
    },
    getProjectionSolverXML: async (store) => {
        let QA = JSON.parse(sessionStorage.getItem('DataToRequestAPI__InitialPage'));
        let ModelID = JSON.parse(sessionStorage.getItem('ModelID'));
        let isBalanceAmt = JSON.parse(sessionStorage.getItem('isBalanceAmt'));
        if(isBalanceAmt===true){
            QA.SavingAmt=0;
        }else if(isBalanceAmt===false){
            QA.BalanceAmt=0
        }

        const response = await requestSync(store, types.getProjectionSolverXML, {
            url: `${FCB_DEV}/WFE/ProjectionXml/${QA.CusAge}/${QA.BalanceAmt}/${QA.SavingAmt}/${QA.InvYear}/${QA.RiskQuestion}/${QA.InvestableAmt}/${ModelID}`,
        })
        sessionStorage.setItem("DataToRequestAPI__InitialPage",JSON.stringify(QA));
        showMsgBox(response);
        return response.Datas
    },




    //init
    getSavingSolverAnswer: async (store) => {
        let QA = JSON.parse(sessionStorage.getItem('DataToRequestAPI__InitialPage'));
        const response = await requestSync(store, types.getSavingSolverXml, {
            url: `${FCB_DEV}/WFE/SavingSolverAnswer/${QA.CusAge}/${QA.TargetAmt}/${QA.InvYear}/${QA.RiskQuestion}/${QA.InvestableAmt}`,
        })
        showMsgBox(response);
        return response.Datas
    },
    getWealthSolverAnswer: async (store) => {
        let QA = JSON.parse(sessionStorage.getItem('DataToRequestAPI__InitialPage'));
        const response = await requestSync(store, types.getWealthSolverXML, {
            url: `${FCB_DEV}/WFE/WealthSolverAnswer/${QA.CusAge}/${QA.WdrawAmt}/${QA.WdrawYear}/${QA.WdrawYM}/${QA.RiskQuestion}/${QA.InvestableAmt}`,
        })
        showMsgBox(response);
        return response.Datas
    },
    getProjectionAnswer: async (store) => {
        let QA = JSON.parse(sessionStorage.getItem('DataToRequestAPI__InitialPage'));
        const response = await requestSync(store, types.getProjectionSolverXML, {
            url: `${FCB_DEV}/WFE/ProjectionAnswer/${QA.CusAge}/${QA.BalanceAmt}/${QA.SavingAmt}/${QA.InvYear}/${QA.RiskQuestion}/${QA.InvestableAmt}`,
        })
        showMsgBox(response);
        return response.Datas
    },
    getSavingSolverXml__url: async (store, url) => {
        const response = await requestSync(store, types.getSavingSolverXml, {
            url: url,
        })
        showMsgBox(response);
        return response.Datas
    },
    getWealthSolverXML__url: async (store, url) => {
        const response = await requestSync(store, types.getWealthSolverXML, {
            url: url,
        })
        showMsgBox(response);
        return response.Datas
    },
    getProjectionSolverXML__url: async (store, url) => {
        const response = await requestSync(store, types.getProjectionSolverXML, {
            url: url,
        })
        showMsgBox(response);
        return response.Datas
    },

    //finROBO
    putSavingSolver: async (store, data) => {
        let AuthToken =sessionStorage.getItem('AuthToken__FINROBO') ;
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
        const response = await requestSync(store, types.putSavingSolver, {
            headers: {
                'X-Origin-Time': `${time}`,
                'Accept-Language': 'zh-TW',
                'Authorization': 'Bearer ' + AuthToken,
                'Cache-Control':'no-cache'
            },
            url: `${FINROBO_DEV}/WFE/SavingSolver`,
            data,
        })
        showMsgBox(response);
        return response
    },
    putWealthSolver: async (store, data) => {
        let AuthToken =sessionStorage.getItem('AuthToken__FINROBO')
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
        const response = await requestSync(store, types.putWealthSolver, {
            headers: {
                'X-Origin-Time': `${time}`,
                'Accept-Language': 'zh-TW',
                'Authorization': 'Bearer ' + AuthToken,
                'Cache-Control':'no-cache'
            },
            url: `${FINROBO_DEV}/WFE/WealthSolver`,
            data,
        })
        showMsgBox(response);
        return response
    },
    putProjection: async (store, data) => {
        let AuthToken = sessionStorage.getItem('AuthToken__FINROBO')
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
        const response = await requestSync(store, types.putProjection, {
            headers: {
                'X-Origin-Time': `${time}`,
                'Accept-Language': 'zh-TW',
                'Authorization': 'Bearer ' + AuthToken,
                'Cache-Control':'no-cache'
            },
            url: `${FINROBO_DEV}/WFE/Projection`,
            data,
        })
        showMsgBox(response);
        return response
    },
    getPortPerform: async (store, PortPerformURL) => {
        const response = await requestSync(store, types.getPortPerform, {
            url: PortPerformURL
        })
        showMsgBox(response);
        return response
    },
    getRiskLevels: async (store, RiskLevelURL) => {
        const response = await requestSync(store, types.getRiskLevels, {
            url: RiskLevelURL
        })
        showMsgBox(response);
        return response
    },
    getPortfolioAllocates: async (store, ModelIDURL) => {
        const response = await requestSync(store, types.getPortfolioAllocates, {
            url: ModelIDURL
        })
        showMsgBox(response);
        return response
    },
    getLimitAmtParam: async (store) => {
        const response = await requestSync(store, types.getLimitAmtParam, {
            url: `${FCB_DEV}/Common/LimitAmtParam/S001`
        })
        showMsgBox(response);
        return response
    },



    //__pressuretest


    getSavingSolverXml__pressuretest: async (store) => {
        let QA = JSON.parse(sessionStorage.getItem('DataToRequestAPI__InitialPage'));
        const response = await requestSync(store, types.getSavingSolverXml__pressuretest, {
            url: `${FCB_DEV__pressuretest}/WFE/SavingSolverXml/${QA.CusAge}/${QA.TargetAmt}/${QA.InvYear}/${QA.RiskQuestion}/${QA.InvestableAmt}`,
        })
        return response.Datas
    },
    getWealthSolverXML__pressuretest: async (store) => {
        let QA = JSON.parse(sessionStorage.getItem('DataToRequestAPI__InitialPage'));
        const response = await requestSync(store, types.getWealthSolverXML__pressuretest, {
            url: `${FCB_DEV__pressuretest}/WFE/WealthSolverXml/${QA.CusAge}/${QA.WdrawAmt}/${QA.WdrawYear}/${QA.WdrawYM}/${QA.RiskQuestion}/${QA.InvestableAmt}`,
        })
        return response.Datas
    },
    getProjectionSolverXML__pressuretest: async (store) => {
        let QA = JSON.parse(sessionStorage.getItem('DataToRequestAPI__InitialPage'));
        const response = await requestSync(store, types.getProjectionSolverXML__pressuretest, {
            url: `${FCB_DEV__pressuretest}/WFE/ProjectionXml/${QA.CusAge}/${QA.BalanceAmt}/${QA.SavingAmt}/${QA.InvYear}/${QA.RiskQuestion}/${QA.InvestableAmt}`,
        })
        return response.Datas
    },
    getPortPerform__pressuretest: async (store, PortPerformURL) => {
        const response = await requestSync(store, types.getPortPerform__pressuretest, {
            url: PortPerformURL
        })
        return response
    },
    getRiskLevels__pressuretest: async (store, RiskLevelURL) => {
        const response = await requestSync(store, types.getRiskLevels__pressuretest, {
            url: RiskLevelURL
        })
        return response
    },
    getPortfolioAllocates__pressuretest: async (store, ModelIDURL) => {
        const response = await requestSync(store, types.getPortfolioAllocates__pressuretest, {
            url: ModelIDURL
        })
        return response
    },
    getLimitAmtParam__pressuretest: async (store) => {
        const response = await requestSync(store, types.getLimitAmtParam__pressuretest, {
            url: `${FCB_DEV__pressuretest}/Common/LimitAmtParam/S001`
        })
        return response
    },

    postCusInfo: async (store, allinfo) => {
        const response = await requestSync(store, types.postCusInfo, {
            url: `${FCB_DEV}/CusInfo`,
            data: allinfo
        })
        return response
    },
    getCusInfo: async (store, FileName) => {
        const response = await requestSync(store, types.getCusInfo, {
            url: `${FileName}`
        })
        return response
    },
    getCusInfo2: async (store, FileName) => {
        const response = await requestSync(store, types.getCusInfo, {
            url: `${FCB_DEV}/CusInfo/Image/${FileName}`
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
