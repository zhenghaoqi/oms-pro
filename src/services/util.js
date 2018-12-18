import Axios from 'axios';
import interceptors, { setLogger } from './interceptors';

const defaultConfig = {
    timeout: 10000,
}

let axios = Axios.create();

/**
 * 设置Axios默认行为
 * @param {Object} config Axios配置对象
 */
const setAxiosConfig = config => {
    axios = Axios.create(config || defaultConfig);
    axios.interceptors.response.use(interceptors.logResponse, interceptors.logPromiseError);
}

/**
 * 设置日志记录函数
 * @param {Function} logger 日志记录函数 
 */
const setAxiosLogger = logger => {
    setLogger(logger);
}

/**
 * 发起AJAX请求
 * @param {String} url 请求URL
 * @param {Object} config 请求配置对象
 */
const request = async (url, config = {}) => {
    return axios(url, config);
}

/**
 * 如果请求失败，重试请求直至最大次数
 * 
 * @param {Function} request 需要执行的请求
 * @param {Number} retryNum 最多执行次数
 */
const requestWithRetry = async (request, retryNum = 3) => {
    for (let i = 0; i < retryNum; i++) {
        try {
            return await request();
        } catch (e) {
        }
    }
}

export {
    request,
    requestWithRetry,
    setAxiosConfig,
    setAxiosLogger,
}

export default request;