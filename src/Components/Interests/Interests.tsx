import React from 'react';
import "./Interests.css"
import GardeningYardwork from "./DoYouEnjoy/GardeningYardwork/GardeningYardwork";
import Housework from "./DoYouEnjoy/Housework/Housework";
import Yoga from "./DoYouEnjoy/Yoga/Yoga";
import Meditation from "./DoYouEnjoy/Meditation/Meditation";
import MassageTherapy from "./DoYouEnjoy/MassageTherapy/MassageTherapy";
import Reading from "./DoYouEnjoy/Reading/Reading";
import AttendingConcerts from "./DoYouEnjoy/AttendingConcerts/AttendingConcerts";
import PhysicalActivity from "./DoYouEnjoy/PhysicalActivity/PhysicalActivity";
import KindOfMusic from "./KindOfMusic/KindOfMusic";
import PlayInstruments from "./PlayInstruments/PlayInstruments";
import AvidTraveler from "./AvidTraveler/AvidTraveler";
import FavoriteTravel from "./FavoriteTravel/FavoriteTravel";
import KindOfPhysicalActivity from "./KindOfPhysicalActivity/KindOfPhysicalActivity";
import HasArt from "./HasArt/HasArt";
import PersonalTrainer from "./PersonalTrainer/PersonalTrainer";

function Interests() {
    return (
        <>
            <div id="Interests">
                <h1>
                    3. Interests
                </h1>
                <div id="DoYouEnjoy">
                    <label id="DoYouEnjoy">Do you enjoy...</label>
                    <GardeningYardwork></GardeningYardwork>
                    <Housework></Housework>
                    <Yoga></Yoga>
                    <Meditation></Meditation>
                    <MassageTherapy></MassageTherapy>
                    <Reading></Reading>
                    <AttendingConcerts></AttendingConcerts>
                    <PhysicalActivity></PhysicalActivity>
                </div>
                <KindOfMusic></KindOfMusic>
                <PlayInstruments></PlayInstruments>
                <AvidTraveler></AvidTraveler>
                <FavoriteTravel></FavoriteTravel>
                <KindOfPhysicalActivity></KindOfPhysicalActivity>
                <HasArt></HasArt>
                <PersonalTrainer></PersonalTrainer>
            </div>
        </>
);
}

export default Interests;