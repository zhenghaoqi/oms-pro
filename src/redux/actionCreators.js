import * as TYPE from './actionTypes';

const setLanguage = language => {
    return {
        type: TYPE.SET_LANGUAGE,
        payload: {
            language
        }
    }
}

const setFlowStatus = status => ({
    type: TYPE.SET_FLOW_STATUS,
    payload: {
        status
    }
})

const setFlow = flow => ({
    type: TYPE.SET_FLOW,
    payload: {
        flow
    }
})

const toggleMaskLayer = visible => ({
    type: TYPE.TOGGLE_MASK_LAYER,
    payload: {
        visible
    }
})

const setMykadInfo = info => ({
    type: TYPE.SET_MYKAD_INFO,
    payload: {
        mykadInfo: info
    }
})

const setPassportInfo = info => ({
    type: TYPE.SET_PASSPORT_INFO,
    payload: {
        passportInfo: info
    }
})

const updateDialog = dialog => ({
    type: TYPE.UPDATE_DIALOG,
    payload: {
        dialog
    }
})

const setExchangeRate = rate => ({
    type: TYPE.SET_EXCHANGE_RATE,
    payload: {
        exchangeRate: rate
    }
})

const setExchangeRateNum = rateNum => ({
    type: TYPE.SET_EXCHANGE_RATE_NUM,
    payload: {
        exchangeRateNum: rateNum
    }
})

const resetStore = () => ({
    type: TYPE.RESET_STORE,
})

const setMuted = (isMuted) => ({
    type: TYPE.TOGGLE_MUTED,
    payload: {
        muted: isMuted
    }
})

const setThanksLanguage = (thanksLanguage) => ({
    type: TYPE.SET_THANKS_LANGUAGE,
    payload: {
        thanksLanguage
    }
})

const setTransaction = (transaction) => ({
    type:TYPE.SET_TRANSACTION,
    payload: {
        transaction: transaction
    }
})

const closeDialog = dialogId => updateDialog(dialogId)

export {
    setLanguage,
    setFlow,
    toggleMaskLayer,
    setMykadInfo,
    setPassportInfo,
    updateDialog,
    closeDialog,
    resetStore,
    setExchangeRate,
    setMuted,
    setThanksLanguage,
    setFlowStatus,
    setTransaction,
    setExchangeRateNum
}
