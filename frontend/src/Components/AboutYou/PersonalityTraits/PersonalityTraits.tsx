import React from "react";
import { Question } from "../../../Models";
import './PersonalityTraits.css';

class PersonalityTraits extends React.Component <any, any>{
    constructor(props: any){
        super(props)        
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
    
    componentDidMount(): void {
        window.addEventListener('resize', () =>{
            this.setState({
                isTablet: window.innerWidth > 530,
                isLarger: window.innerWidth >= 1024,
            });
            
        }, false);
    }

    displayTrait(element: Question){
        return (
            <div className="trait">
                <input type="checkbox" id={"personalityTrait_post_" + element.prompt} name={element.prompt?.toLowerCase() + "_pre"} />
                <input type="checkbox" id={"personalityTrait_post_" + element.prompt} name={element.prompt?.toLowerCase() + "_post"} />
                <label htmlFor="element" id="traitLabel">{element.prompt}</label>
            </div>
        );
        
    }

    render() {
        const optionalTablet = this.state.isTablet ? <div className="checkboxNum"><p>1</p><p>2</p></div> : null;
        const optionalLarger = this.state.isLarger ? <div className="checkboxNum"><p>1</p><p>2</p></div> : null;
        var personalityTraits = this.props.traits;
        return (
            <div id="container">
                <p id="question">Personality Traits (Check box 1 for traits before illness. Check box 2 for traits after illness.):</p>
                <div className="allTraits">
                    <div className="checkboxNum">
                        <p>1</p>
                        <p>2</p>
                    </div>
                    {optionalTablet}
                    {optionalLarger}
                    {personalityTraits.map((element: Question) => {
                        return this.displayTrait(element)
                    })}
                </div>
            </div>

        )
    }
}

export default PersonalityTraits;