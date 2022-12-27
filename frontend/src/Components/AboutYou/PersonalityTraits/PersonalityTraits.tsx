import React from "react";
import Question from "../../../Models/Question";
import Response from "../../../Models/Response"
import './PersonalityTraits.css';
import SendResponse from "../../../Models/SendResponse";
import UploadResponseService from "../../../Services/UploadResponseService";

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

    onBlurEvent(value: string, response: Response, question: Question){

        let oldValue = parseInt(response.response as string);
        let updatedValue = oldValue;
        updatedValue ^= (1<<(parseInt(value)-1));
        response.response = updatedValue.toString();

        console.log(oldValue + "=>" + updatedValue)

        var change = { questionId: question.id, response: updatedValue.toString()} as SendResponse
        // var traits : SendResponse[] = []

        UploadResponseService.setFormDirty(change, updatedValue.toString())
    }

    displayTrait(element: Question, response: Response){
        let responseValue = parseInt(response.response);
        let preChecked = (responseValue & (1<<0)) != 0;
        let postChecked = (responseValue & (1<<1)) != 0;
        return (
            <div className="trait">
                <input type="checkbox" id={"personalityTrait_pre_" + element.prompt} defaultChecked={ preChecked } name={element.prompt?.toLowerCase() + "_pre"} value={ 1 } onChange={(event) => this.onBlurEvent(event.target.value, response, element)} />
                <input type="checkbox" id={"personalityTrait_post_" + element.prompt} defaultChecked={ postChecked } name={element.prompt?.toLowerCase() + "_post"} value={ 2 } onChange={(event) => this.onBlurEvent(event.target.value, response, element)} />
                <label htmlFor="element" id="traitLabel">{element.prompt}</label>
            </div>
        );
    }

    render() {
        let optionalTablet = this.state.isTablet ? <div className="checkboxNum"><label>1</label><label>2</label></div> : null;
        let optionalLarger = this.state.isLarger ? <div className="checkboxNum"><label>1</label><label>2</label></div> : null;
        let personalityTraits = this.props.traits;
        let responses = this.props.responses;
        return (
            <div id="container">
                <label id="question">Personality Traits (Check box 1 for traits before illness. Check box 2 for traits after illness.):</label>
                <div className="allTraits">
                    <div className="checkboxNum">
                        <label>1</label>
                        <label>2</label>
                    </div>
                    {optionalTablet}
                    {optionalLarger}
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