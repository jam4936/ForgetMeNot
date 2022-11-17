import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import './Education.css';


class Education extends React.Component <{}, {isTablet: boolean}>{
    render(){
        return (
        <div>
            <FormControl variant="outlined" className="church" fullWidth>
                <InputLabel id="education">Education?</InputLabel>
                    <Select labelId="education" id="education">

                        <MenuItem value="gradeSchool">Grade School</MenuItem>
                        <MenuItem value="someHS">Some High School</MenuItem>
                        <MenuItem value="techschool">Vocational/Technical School</MenuItem>
                        <MenuItem value="collegeGraduate">College Graduate</MenuItem>
                        <MenuItem value="someCollege">Some College</MenuItem>
                        <MenuItem value="graduateSchool">Graduate School</MenuItem>
                    </Select>
                
            </FormControl>
        </div>

            // <div id="dropdown-question">
            //     <p id="question">Education: </p>
            //     <select>
            //         <option value=''>---Select One---</option>
            //         <option value="gradeSchool">Grade School</option>
            //         <option value="someHighSchool">Some High School</option>
            //         <option value="techSchool">Vocational/Technical School</option>
            //         <option value="collegeGraduate">College Graduate</option>
            //         <option value="someCollege">Some College</option>
            //         <option value="graduateSchool">Graduate School</option>
            //     </select>
            // </div>
        );
    }
}

export default Education;