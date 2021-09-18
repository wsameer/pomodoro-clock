import React from "react";
import PropTypes from "prop-types";

const TimerSettingTitle = ({ id, title }) => {
    return (
        <div className="fs-5" id={id}>
            {title}
        </div>
    );
};

TimerSettingTitle.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
};

export default TimerSettingTitle;
