import * as React from 'react';
import "./Home.css"

function Home() {

    return (
        <div className="landing">
            <div className={"leftWindow"}>
                <div className={"Item1"}>
                    <span>Item</span>
                </div>
            </div>
            <div className={"rightWindow"}>
                <div className={"rightTopWindow"}>
                    <div className={"Item2"}>
                        <span>Item</span>
                    </div>
                    <div className={"Item3"}>
                        <span>Item</span>
                    </div>
                </div>
                <div className={"rightBottomWindow"}>
                    <div className={"Item4"}>
                        <span>Item</span>
                    </div>
                    <div className={"Item5"}>
                        <span>Item</span>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Home;
