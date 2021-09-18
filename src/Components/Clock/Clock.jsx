import React, { useState, useCallback } from "react";
import { accurateInterval } from "../../utils/accurateInterval";
import TimerSection from "./TimerSection";
import TimerSettingSection from "./TimerSettingSection";

const MAX_TIMER_LENGTH = 60;
const MIN_TIMER_LENGTH = 1;

export const Clock = () => {
    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(1);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [activeTimer, setActiveTimer] = useState("Session");
    const [intervalId, setIntervalId] = useState("");
    const [timer, setTimer] = useState(60);

    // TODO remove
    const audioBeep = null;

    const updateBreakLength = (event) => {
        if (isTimerActive) {
            return;
        }

        if (activeTimer === "Session") {
            if (
                event.target.innerHTML === "Down" &&
                breakLength !== MIN_TIMER_LENGTH
            ) {
                setBreakLength((prev) => prev - 1);
                // activeTimer === "Session" && setTimer(breakLength * 60 - 60);
            } else if (
                event.target.innerHTML === "Up" &&
                breakLength !== MAX_TIMER_LENGTH
            ) {
                setBreakLength((prev) => prev + 1);
                // activeTimer === "Session" && setTimer(breakLength * 60 + 60);
            }
        } else if (
            event.target.innerHTML === "Down" &&
            breakLength !== MIN_TIMER_LENGTH
        ) {
            setBreakLength((prev) => prev - 1);
            setTimer(breakLength * 60 - 60);
        } else if (
            event.target.innerHTML === "Up" &&
            breakLength !== MAX_TIMER_LENGTH
        ) {
            setBreakLength((prev) => prev + 1);
            setTimer(breakLength * 60 + 60);
        }
    };

    const updateSessionLength = (event) => {
        if (isTimerActive) {
            return;
        }
        if (activeTimer === "Break") {
            if (
                event.target.innerHTML === "Down" &&
                sessionLength !== MIN_TIMER_LENGTH
            ) {
                setSessionLength((prev) => prev - 1);
                // activeTimer === "Break" && setTimer(sessionLength * 60 - 60);
            } else if (
                event.target.innerHTML === "Up" &&
                sessionLength !== MAX_TIMER_LENGTH
            ) {
                setSessionLength((prev) => prev + 1);
                // activeTimer === "Break" && setTimer(sessionLength * 60 + 60);
            }
        } else if (
            event.target.innerHTML === "Down" &&
            sessionLength !== MIN_TIMER_LENGTH
        ) {
            setSessionLength((prev) => prev - 1);
            setTimer(sessionLength * 60 - 60);
        } else if (
            event.target.innerHTML === "Up" &&
            sessionLength !== MAX_TIMER_LENGTH
        ) {
            setSessionLength((prev) => prev + 1);
            setTimer(sessionLength * 60 + 60);
        }
    };

    const decrementTimer = () => setTimer((prev) => prev - 1);
    const switchTimer = (length, type) => {
        setActiveTimer(type);
        setTimer(length);
    };
    const buzzer = (t) => {
        t === 0 ?? audioBeep?.play();
    };
    const phaseControl = () => {
        let tempTimer = timer;
        buzzer(tempTimer);
        if (tempTimer < 0) {
            intervalId && intervalId.cancel();
            beginCountDown();
            activeTimer === "Session"
                ? switchTimer(breakLength * 60, "Break")
                : switchTimer(sessionLength * 60, "Session");
        }
    };
    const beginCountDown = () => {
        setIntervalId(
            accurateInterval(() => {
                decrementTimer();
                phaseControl();
            }, 1000)
        );
    };

    const resetTimer = useCallback(() => {
        setBreakLength(5);
        setSessionLength(25);
        setIsTimerActive(false);
        setActiveTimer("Session");
        setTimer(1500);
        setIntervalId("");

        if (intervalId) {
            intervalId.cancel();
        }
        // this.audioBeep.pause();
        // this.audioBeep.currentTime = 0;
    }, [intervalId]);

    const playPauseTimer = () => {
        if (!isTimerActive) {
            beginCountDown();
            setIsTimerActive(true);
        } else {
            setIsTimerActive(false);
            if (intervalId) {
                intervalId.cancel();
            }
        }
    };

    return (
        <div className="container-fluid mt-5 d-flex justify-content-center align-items-center">
            <div className="row w-700 text-center">
                <h1 className="mb-4">25 + 5 Clock</h1>
                <TimerSettingSection
                    titleId="break-label"
                    title="Break Length"
                    length={breakLength}
                    lengthId="break-length"
                    primaryBtn={{
                        label: "Up",
                        id: "break-increment",
                        handler: updateBreakLength,
                    }}
                    secondaryBtn={{
                        label: "Down",
                        id: "break-decrement",
                        handler: updateBreakLength,
                    }}
                />
                <TimerSettingSection
                    titleId="session-label"
                    title="Session Length"
                    length={sessionLength}
                    lengthId="session-length"
                    primaryBtn={{
                        label: "Up",
                        id: "session-increment",
                        handler: updateSessionLength,
                    }}
                    secondaryBtn={{
                        label: "Down",
                        id: "session-decrement",
                        handler: updateSessionLength,
                    }}
                />
                <div className="w-100"></div>
                <div className="col-md-6 offset-md-3">
                    <TimerSection
                        activeTimer={activeTimer}
                        isTimerActive={isTimerActive}
                        timer={timer}
                        resetTimer={resetTimer}
                        playPauseTimer={playPauseTimer}
                    />
                </div>
                <div className="w-100"></div>
                <div className="col-md-6 offset-md-3 mt-4">
                    <span>Designed and Developed by</span>&nbsp;
                    <a
                        href="https://www.linkedin.com/in/wsameer/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Sameer Waskar
                    </a>
                </div>
            </div>
            <audio
                id="beep"
                preload="auto"
                // ref="alarm"
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            />
        </div>
    );
};
