import axios from 'axios'


export default async function requestSync({ commit }, type, options) {
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
    const baseHeaders = {
        'Content-Type': 'application/json',
    }
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
    let axiosResponse = null
    try {
        axiosResponse = await axios(axiosConfig)
        return axiosResponse.data
    } catch (error) {
        // eslint-disable-next-line
        console.log(error);
        const { message } = axiosResponse.data
        /**
         * 處理未捕捉的Server error, 諸如403, 404, 500
         */
        if (message) {
            alert(`${message}`)
            axiosResponse = {
                data: null,
                ResultCode: null,
            }
        }
    } finally {
        /**
         * Commit response to store state at once
         * replacedType = SaveStockAlert
         * mutationName = setSaveStockAlert
         * @type {config, data, headers, request, status, statusText} axiosResponse
         * @type {AP, Data, IsSuccessful, Message, ResultCode, WarningMessage} sswResponse
         */
        if (axiosResponse) {
            const deepCopy = JSON.parse(JSON.stringify(axiosResponse.data))
            const sswResponse = deepCopy
            const mutationName = `set${replacedType}Res`
            commit(mutationName, sswResponse)
        }

    }
    if (axiosResponse.data) {
        return JSON.parse(JSON.stringify(axiosResponse.data))
    } else {
        return axiosResponse
    }

}