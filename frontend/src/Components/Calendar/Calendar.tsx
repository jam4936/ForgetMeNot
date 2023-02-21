import React from 'react';

function Calendar(props: any){
    return(
        <div>
            <iframe src="https://calendar.google.com/calendar/embed?src=c_0e8408a2861093dcef9d90419077d5aafcf605fae5cc1b48046d5c09f39119ce%40group.calendar.google.com&ctz=America%2FNew_York" width={"800"} height={"600"} frameBorder={"0"} scrolling="no"></iframe>
        </div>
    )
}

export default Calendar;