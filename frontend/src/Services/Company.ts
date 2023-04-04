import Company from "../Models/Company";
import {DynamoCompaniesResult, DynamoCompanyResult} from "../Models/DynamoCompanyResult";
import {getRequestHeaders} from "./Authentication";

const CompanyFunctions = {
    getCompanies: async function() {
        let companies: DynamoCompaniesResult = await fetch("https://c1855ips20.execute-api.us-east-2.amazonaws.com/auth/company", getRequestHeaders('GET', {}))
            .then(response => response.json())
            .catch(error => console.log('error', error));

        return companies
    },
    getCompany: async function(companyID: number) {
        let company: DynamoCompanyResult = await fetch(`https://c1855ips20.execute-api.us-east-2.amazonaws.com/auth/company/${companyID}`, getRequestHeaders('GET', {}))
            .then(response => response.json())
            .catch(error => console.log('error', error));

        return company.Item
    },
    createCompany: async function (company: {}){
        return await fetch("https://c1855ips20.execute-api.us-east-2.amazonaws.com/auth/company", getRequestHeaders('POST', company))
            .then(response => response.json())
            .catch(error => console.log('error', error))
    },
    updateCompany: async function(company: Company){
        return await fetch(`https://c1855ips20.execute-api.us-east-2.amazonaws.com/auth/company/${company.id}`, getRequestHeaders('PUT', company))
            .then(response => response.json())
            .catch(error => console.log('error', error))
    },
    deleteCompany: async function(companyID: number) {
        return await fetch(`https://c1855ips20.execute-api.us-east-2.amazonaws.com/auth/company/${companyID}`, getRequestHeaders('DELETE', {}))
            .then(response => response.json())
            .catch(error => console.log('error', error));
    }
}

export default CompanyFunctions