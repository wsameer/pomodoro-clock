import React from "react";
import TimerSetting from "./TimerSetting";
import TimerSettingTitle from "./TimerSettingTitle";

const TimerSettingSection = ({
    titleId,
    title,
    length,
    lengthId,
    primaryBtn,
    secondaryBtn,
}) => {
    return (
        <div className="col me-2">
            <TimerSettingTitle id={titleId} title={title} />
            <div className="row mt-2 align-items-center">
                <TimerSetting
                    className="col btn btn-success"
                    data={primaryBtn}
                    value="+"
                />
                <div className="col" id={lengthId}>
                    {length}
                </div>
                <TimerSetting
                    className="col btn btn-danger"
                    data={secondaryBtn}
                    value="-"
                />
            </div>
        </div>
    );
};

export default TimerSettingSection;
