import * as React from 'react';
import "./Home.css"

function Home() {

    return (
        <div className="landing">
            <div className={"leftWindow"}>
                <div className={"Item1"}>
                    <img
                        src="https://cdn.pixabay.com/photo/2017/12/02/16/52/drawing-2993282_960_720.png"
                        width="120"
                        height="120"
                        className="d-inline-block align-top"
                        alt="logo"
                    />
                    <h1>Forget-Me-Not</h1>
                    <h6 className={"paragraph"}>Forget-Me-Not is a memory-care management product meant to help assist with the care of dementia facility residents. Through Forget-Me-Not, memory care facilities can manage list of residents, access a customizable family form, and display a Media Feed for residents to view.</h6>
                    <h6 className={"paragraph"}>Whether it’s skilled nursing, retirement homes, or nursing homes, residents with dementia frequently feel lost, alone, and confused about their surroundings. The Senior Project “Orientation for Patients with Dementia” aims to create systems to keep residents integrated with their families and help make their facility feel like home. This project aims to give dementia patients a sense of familiarity through a personalized interface, providing ways for families to interact with their elderly family members regardless of distance from the facility.</h6>
                </div>
            </div>
            <div className={"rightWindow"}>
                <div className={"Features"}>
                    <h2>Features</h2>
                </div>
                <div className={"rightTopWindow"}>
                    <div className={"rightTopLeftWindow"}>
                        <div className={"Item2"}>
                            <img
                                src="https://img.icons8.com/carbon-copy/256/calendar.png"
                                width="120"
                                height="120"
                                className="d-inline-block align-top"
                                alt="logo"
                            />
                            <h3>Calendar Events</h3>
                            <h6 className={"paragraph"}>Within the app, facilities are able to add events to a calendar to help track and manage facility activities, birthdays, and other events. Events can occur on a singular or recurring basis, with recurring options for daily, weekly, and by specific date.</h6>
                        </div>
                    </div>
                    <div className={"rightTopRightWindow"}>
                        <div className={"Item3"}>
                            <img
                                src="https://img.icons8.com/dotty/256/tv-show.png"
                                width="120"
                                height="120"
                                className="d-inline-block align-top"
                                alt="logo"
                            />
                            <h3>Media Feed</h3>
                            <h6 className={"paragraph"}>Forget-Me-Not hosts a Media Feed slideshow that displays an orientation video provided by the facility and a greeting video provided by the family to help provide stability to the resident. The Media Feed can also be used to alert residents to facility-specific events, such as movie nights, crafts, or concerts! Outside of its usual function, the feed displays a slideshow of pictures and videos uploaded by the family through the family portal. </h6>
                        </div>
                    </div>
                </div>
                <div className={"rightBottomWindow"}>
                    <div className={"rightBottomLeftWindow"}>
                        <div className={"Item4"}>
                            <img
                                src="https://img.icons8.com/external-outline-agus-raharjo/256/external-eye-tracking-technology-it-metaverse-outline-agus-raharjo.png"
                                width="120"
                                height="120"
                                className="d-inline-block align-top"
                                alt="logo"
                            />
                            <h3>Glance Detection</h3>
                            <h6 className={"paragraph"}>Our Media Feed uses a special glance detection feature to detect when the user is paying attention. When a resident looks in the direction of the device displaying the Media Feed, our glance detection software will activate the feed. The software calculates the resident's attention score to calculate how long to stay active for. Once the resident loses focus of the Media Feed, the software will continue to display the Media Feed based on the calculated attention score, then power down. To reactive that Media Feed, the resident just has to look back towards the display.</h6>
                        </div>
                    </div>
                    <div className={"rightBottomRightWindow"}>
                        <div className={"Item5"}>
                            <img
                                src="https://img.icons8.com/ios/256/defend-family--v2.png"
                                width="120"
                                height="120"
                                className="d-inline-block align-top"
                                alt="logo"
                            />
                            <h3>Online Family Form</h3>
                            <h6 className={"paragraph"}>Forget-Me-Not uses a digital form to help connect families and facilities. The facility can add, edit, and remove questions on the form at their discretion, allowing for a fully customizable and unique questionnaire. By logging in through the portal, families can access the form and answer the questions. Their answers can be viewed by the faculty and will help make a more personalized experience for the resident. </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
