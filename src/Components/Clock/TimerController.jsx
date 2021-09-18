import React from "react";

const TimerController = ({ resetTimer, startTimer }) => (
    <div className="mt-2">
        <button
            className="btn btn-outline-dark me-2"
            id="start_stop"
            onClick={startTimer}
        >
            <span className="text-primary">Play</span> |{" "}
            <span className="text-danger">Pause</span>
        </button>
        <button
            className="btn btn-outline-dark me-2"
            id="reset"
            onClick={resetTimer}
        >
            <span className="text-success">Reset</span>
        </button>
    </div>
);

export default TimerController;
