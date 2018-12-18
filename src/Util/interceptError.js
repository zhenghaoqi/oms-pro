import * as _ from '../Util'
import moment from 'moment'
const ERROR_LEVEL = {
    0: '',
    1: 'error',
    2: 'warning',
    3: 'info',
    4: ''
};
const TERMINAL = {
    1: 'c++',
    2: 'c#',
    3: 'java'
};
export const fnRecord = {dispatchShowDialog:function(){},dispatchShowLoading:function(){}};//重试记录
let cStartTime,cEndTime = new Date().getSeconds();

/**
 * 切c#
 * 根据返回值的不同设置log值
 * @param target
 * @param key
 * @param descriptor
 * @returns {*}
 */
export const interceptLog = function (target, key, descriptor) {
    const fn = target[key];
    descriptor.value = function () {
        const reg = /function\s*(\w*)/i;//匹配方法名
        let level,
            trigger = `c#(${key ? key: `callBack`})`,
            data = '',
            res;
        for (const i in arguments) {
            try {
                JSON.parse(arguments[0]);
                break;
            } catch (e) {
                if(typeof arguments[i] === 'object'){
                    data += JSON.stringify(arguments[i]) + ",";
                    continue;
                }
                data += arguments[i] || `,`
            }
        }

        cStartTime = _formatDate(new Date());//before
        const promise = fn.call(this, ...arguments);
        promise.then(function (msg) {
            return Promise.reject({promiseStatus: 'success', msg: msg});//未出错情况
        }).catch(function (finallyData) {
            let errorCode;
            if (typeof finallyData === 'string') {//根本没有调用到c#时的情况
                level = 'error';
                res = finallyData;//错误信息
            } else if (finallyData.hasOwnProperty('promiseStatus')) {//调用成功的情况,流水记录
                level = 'others';
                res = finallyData.msg;//正常情况下的回调
            } else {//调用成功但c#或c++报错情况
                try {
                    finallyData = JSON.parse(finallyData);//c#
                    errorCode = finallyData.errorCode;
                } catch (e) {
                    errorCode = finallyData.errorCode;//c++
                }
                const codeObj = _findByErrorCode(errorCode);
                level = codeObj.level;
                trigger = codeObj.terminal + ' ( ' + reg.exec(fn.toString())[1] + ' )';
                res = finallyData;//出错情况下的错误信息,message为错误信息
            }
            if (JSON.stringify(res).length > 3000) {//不记录base64的response
                res = 'response is to long'
            }

            if (JSON.stringify(data).length > 3000) {
                data = 'request is to long'
            }

            cEndTime = _formatDate(new Date());//after
            _.debug({//记录日志
                level,
                startTime: cStartTime,
                endTime: cEndTime,
                data,//request参数
                res,
                trigger
            });
        });
        return promise;
    };
    return descriptor;
};

/**
 * 返回当前时间
 * @param date
 * @returns {string}
 * @private
 */
const _formatDate = date => moment(date).format('MMMM Do YYYY, h:mm:ss a');

const _findByErrorCode = errorCode => {
    if(typeof errorCode !== 'string'){
        return {
            terminal:'errorCode is not found',
            level:'others'
        }
    }
    const levelCode = errorCode[2],
        terminalCode = errorCode[1],//终端
        terminal = TERMINAL[terminalCode] || 'terminal not found,code 【'+terminalCode+'】',
        level = ERROR_LEVEL[levelCode] || 'others';//错误等级
    return {
        terminal,
        level
    }
};
