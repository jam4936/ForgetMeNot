import React, { ChangeEvent, FormEvent } from 'react';
import { Button, Dialog, FormControl, TextField, Typography } from '@mui/material';
import "./CreateAccount.css";
import GetPatients from '../../Services/GetPatients';
import { Patient } from '../../Models';
import Company from '../../Services/Company';
import CompanyFunctions from '../../Services/Company';

class CreateAccount extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            form: {
                fName: "",
                lName: "",
                email: "",
                password1: "",
                password2: "",
                phone: "",
                dob: "",
                patientLName: "",
                patientDob: "",
            },
            formValidation: {
                fName: false,
                lName: false,
                email: false,
                passwords: false,
                dob: false,
                patientName: false,
                patientDob: false,
            },
        }
        
    }
    
    async validateForm(){
        var fname : Boolean = !this.state.form.fName;
        var lname : Boolean = !this.state.form.lName;
        var e_mail : Boolean = !this.state.form.email;
        var date : Boolean = !this.state.form.dob;
        var password : Boolean = (!this.state.form.password1 || !this.state.form.password2);

        await this.setState(() => ({formValidation: {
            ...this.state.formValidation, 
            fName: fname,
            lName: lname,
            email: e_mail,
            dob: date,
            passwords: password
        }}));
        //Validates if the patient exists
        var patients = await GetPatients.getPatientByLastName(this.state.form.patientLName);
        if(patients.length > 0){
            patients.forEach(async (value) =>{
                if(value.dob === this.state.form.patientDob){
                    await this.setState(() => ({formValidation: {
                        ...this.state.formValidation, 
                        patientDob: false,
                        patientName: false
                    }}));
                }
                else{
                    await this.setState(() =>({formValidation: {
                        ...this.state.formValidation,
                        patientDob: true,
                        patientName: true
                    }}));
                }
            })
        }
        else{
            await this.setState(() => ({formValidation: {
                ...this.state.formValidation, 
                patientDob: true,
                patientName: true
            }}))
        }

                //if the form is valid
                if(!fname || !lname || !e_mail || !date || !password || !this.state.formValidation.patientDob || !this.state.formValidation.patientName){
                    console.log("valid");
                }
    }

    async getAllCompanies(){
        let companies = await Company.getCompanies().then((company) =>{
            return company.Items;
        });
        console.log(companies);
    }
    
    async handlePasswords(change: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>){
        //checks which password field to set the state for
        if(change.target.id === "password1"){
            await this.setState(() =>({form: {...this.state.form, password1: change.target.value}}))
        }
        else if(change.target.id === "password2"){
             await this.setState(() => ({form: {...this.state.form, password2: change.target.value}}));
        }

        //checks if the passwords are matching and sets the state
        if(this.state.form.password1 !== this.state.form.password2){
            await this.setState(() =>({formValidation: {...this.state.formValidation, passwords: true}}));
        }
        else{
            await this.setState(() =>({formValidation: {...this.state.formValidation, passwords: false}}));
        }
    }
    render() {
        let companies = this.getAllCompanies();
        return (
            <div>

                <div className="CreateAccountForm">
                <Typography variant="subtitle1">Your Information:</Typography>
                
                <div id="names">
                    
                    <TextField
                        variant="filled"
                        label="First Name"
                        id="fname"
                        error={this.state.formValidation.fName}
                        required={true}
                        onChange={(newValue) => {this.setState(() => ({form: {...this.state.form, fName: newValue.target.value}}))}}
                        />

                    <TextField
                        variant="filled"
                        label="Last Name"
                        id="lname"
                        error={this.state.formValidation.lName}
                        required
                        onChange={(newValue) => {this.setState(() => ({form: {...this.state.form,lName: newValue.target.value}}))}}
                        />
                </div>
                <TextField
                        variant='filled'
                        label="E-mail"
                        id="email"
                        type="email"
                        className="emailClass"
                        error={this.state.formValidation.email}
                        required
                        onChange={(newValue) => {this.setState(() => ({form: {...this.state.form,email: newValue.target.value}}))}}
                        />
                <div id="personalInformation">

                    <TextField
                        variant="filled"
                        label="Phone Number"
                        id="phoneNum"
                        type="tel"
                        onChange={(newValue) => {this.setState(() => ({form: {...this.state.form,phone: newValue.target.value}}))}}
                        />
                    <TextField
                        variant="filled"
                        label="Date of birth"
                        type="date"
                        id="dob"       
                        error={this.state.formValidation.dob}        
                        required
                        onChange={(newValue) => {this.setState(() => ({form: {...this.state.form, dob: newValue.target.value}}))}}
                        />
                </div>

                    <TextField
                        variant="filled"
                        label="Password"
                        id="password1"
                        type="password"
                        onChange={(change) =>{this.handlePasswords(change)}}
                        required
                        />
                    <TextField
                        variant="filled"
                        label="Confirm Password"
                        id="password2"
                        type="password"
                        onChange={(change) => {this.handlePasswords(change)}}
                        error={this.state.formValidation.passwords}
                        helperText={this.state.formValidation.passwords ? "Password needs to match" : ""}
                        required
                        />
                
                </div>
                <div className="CreateAccountForm">
                    <Typography variant="subtitle1">Patient Information:</Typography>
                    <TextField 
                        variant="filled"
                        label="Patient's Last Name"
                        type="text"
                        required
                        error={this.state.formValidation.patientName}
                        onChange={(newValue) => {this.setState(() => ({form: {...this.state.form, patientLName: newValue.target.value}}))}}
                        />
                    <TextField
                        variant="filled"
                        label="Patient Date of Birth"
                        type="date"
                        required
                        id="patientDob"
                        onChange={(newValue) => {this.setState(() => ({form: {...this.state.form, patientDob: newValue.target.value}}))}}
                        error={this.state.formValidation.patientDob}
                        />
                    
                </div>
                <Button 
                        variant="outlined" 
                        onClick={(e) => {this.validateForm()}}
                        >Submit</Button>
                                    
            </div>
        );
    }
}

        // email, password, facility is loved one in

        // fname, lname, email, phonenumber (optional), birthdate, password, 
        // password validation: no validation on backend
        // verify email thing : once try to sign up sends email that was used and need to confirm email before use

        // family validation: patient last name, patient birth date 
export default CreateAccount;