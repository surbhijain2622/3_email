import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from '@material-ui/pickers';
import { isThisSecond } from 'date-fns';

export default function FrequencySelector(props) {

    const frequency = props.frequency;
    var currDate = new Date();

    if(frequency.period!="Recurring"){
        currDate.setHours(frequency.hours, frequency.minutes);
        currDate.setDate(frequency.dayOfMonth);
        currDate.setMonth(frequency.month);
    }

    const periodOptions = [
        {key:0, period: "Weekly"},
        {key:1, period: "Monthly"},
        {key:2, period: "Yearly"},
        {key:3, period: "Recurring"}
    ]

    const dayOptions = [
        {key:1, day: "Monday"},
        {key:2, day: "Tuesday"},
        {key:3, day: "Wednesday"},
        {key:4, day: "Thursday"},
        {key:5, day: "Friday"},
        {key:6, day: "Saturday"},
        {key:0, day: "Sunday"}
    ]

    const recurringOptions = [
        {key:30, repeat: 30},
        {key:20, repeat: 20}
    ]

    const daysOfMonth = [];
    for(var dateOfMonth=1; dateOfMonth<=28; dateOfMonth++){
        daysOfMonth.push(dateOfMonth);
    }

    const handleOptionChange = (e) => {
        frequency[e.target.name] = e.target.value;
        if(e.target.name=="period" && e.target.value=="Recurring"){
            frequency["seconds"] = 30;
        }
        props.setFrequency(frequency);
    }

    const handleDateChange = (newDate) => {
        frequency['dayOfMonth'] = newDate.getDate();
        frequency['month']=newDate.getMonth();
        var newHours =  newDate.getHours();
        var newMinutes = newDate.getMinutes();
        frequency["hours"] = newHours;
        frequency["minutes"] = newMinutes;
        currDate = newDate;
        props.setFrequency(frequency);
    };

    // const handleTimeChange = (newTime) => {
        
    //     currDate = newTime;
    //     props.setFrequency(frequency);
    // };

    return (
        <div className="drop-downs">
            <select className="freq-drop" name="period" value={frequency.period} onChange={handleOptionChange}>
                {periodOptions.map((periodOption, index)=>{
                    return <option value={periodOption.period}>{periodOption.period}</option>
                })}
            </select>
            {frequency.period=="Weekly" && 
                <select className="freq-drop" name="day" value={frequency.day} onChange={handleOptionChange}>
                    {dayOptions.map((dayOption, index)=>{
                        return <option value={dayOption.key}>{dayOption.day}</option>
                    })}
                </select>
            }
            {frequency.period=="Recurring" && 
                <select className="freq-drop" name="seconds" value={frequency.seconds} onChange={handleOptionChange}>
                    {recurringOptions.map((recurringOption, index)=>{
                        return <option value={recurringOption.key}>{recurringOption.repeat}</option>
                    })}
                </select>
            }
            {frequency.period=="Monthly" && 
                <select className="freq-drop" name="dayOfMonth" value={frequency.dayOfMonth} onChange={handleOptionChange}>
                    {daysOfMonth.map((dayOfMonth, index)=>{
                        return <option value={dayOfMonth}>{dayOfMonth}</option>
                    })}
                </select>
            }
            {frequency.period=="Yearly" &&
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                        label="Date"
                        value={currDate}
                        onChange={handleDateChange}
                        animateYearScrolling
                    />
                </MuiPickersUtilsProvider>
            }
            {frequency.period!="Recurring" && 
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <TimePicker
                    clearable
                    ampm={false}
                    label="Time"
                    value={currDate}
                    onChange={handleDateChange}
                />
            </MuiPickersUtilsProvider>
            }
        </div>
    )
}
