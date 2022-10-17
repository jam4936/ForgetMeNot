import React from "react";
import './Education.css';


class Education extends React.Component <{}, {isTablet: boolean}>{
    render(){
        return (
            <div id="dropdown-question">
                <p id="question">Education: </p>
                <select>
                    <option value=''>---Select One---</option>
                    <option value="gradeSchool">Grade School</option>
                    <option value="someHighSchool">Some High School</option>
                    <option value="techSchool">Vocational/Technical School</option>
                    <option value="collegeGraduate">College Graduate</option>
                    <option value="someCollege">Some College</option>
                    <option value="graduateSchool">Graduate School</option>
                </select>
            </div>
        );
    }
}

export default Education;