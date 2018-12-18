
/**
 * 是否位null或者undefined
 * @method isNullOrUndefined
 * @param {*} arg
 * @returns {boolean}
 */
export function isNullOrUndefined(arg) {
    return arg == null;
}

export function isPrimitive(value) {
    return value == null || (typeof value !== 'function' && typeof value !== 'object');
}

export function isIE() {
    return !!window.ActiveXObject || "ActiveXObject" in window;
}

/**
 * 是否位function
 * @method isFunction
 * @param {*} arg
 * @returns {boolean}
 */
export function isFunction(arg) {
    return typeof arg === 'function';
}

export function getFunName(fn) {
    if (typeof fn === 'function') {
        const reg = /function\s*(\w*)/i;//匹配方法名
        return reg.exec(fn.toString())[1];
    } else {
        return false;
    }
}

export function findByErrorCode(errorCode) {
    const outCode = errorCode;
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
    try {
        errorCode = errorCode.split('');
    } catch (e) {
        return {
            code: 'E43666',
            terminal: TERMINAL[3],
            level: 'info'
        }
    }
    const levelCode = errorCode[2],
        terminalCode = errorCode[1],//终端
        terminal = TERMINAL[terminalCode] || 'not found',
        level = ERROR_LEVEL[levelCode] || 'others';//错误等级
    return {
        code: outCode,
        terminal,
        level
    }
}

export const dateformat = () => {
    return 'YYYY-MM-DDTHH:mm:ss.SSSZZ'
};

export const removeSpace = str => {
    if (!str || typeof str !== 'string') return str;
    return str.replace(/\s+/g, "");
};


window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

/**
 *
 * @param scrollTargetY
 * @param speed {number} 0.1-0.8
 * @param easing
 * @param dom
 */
export const scrollToY = (scrollTargetY, speed, easing, dom) => {
    scrollTargetY = scrollTargetY || 0;
    speed = speed || 0.3;
    easing = easing || 'easeOutSine';
    const scrollY = dom.scrollTop
    let currentTime = 0;
    // min time .1, max time .8 seconds
    const time = speed;

    // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
    const easingEquations = {
        linear: function (pos) {
            return pos;
        },
        easeOutSine: function (pos) {
            return Math.sin(pos * (Math.PI / 2));
        },
        easeInOutSine: function (pos) {
            return (-0.5 * (Math.cos(Math.PI * pos) - 1));
        },
        easeInOutQuint: function (pos) {
            if ((pos /= 0.5) < 1) {
                return 0.5 * Math.pow(pos, 5);
            }
            return 0.5 * (Math.pow((pos - 2), 5) + 2);
        }
    };

    // add animation loop
    function tick() {
        currentTime += 1 / 60;

        const p = currentTime / time;
        const t = easingEquations[easing](p);

        if (p < 1) {
            requestAnimationFrame(tick);
            dom.scrollTop = scrollY + ((scrollTargetY - scrollY) * t);
        } else {
            dom.scrollTop = scrollTargetY;
        }
    }

    // call it once to get started
    tick();
};

export const moveToError = (formItem, outDom) => {
    const domTop = formItem.formItem.getBoundingClientRect().top
    if (domTop < outDom.section.clientHeight && domTop > 0) return;
    const domOffsetHeight = formItem.formItem.parentElement.offsetHeight;
    const top = domTop + outDom.section.scrollTop - domOffsetHeight;
    scrollToY(top, 0.3, 'linear', outDom.section);
};

export const flowStat = {
    NORMAL: 'NORMAL',//正常
    ABNORMAL: 'ABNORMAL',//异常
    ACTIVE: 'ACTIVE'//主动退出
}
