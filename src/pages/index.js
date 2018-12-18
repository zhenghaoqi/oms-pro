import React from 'react'
import intl from "react-intl-universal";
import {flowStat} from "../Util";

export default class BaseComponent extends React.Component {
    constructor(props, context, updater) {
        super(props, context, updater);
        this.home = {}
    }

    timeoutEnd(flowStatus) {//TOP流程中timeout到后设置language flowStatus
        this.props.setFlowStatus(flowStat[flowStatus]);
        this.props.history.push('/TopUpCollectCard')
    }

    getFlowStat() {
        return flowStat;
    }


    goToHome() {
        this.props.history.push('/');
    }

    alertError(level, message, onClick, backHomeClick) {
        const options = {
            level: level,
            message: message,
            buttonGroups: [
                {
                    text: intl.get("btn_confirm"),
                    type: "primary",
                    onClick: () => {//平常情况下如果有onclick传入，采用onClick并且使用goToHome
                        onClick && onClick();
                        this.goToHome();
                    }
                }
            ]
        };
        switch (level) {
            case 'error-timeout'://error-timeout时，如果有onclick事件传入，采用onclick方法，摒弃goToHome
                options.timer = {
                    timeout: () => {
                        onClick ? onClick():this.goToHome();
                    }
                };
                options.buttonGroups = [
                    {
                        text: intl.get("btn_confirm"),
                        type: "primary",
                        onClick: () => {
                            onClick ? onClick():this.goToHome();
                        }
                    }
                ]
                break;
            case 'warning'://warning情况下如果有onClick传入，采用onClick方法
                options.buttonGroups = [
                    {
                        text: intl.get('btn_confirm'),
                        type: "primary",
                        onClick: () => {
                            onClick && onClick();
                        }
                    }
                ];
                break;
            case 'timeout' :
                options.buttonGroups = [
                    {
                        text:intl.get("btn_backToHome"),
                        type:"secondary",
                        onClick:()=>{
                            this.props.closeDialog();
                            backHomeClick && backHomeClick();
                            this.goToHome();
                        }
                    },
                    {text:intl.get("btn_confirm"), type:"primary",onClick:() => {
                            onClick && onClick();
                        }}
                ];
                options.timer = {seconds:20,timeout:()=>{
                        this.props.closeDialog();
                        this.goToHome();
                    }};
                break;
            case 'loading':
                options.message = undefined;
                options.buttonGroups = undefined;
                break;
            case 'error':
                options.buttonGroups = [
                    {
                        text:intl.get("btn_confirm"),
                        type:'primary',
                        onClick:() => {
                            onClick && onClick();
                        }
                    }
                ];
                break;
            default:break;
        }
        this.props.updateDialog(options);
    }

    alertExit(onClick) {
        this.props.updateDialog({
            level: 'exit',
            buttonGroups: [
                {
                    text: intl.get('btn_cancel'),
                    type: "secondary"
                },
                {
                    text: intl.get('btn_exit'),
                    type: "primary",
                    onClick: ()=> {
                        onClick && onClick();
                        this.props.closeDialog();
                        this.goToHome();
                    }
                }
            ]
        });
    }


}
