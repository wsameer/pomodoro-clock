import React, { useState, useEffect } from "react";

const TimerSection = ({ activeTimer, timer, playPauseTimer, resetTimer }) => {
    const [time, setTime] = useState(timer);

    useEffect(() => {
        let minutes = String(Math.floor(timer / 60));
        let seconds = String(timer % 60);
        if (seconds?.length === 1) seconds = "0" + seconds;
        if (minutes?.length === 1) minutes = "0" + minutes;
        setTime(minutes + ":" + seconds);
    }, [timer]);

    return (
        <div class="col card text-center mt-4">
            <div class="card-body">
                <h3 id="timer-label" className="card-title text-uppercase">
                    {activeTimer}
                </h3>
                <h1 className="text-jumbo" id="time-left">
                    {time}
                </h1>
            </div>
            <div class="card-footer">
                <TimerController
                    resetTimer={resetTimer}
                    playPauseTimer={playPauseTimer}
                />
            </div>
        </div>
    );
};

export default TimerSection;
