import axios from 'axios'

export default async function requestSync() {
    let axiosResponse = null
    try {
        axiosResponse = await axios({
            url: 'https://life.firstbank.com.tw/wp-json/wp/v2/posts?tags=881',
            method: 'get'
        })
    } catch (error) {
        // eslint-disable-next-line
        const {  message } = error;
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
    }
    return JSON.parse(JSON.stringify(axiosResponse.data))
}