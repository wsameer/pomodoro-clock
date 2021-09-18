import React from "react";
import PropTypes from "prop-types";
import TimerController from "./TimerController";

const TimerSection = ({
    activeTimer,
    resetTimer,
    getCurrentTime,
    startTimer,
    textColor,
}) => (
    <div className="col card text-center mt-4">
        <div className="card-body">
            <h3 id="timer-label" className="card-title text-uppercase">
                {activeTimer}
            </h3>
            <h1 className={`text-jumbo ${textColor}`} id="time-left">
                {getCurrentTime()}
            </h1>
        </div>
        <div className="card-footer">
            <TimerController resetTimer={resetTimer} startTimer={startTimer} />
        </div>
    </div>
);

TimerSection.propTypes = {
    activeTimer: PropTypes.string,
    resetTimer: PropTypes.func,
    getCurrentTime: PropTypes.func,
    startTimer: PropTypes.func,
    textColor: PropTypes.string,
};

export default TimerSection;
