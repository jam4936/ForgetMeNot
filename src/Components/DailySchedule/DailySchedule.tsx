import React from 'react';
import "./DailySchedule.css"
import DailyActivities from "./DailyActivities/DailyActivities";
import BedTime from "./BedTime/BedTime";
import RoutineHabits from "./RoutineHabits/RoutineHabits";
import MorningBeverage from "./MorningBeverage/MorningBeverage";
import MorningRoutine from "./RoutineSections/MorningRoutine/MorningRoutine"
import AfternoonRoutine from "./RoutineSections/AfternoonRoutine/AfternoonRoutine";
import EveningRoutine from "./RoutineSections/EveningRoutine/EveningRoutine";
import BedTimeRoutine from "./RoutineSections/BedTimeRoutine/BedTimeRoutine";

function DailySchedule() {
    return (
        <>
            <div id="DailySchedule">
                <h1>
                    Daily Schedule
                </h1>
                <DailyActivities></DailyActivities>
                <BedTime></BedTime>
                <RoutineHabits></RoutineHabits>
                <MorningBeverage></MorningBeverage>
                <div id="RoutineSections">
                    <label id="RoutineSections">Routines:</label>
                    <MorningRoutine></MorningRoutine>
                    <AfternoonRoutine></AfternoonRoutine>
                    <EveningRoutine></EveningRoutine>
                    <BedTimeRoutine></BedTimeRoutine>
                </div>
            </div>
        </>
);
}

export default DailySchedule;