import React from 'react'

export default function ChainTimelineTitle(props) {

    const frequency = props.frequency;
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    const getTime = () => `${frequency.hours<10?'0':''}${frequency.hours}:${frequency.minutes<10?'0':''}${frequency.minutes}`;

    const getDate = () => `${frequency.dayOfMonth} ${month[frequency.month]}`;

    const showTimeline = () => {
        if(frequency==null) return "";
        if(frequency.period=="Recurring"){
            return `${frequency.period} | ${frequency.seconds} secs`;
        }
        else if(frequency.period=="Weekly"){
            return `${frequency.period} | ${dayNames[frequency.day]} | ${getTime()}`;
        }
        else if(frequency.period=="Monthly"){
            return <>{`${frequency.period} | Every ${frequency.dayOfMonth}`}<sup>th</sup> {`day | ${getTime()}`}</>;
        }
        else if(frequency.period=="Yearly"){
            return `${frequency.period} | ${getDate()} | ${getTime()}`;
        }
        
    }

    return (
        <p className="freq-text">{showTimeline()}</p>
    )
}
