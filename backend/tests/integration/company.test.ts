import connection from '../../src/database/conection'
import supertest from "supertest";
import app from '../../src/App';
import faker from 'faker';

import { UuidRegex } from '../utils/uuidRegex'
import { iCompany } from '../../src/Services/Company'

    
describe("Company creation, update and delete using routes",()=>{
    beforeAll(async () => {
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.migrate.rollback();
    })
    

    let company : iCompany= { 
        name: "Test",
        currency: "USD"
    };
    
    it("should create a new company", async ()=>{
        const response = await supertest(app).post('/companies').send(company);
        
        company["company_id"] = response.body.company_id;
        
        expect(response.body).toHaveProperty("company_id");
        expect(response.body.company_id).toMatch(UuidRegex);
    })

    it("should return companies list",async ()=>{
        const response = await supertest(app).get('/companies');

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining(company)
            ])
        )
    })

    it("should delete the company", async ()=>{
        const response = await supertest(app).delete('/companies').send({
            id: company.company_id
        });
        
        expect(response.status).toBe(204);
    })
})

describe("Massive companies test",()=>{
    
    beforeAll(async () => {
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.migrate.rollback();
    })
    
    let companies :Array<iCompany> = []
    
    for(let i = 0; i <=50;i++){
        
        let company : iCompany= { 
            name: faker.company.companyName(),
            currency: faker.finance.currencyCode()
        };

        it(`should create a new company #0${i}`, async ()=>{
            const response = await supertest(app).post('/companies').send(company);
            
            company["company_id"] = response.body.company_id;
            
            expect(response.body).toHaveProperty("company_id");
            expect(response.body.company_id).toMatch(UuidRegex);
        })      
        companies.push(company);
    }
    it("should return companies list",async ()=>{
        const response = await supertest(app).get('/companies');

        expect(response.body).toEqual(
            expect.arrayContaining(companies)
        )
    })
    companies.forEach((company, index)=>{
        it(`should delete the company #0${index}`, async ()=>{
            const response = await supertest(app).delete('/companies').send({
                id: company.company_id
            });
            
            expect(response.status).toBe(204);
        })
    })

})