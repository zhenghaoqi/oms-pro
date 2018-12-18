import * as TYPE from './actionTypes';
import intl from "react-intl-universal"
import {flowStat} from "../Util";

const _createReducer = (initialState, handlers) => {
    return (state = initialState, action) => {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    }
}

const transaction = _createReducer({}, {
    [TYPE.SET_TRANSACTION]: (state, action) => action.payload.transaction
})

const mute = _createReducer(false, {
    [TYPE.TOGGLE_MUTED]: (state, action) => action.payload.muted
})

const language = _createReducer('en-US', {
    [TYPE.SET_LANGUAGE]: (state, action) => action.payload.language
})

const flow = _createReducer('', {
    [TYPE.SET_FLOW]: (state, action) => action.payload.flow
})

const exchangeRate = _createReducer('', {
    [TYPE.SET_EXCHANGE_RATE]: (state, action) => action.payload.exchangeRate
})

const exchangeRateNum = _createReducer('1', {
    [TYPE.SET_EXCHANGE_RATE_NUM]: (state, action) => action.payload.exchangeRateNum
})

const customerInfo = _createReducer({}, {
    [TYPE.SET_MYKAD_INFO]: (state, action = {payload:{}}) => _updateObject(state, { mykadInfo: action.payload.mykadInfo }),
    [TYPE.SET_PASSPORT_INFO]: (state, action = {payload:{}}) => _updateObject(state, { passportInfo: action.payload.passportInfo })
})

const ui = _createReducer({}, {
    [TYPE.TOGGLE_MASK_LAYER]: (state, action) => _updateObject(state, { showMaskLayer: action.payload.visible }),
    [TYPE.UPDATE_DIALOG]: (state, action) => _updateObject(state, _handleDialog(state, action.payload.dialog))
})

const thanksLanguage = _createReducer(intl.get("thanks_title1"), {
    [TYPE.SET_THANKS_LANGUAGE]: (state, action) => action.payload.thanksLanguage
})

const flowStatus = _createReducer(flowStat.NORMAL, {
    [TYPE.SET_FLOW_STATUS]: (state, action) => action.payload.status
})

const _updateObject = (oldObject, newValues) => ({ ...oldObject, ...newValues })
// const _updateItemInArray = (array, itemId, updateItemCallback) => {
//     return array.map(item => {
//         if (item.id !== itemId) {
//             return item;
//         }
//         const updatedItem = updateItemCallback(item);
//         return updatedItem;
//     });
// }
const _handleDialog = (oldState, dialog) => {
    if( !dialog ){ //close all dialog
        return {dialog:[]};
    }else if(typeof dialog === "number"||typeof dialog === "string"){ //close index=dialog|level=dialog 的dialog
        if(oldState.dialog && oldState.dialog.length){
            if(typeof dialog === "string"){
                let index;
                for(let i=1, len=oldState.dialog.length;i<=len;i++){
                    if(oldState.dialog[i-1].level === dialog){
                        index = i;
                        break;
                    }
                }
                if(!index){
                    return {dialog:oldState.dialog};
                }else{
                    dialog = index;
                }
            }
            dialog --;
            const newDialog = [...oldState.dialog.slice(0,dialog),...oldState.dialog.slice(dialog+1)];
            return {dialog:newDialog};
        }
        return {dialog:[]};
    }else{ // new dialog show
        if(oldState.dialog){
            return {dialog:[...oldState.dialog, dialog]};
        }
        return {dialog:[dialog]};
    }
};

export {
    language,
    flow,
    exchangeRate,
    customerInfo,
    ui,
    mute,
    thanksLanguage,
    flowStatus,
    transaction,
    exchangeRateNum
}
