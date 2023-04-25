import { IconButton, Input, TextField } from "@mui/material";
import { ChangeEvent } from "preact/compat";
import React from "react";
import './Menu.css';
import SaveIcon from '@mui/icons-material/Save';
import MenuItems from "../../../Models/MenuItem";
import MenuItemService from "../../../Services/MenuItemService";
import {redirectLoggedIn} from "../../../Services/getRole";

export default class AddEditMenuItem extends React.Component <any, any>{
    constructor(props: any){
        redirectLoggedIn()
        super(props);
        this.state = {
            name : this.props.editableMeal ? this.props.editableMeal.name : "",
            description : this.props.editableMeal ? this.props.editableMeal.description : "",
            id : this.props.editableMeal ? this.props.editableMeal.id : this.generateId(),
            mealType: this.props.editableMeal ? this.props.editableMeal.mealType : this.props.mealType
        }
    }

    //Checks if the event id exists and returns a boolean
    eventIdExists(checkId: number){
        let idExists = false;
        this.props.existingMenuItems.forEach((item : MenuItems) => {
            if(checkId == Number(item.id)){
                idExists = true;
            }
        })
        return idExists;
    }

    //Generates a new ID for an event by checking each number until there is a free one
    generateId(){
        let genID = 0;
        while(this.eventIdExists(genID)){
            genID++;
        }
        return genID;
    };

    //Validates that name and description is provided
    validateForm() {
        if(!this.state.name || !this.state.description){
            return false;
        }
        else{
            return true;
        }
    }

    //Submits a new event by creating MenuItems and sending the item to the MenuItemService
    async handleSubmit(){
        if(this.validateForm()){
            const newMeal : MenuItems = {
                id: this.state.id,
                name: this.state.name,
                description: this.state.description,
                mealType: this.state.mealType
            }
            await MenuItemService.insertMenuItem(newMeal);
            var t : MenuItems[] = this.props.existingMenuItems;
            if(this.props.editableMeal){
                var index = t.findIndex((val) => val.id === this.state.id);
                t.splice(index, 1);
            }
            t.push(newMeal);
            //calls back to parent class
            this.props.parentCallback(t);
        }
    }
    render(){
        return(
            <div id="form">
                <TextField 
                    variant="filled" 
                    label="Meal Name" 
                    value={this.state.name} 
                    onChange={(value)=> {this.setState(() =>({name: value.target.value}))}}
                    id="name"/>
                <TextField variant="filled" label="Meal Description" value = {this.state.description}
                    onChange={(value)=> {this.setState(() =>({description: value.target.value}))}}
                    id="desc"/>

                <div id="formButtons">
                    <IconButton 
                        onClick={() =>{this.handleSubmit()}}>
                            <SaveIcon/>
                        </IconButton>
                </div>
            </div>
        )
    }
}