/* eslint-disable */
import axios from 'axios'
import Vue from 'vue'
let envs = window.__env__;

const urlName = `${process.env.VUE_APP_URL_NAME}`;

const baseURL = envs[urlName].FCB_DEV;

// console.log(urlName);
// console.log(baseURL);

axios.defaults.baseURL = baseURL
function downloadErrorJSON(errorJSON, fileName) {
    /**
    * 用Blob創造與下載文件
    * https://codertw.com/ios/19926/
    */
    const blob = new Blob([JSON.stringify(errorJSON)], {
        type: "application/json"
    })
    const objectURL = window.URL.createObjectURL(blob);
    // Do things
    const link = document.createElement('a');
    link.href = objectURL;
    link.download = fileName;
    link.click();
    // Clear memory
    window.URL.revokeObjectURL(objectURL);
}

var ADMIN_MAX_RECONNECT_ATTEMPTS = 3;
export default async function requestSync(store, type, options) {
    /**
     * Extract Type
     * before replace: type == 'post'SaveStockAlert
     * after replace: type == ''SaveStockAlert
     * httpMethod == post
     */
    let method = 'post';
    const replacedType = type.replace(/get|post|put|delete/, (httpMethod) => {
        method = httpMethod
        return ""
    })
    /**
     * Build up axios config
     * replacedType == SaveStockAlert
     */
    const { url, data = {}, params, headers } = options
    const dataCopy = JSON.parse(JSON.stringify(data))

    // Assign custom headers to base headers
    let AuthToken = sessionStorage.getItem('AuthToken');
    let baseHeaders = {
        'X-Origin-Time': '2019-12-30 15:30:44.556',
        'Accept-Language': 'zh-TW',
        'Authorization': 'Bearer ' + AuthToken,
        'Cache-Control': 'no-cache'
    }
    // console.log('塞入Authorization: ' +AuthToken)
    const headersWithToken = Object.assign(baseHeaders, headers)

    // Complete config
    const axiosConfig = {
        url,
        method,
        params: params ? params : {},
        data: dataCopy,
        headers: headersWithToken
    }
    /**
     * Send request
     */
    let axiosResponse = {
        data: {
            Datas: {
                WFEImage: ''
            },
        },
        ResultCode: null,
    }
    try {
        axiosResponse = await axios(axiosConfig)
        // console.log({
        //     axiosResponse
        // })
        const { config, headers } = axiosResponse
        const { method, url } = config
        // eslint-disable-next-line
        const { Datas, ResultCode, Message } = axiosResponse.data
        // console.log(axiosResponse)

        switch (ResultCode) {
            case "01": {
                // 成功
                // console.log('成功')
                break;
            }
            case "02": {
                if (ADMIN_MAX_RECONNECT_ATTEMPTS !== 0) {
                    ADMIN_MAX_RECONNECT_ATTEMPTS -= 1
                    const promise = new Promise((resolve) => {
                        setTimeout(async () => {
                            await store.dispatch('postSysLogin')
                            const response = await requestSync(store, type, options)
                            resolve(response)
                        }, 1000)
                    })
                    axiosResponse.data = await promise
                }
                break;
            }
            case "03": {
                if (ADMIN_MAX_RECONNECT_ATTEMPTS !== 0) {
                    ADMIN_MAX_RECONNECT_ATTEMPTS -= 1
                    const promise = new Promise((resolve) => {
                        setTimeout(async () => {
                            await store.dispatch('postSysLogin')
                            const response = await requestSync(store, type, options)
                            resolve(response)
                        }, 1000)
                    })
                    axiosResponse.data = await promise
                }
                break;
            }
            case "10": {
                const globalVue = new Vue({});
                globalVue.$msgBox.showMsgBox({
                    content: Message,
                    isNormalBox: true,
                    isShowBtn1: true,
                    BtnText1: '確認',
                    title: '親愛的投資人，您好：',

                    fn1: () => {
                        window.location = encodeURI('/elements/')
                    }
                });
                break;
            }
        }
        // if (axiosResponse.status !== 200) {
        //     sessionStorage.clear();
        //     const globalVue = new Vue({});
        //     globalVue.$msgBox.showMsgBox({
        //         content: "error status:" + axiosResponse.status,
        //         BtnText1: "確認",
        //         isShowBtn1: true,
        //         titleClass: "",
        //         isNormalBox:true,
        //         fn1: () => {
        //             window.location = encodeURI('/elements/')
        //             console.log(config);
        //         }
        //     });
        // }
    } catch (error) {
        // eslint-disable-next-line
        const { config, request, response, message } = error;
        const { method, url, data } = config
        /**
         * 處理未捕捉的Server error, 諸如403, 404, 500
         */
        if (axiosResponse.status !== 200) {
            // store.dispatch('postSysLogin');
            // console.log(store.dispatch('postSysLogin'));
            // store.commit()
            sessionStorage.clear();
            const globalVue = new Vue({});
            globalVue.$msgBox.showMsgBox({
                content: error,
                BtnText1: "確認",
                isShowBtn1: true,
                titleClass: "",
                isNormalBox: true,
                fn1: () => {
                    window.location = encodeURI('/elements/')
                    console.log(config);
                }
            });
            axiosResponse = {
                data: {
                    Datas: {
                        WFEImage: ''
                    },
                },
                ResultCode: null,
            }
        }

    } finally {
        // console.log(axiosResponse);
        /**
         * Commit response to store state at once
         * replacedType = SaveStockAlert
         * mutationName = setSaveStockAlert
         * @type {config, data, headers, request, status, statusText} axiosResponse
         * @type {AP, Data, IsSuccessful, Message, ResultCode, WarningMessage} sswResponse
         */
        const deepCopy = JSON.parse(JSON.stringify(axiosResponse.data))
        const sswResponse = deepCopy
        const mutationName = `set${replacedType}Res`
        store.commit(mutationName, sswResponse)
    }
    return JSON.parse(JSON.stringify(axiosResponse.data))
}
