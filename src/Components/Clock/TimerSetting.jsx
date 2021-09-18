import React from "react";

const TimerSetting = React.memo(({ data, ...rest }) => (
    <button id={data?.id} onClick={data?.handler} {...rest}>
        {data?.label}
    </button>
));

TimerSetting.displayName = "TimerSetting";

export default TimerSetting;
