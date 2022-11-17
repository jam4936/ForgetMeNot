import React from 'react';
import "./App.css";

function Project() {
    return (
        <div>
            <h1>Orientation for Patients with Dementia</h1>
            <div>
                <h2>Team: Forget Me Not</h2>
                <p>Project Sponsor: Gerry Garavuso, <a href = "mailto: gxgddm@rit.edu">gxgddm@rit.edu</a></p>
                <p>Coach: Bruce Herring, Email: <a href = "mailto: blhvse@rit.edu">blhvse@rit.edu</a></p>
                <table className ="table table-sm w-auto">
                    <thead>
                    <tr>
                        <th>Student</th>
                        <th>Role</th>
                        <th>Contact Information</th>
                    </tr>
                    </thead>
                    <tr>
                        <td scope="row">Jarred Moyer</td>
                        <td>Scrum Master</td>
                        <td><a href = "mailto: jam4936@rit.edu">jam4936@rit.edu</a></td>
                    </tr>
                    <tr>
                        <td scope="row">Chase Chura</td>

                        <td>Media Viewing Lead</td>
                        <td><a href = "mailto: clc3020@rit.edu">clc3020@rit.edu</a></td>
                    </tr>
                    <tr>
                        <td scope="row">Kobe Oley</td>

                        <td>Data Lead</td>

                        <td><a href = "mailto: kgo6331@rit.edu">ckgo6331@rit.edu</a></td>
                    </tr>
                    <tr>
                        <td scope="row">Mikayla Wishart</td>

                        <td>Media Management Lead</td>

                        <td><a href = "mailto: mcw7246@rit.edu">mcw7246@rit.edu</a></td>
                    </tr>
                    <tr>
                        <td scope="row">Kyle McCoy</td>

                        <td>Communication Lead</td>

                        <td><a href = "mailto: krm7269@rit.edu">krm7269@rit.edu</a></td>
                    </tr>
                </table>
            </div>

            <div>
                <iframe src="https://docs.google.com/document/d/e/2PACX-1vRhT_JrfquYV3l6PukUbp6ARDkOWfTYM1_U4ds0R_FhPuBCpk2ku8ZtBEiHNTB8W8FSu9kXdpIkBAAU/pub?embedded=true"></iframe>
            </div>

            <div>
                <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTd_V3F7_-sthUbpf9V9rE5yd9MIKsU0NwtpJJ6pMj7slhZfxUrCTczE8lnUkWGExSpITsgitnuLhoj/pubhtml?widget=true&amp;headers=false"></iframe>
            </div>

            <div>
                <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQOMv6Nqa7uiTaEmZIpagbKO0Zp-PVFL6xiBBfZ4T424njkizp_dkD41FYNCuERdSN7WCsZPrAj4G_Z/pubhtml?widget=true&amp;headers=false"></iframe>
            </div>
        </div>
    );
}

export default Project;