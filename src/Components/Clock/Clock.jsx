import React, { useState, useEffect, useRef } from "react";
import TimerSection from "./TimerSection";
import TimerSettingSection from "./TimerSettingSection";

const MAX_TIMER_LENGTH = 60;
const MIN_TIMER_LENGTH = 1;

function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

export const Clock = () => {
    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(1);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [activeTimer, setActiveTimer] = useState("Session");
    const [timer, setTimer] = useState(10); // MAX_TIMER_LENGTH * 25
    const [textColor, setTextColor] = useState("text-body");
    const [warning, setWarning] = useState("off");

    let audioBeep = useRef(null);

    useInterval(
        () => {
            if (isTimerActive && timer > 0) {
                setTimer(timer - 1);
            }
            if (timer < 11) {
                setTextColor("text-danger");
                setWarning("on");
            }
            if (timer === 0) {
                activeTimer === "Session"
                    ? switchTimer(breakLength * 60, "Break")
                    : switchTimer(sessionLength * 60, "Session");
                audioBeep.current.play();
                setTextColor("text-body");
                setWarning("off");
            }
        },
        isTimerActive ? 1000 : null
    );

    useEffect(() => {
        setTimer(timer);
    }, [timer]);

    const updateBreakLength = (event) => {
            if (isTimerActive) {
                return;
            }

            if (
                event.target.innerHTML === "Down" &&
                breakLength !== MIN_TIMER_LENGTH
            ) {
                setBreakLength((prev) => prev - 1);
                activeTimer !== "Session" && setTimer(breakLength * 60 - 60);
            } else if (
                event.target.innerHTML === "Up" &&
                breakLength !== MAX_TIMER_LENGTH
            ) {
                setBreakLength((prev) => prev + 1);
                activeTimer !== "Session" && setTimer(breakLength * 60 + 60);
            }
        },
        updateSessionLength = (event) => {
            if (isTimerActive) {
                return;
            }

            if (
                event.target.innerHTML === "Down" &&
                sessionLength !== MIN_TIMER_LENGTH
            ) {
                setSessionLength((prev) => prev - 1);
                activeTimer !== "Break" && setTimer(sessionLength * 60 - 60);
            } else if (
                event.target.innerHTML === "Up" &&
                sessionLength !== MAX_TIMER_LENGTH
            ) {
                setSessionLength((prev) => prev + 1);
                activeTimer !== "Break" && setTimer(sessionLength * 60 + 60);
            }
        },
        getCurrentTime = () => {
            let minutes = Math.floor(timer / 60);
            let seconds = timer - minutes * 60;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            return `${minutes.toString()}:${seconds.toString()}`;
        },
        startTimer = () => setIsTimerActive(!isTimerActive),
        resetTimer = () => {
            setBreakLength(5);
            setSessionLength(25);
            setIsTimerActive(false);
            setActiveTimer("Session");
            setTimer(10);
            setTextColor("text-body");
            setWarning("off");
            audioBeep.current.pause();
            audioBeep.current.currentTime = 0;
        },
        switchTimer = (remainingTime, timerMode) => {
            console.log("switchTimer ---------->", remainingTime, timerMode);
            setActiveTimer(timerMode);
            setTimer(remainingTime);
        };

    // ---------------------

    // const decrementTimer = useCallback(() => {
    //     console.log("decrementTimer -----------", timer);
    //     setTimer(timer - 1);
    // }, [timer]);

    // const buzzer = useCallback(
    //     (t) => {
    //         t === 0 ?? audioBeep?.play();
    //     },
    //     [audioBeep]
    // );

    // function phaseControl() {
    //     let tempTimer = timer;
    //     console.log(timer, tempTimer);
    //     buzzer(tempTimer);
    //     if (tempTimer < 0) {
    //         console.log("phaseControl ------------>", timer);
    //         console.log(intervalId);
    //         if (intervalId) {
    //             intervalId.cancel();
    //         }
    //         beginCountDown();
    //         activeTimer === "Session"
    //             ? switchTimer(breakLength * 60, "Break")
    //             : switchTimer(sessionLength * 60, "Session");
    //     }
    // }

    // const playPauseTimer = () => {
    //     if (!isTimerActive) {
    //         beginCountDown();
    //         setIsTimerActive(true);
    //     } else {
    //         setIsTimerActive(false);
    //         if (intervalId) {
    //             intervalId.cancel();
    //             // clearInterval(intervalId);
    //         }
    //     }
    // };

    // const clockify = () => {
    //     // console.log("clofuy", timer);
    //     let minutes = Math.floor(timer / 60);
    //     let seconds = timer - minutes * 60;
    //     seconds = seconds < 10 ? "0" + seconds : seconds;
    //     minutes = minutes < 10 ? "0" + minutes : minutes;
    //     return minutes + ":" + seconds;
    // };

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
                        timer={timer}
                        resetTimer={resetTimer}
                        startTimer={startTimer}
                        getCurrentTime={getCurrentTime}
                        textColor={textColor}
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
                ref={audioBeep}
                src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
                type="audio"
            />
        </div>
    );
};
