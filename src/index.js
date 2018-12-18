import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './containers/App';
import { setRequestConfig, setServiceLogger } from './services';
import {debug} from "./Util";


try {
    console = {warn:function(){}}
    window.IS_PRODUCTION = process.env.NODE_ENV !== 'development';
    /* global IS_PRODUCTION:true */
    if (IS_PRODUCTION) {


        document.onkeydown = function (event) {

            if (event.keyCode === 122) {
                event.keyCode = 0;
                event.preventDefault();
            }    //屏蔽F11
            if ((window.event.altKey) &&
                ((window.event.keyCode === 37) ||   //屏蔽 Alt+ 方向键 ←
                    (window.event.keyCode === 39))) {  //屏蔽 Alt+ 方向键 →
            }
            if (((event.keyCode === 8) && !(((event.target.nodeName === 'INPUT') && (!event.target.getAttribute('readonly'))) || (event.target.nodeName === 'TEXTAREA'))) ||                 //屏蔽退格删除键
                (event.keyCode === 116) ||                 //屏蔽 F5 刷新键
                (event.keyCode === 112) ||                 //屏蔽 F1 刷新键
                (event.ctrlKey && event.keyCode === 82)) { //Ctrl + R
                event.preventDefault();
            }
            if (event.ctrlKey && event.keyCode === 78) event.preventDefault();      //屏蔽Ctrl+n

            if (event.shiftKey && event.keyCode === 121) event.preventDefault();    //屏蔽shift+F10

            if (window.event.srcElement.tagName === "A" && window.event.shiftKey)
                window.event.preventDefault();       //屏蔽shift加鼠标左键新开一网页

            if (event.ctrlKey && (event.keyCode === 187 || event.keyCode === 189 || event.keyCode === 107 || event.keyCode === 109)) event.preventDefault();

        };
        document.oncontextmenu = function (event) {//禁止右键menu
            event.preventDefault();
        };
        document.ontouchstart = function (event) {//禁止长按刷新？
        };

        const scrollFunc = function (e) {
            e = e || window.event;
            if (e.wheelDelta && e.ctrlKey) {//IE/Opera/Chrome
                e.cancelBubble = true;
                return false;
            }
            e.preventDefault();
        };

        window.onmousewheel = document.onmousewheel = scrollFunc;//IE


        if (!window.deleteHistoryFlag) {
            window.addEventListener('popstate', function () {
                window.history.pushState(null, null, document.URL);
            });
            window.addEventListener('hashchange', function() {
                window.history.pushState(null, null, document.URL);
            });
            window.deleteHistoryFlag = true;
        }
        window.history.pushState(null, null, document.URL);

    }

    window.onhelp = function () {
        return false
    };       //屏蔽F1帮助

    window.onerror = function (msg) {
        try {
            msg = JSON.stringify(msg);
            debug(msg);
        } catch (e) {
            debug(e);
        }
    };


} catch (e) {
    console.error(e);
} finally {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
    document.getElementById('root'));
}
