import { Checkbox } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import SendResponse from "../../../Models/SendResponse";
import UploadResponseService from "../../../Services/UploadResponseService";

export default function Trait(props: any) {
    const trait = props.trait;
    const resp = props.response;
    let pre: boolean, post : boolean = false;

    switch(resp.response){
        case "1": 
            pre = true;
            post = false;
            break;
        case "2":
            pre = false;
            post = true;
            break;
        case "3": 
            pre = true;
            post = true;
            break;
        default: 
            pre = false;
            post = false;

    }
    const [preState, setPreState] = useState(pre);
    const [postState, setPostState] = useState(post);

    useEffect( () =>{
        updateResponse();
    }, [preState]);
    useEffect(() =>{
        updateResponse();
    }, [postState]);
    const updateResponse = () =>{
        let updatedValue = parseInt(resp.response); 
        
        // TRUE means it is checked
        // FLASE means not checked 
        /*
         * 0 = Never had this personality
         * 1 = Personality before disease
         * 2 = Personality post disease
         * 3 = Personality both before and after disease
         */
        if(!preState && !postState){ 
            updatedValue = 0;
        }
        else if(preState && !postState){ 
            updatedValue = 1;
        }
        else if(!preState && postState){ 
            updatedValue = 2;
        }
        else{
            updatedValue = 3;
        }
        // checks to make sure value is not the same as it originally was then sends change to Upload Response Service
        if(updatedValue != resp.response){
            var change = { questionId: trait.id, response: updatedValue.toString()} as SendResponse
            UploadResponseService.setFormDirty(change, updatedValue.toString());
        }

    }


    return (
        <div className="trait" id="trait">
            <div id="oneTrait" data-testid="trait">
                <Checkbox data-testid="pre_trait" value={1} id={"pre_" + trait.prompt} checked={preState} onClick={async () => await setPreState(!preState)}/><label>1</label>
                <Checkbox data-testid="post_trait" value={2} id={"post_"  + trait.prompt} checked={postState} onClick={ async () => await setPostState(!postState)} /><label>2</label>
                <label className="traitPrompt">{trait.prompt}</label>
            </div>
        </div>
    )
    
}