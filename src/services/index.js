import CONSTANTS from './constants';
import request, { requestWithRetry, setAxiosConfig, setAxiosLogger } from './util';

/**
 * 设定请求行为
 * @param {Object} config 请求配置对象 
 */
export const setRequestConfig = config => setAxiosConfig(config);

/**
 * 设置日志记录函数
 * @param {Function} logger 日志记录函数 
 */
export const setServiceLogger = logger => setAxiosLogger(logger);

/**
 * 获取条款PDF图片信息
 */
export const getPdfImageList = async () => {
    return await requestWithRetry(() => request(CONSTANTS.SERVICE_URL_GET_PDF_IMAGE));
}

/**
 * 检查给定的电话号码是否可用
 * @param {String} phoneNum 电话号码
 * @param {String} countryCode 国家码，默认+86
 */
export const checkPhoneAvailable = async (phoneNum, countryCode = '+60') => {
    return await requestWithRetry(() => request(CONSTANTS.SERVICE_URL_PHONE_CHECK, {
        method: 'post',
        data: {
            phoneNum,
            countryCode
        }
    }));
}

/**
 * 查询实时汇率
 */
export const getRates = async () => {
    return await requestWithRetry(() => request(CONSTANTS.SERVICE_URL_GET_RATES));
}

/**
 * 创建或更新交易记录
 * @param {Object} transaction 交易记录
 */
export const updateTransaction = async (transaction) => {
    return await requestWithRetry(() => request(CONSTANTS.SERVICE_URL_UPDATE_TRANSACTION), {
        method: 'post',
        data: transaction
    });
}

/**
 * 创建账户
 * @param {Object} cardInfo 卡信息
 */
export const createAccount = async (cardInfo) => {
    return await requestWithRetry(() => request(CONSTANTS.SERVICE_URL_CREATE_ACCOUNT), {
        method: 'post',
        data: cardInfo
    });
}