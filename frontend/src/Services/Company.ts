import Company from "../Models/Company";
import DynamoCompanyResult from "../Models/DynamoCompanyResult";

const Company = {
    companies: [] as Company[],
    initializeCompanies: async function() {
        let companies: DynamoCompanyResult = await fetch('https://30z74xmi3i.execute-api.us-east-2.amazonaws.com/patient/all', {method: 'GET'}).then(result => result.json())

        this.companies = companies.Items;
    }
}

export default Company