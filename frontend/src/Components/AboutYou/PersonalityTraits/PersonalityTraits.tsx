import React from "react";
import Question from "../../../Models/Question";
import Response from "../../../Models/Response"
import './PersonalityTraits.css';
import Trait from "./Trait";
import {redirectLoggedIn} from "../../../Services/getRole";

class PersonalityTraits extends React.Component <any, any>{

    constructor(props: any){
        redirectLoggedIn()
        super(props)    
        //checks size of window to size the personality trait checkbox columns    
        if(window.innerWidth > 1024){
            this.state = {
                isTablet: true,
                isLarger: true,
            }
        }
        else if(window.innerWidth > 530){
            this.state = {
                isTablet: true,
                isLarger: false,
            }
        }
        else{
            this.state = {
                isTablet: false,
                isLarger: false,
            }
        }
    }
    
    /*
     *Checks if the screen is being resized and sets the state accordingly
     */
    componentDidMount(): void {
        window.addEventListener('resize', () =>{
            this.setState({
                isTablet: window.innerWidth > 530,
                isLarger: window.innerWidth >= 1024,
            });
        }, false);
    }
    
    /*
     *takes in the given question and response and creates a custom Trait object
     */
    displayTrait(element: Question, response: Response){
        return <Trait response={response} trait={element}/>;
    }

    render() {
        let personalityTraits = this.props.traits;
        let responses = this.props.responses;
        return (
            <div id="container">
                <label id="question">Personality Traits (Check box 1 for traits before illness. Check box 2 for traits after illness.):</label>
                <div data-testid="allTraits" className="allTraits">
                    {personalityTraits.map((element: Question) => {
                        let response = responses.find((x: Response) => x.questionID === element.id)
                        return this.displayTrait(element, response)
                    })}
                </div>
            </div>
        )
    }
}

export default PersonalityTraits;