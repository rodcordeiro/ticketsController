interface iClient{
    client_id?: number;
    name: string;
    company_id: number;
}
interface iTech{}
interface iLocation{
    name: string
    address: string;
    city: string;
    state: string;
    client_id: number;
}
interface iTicket{}
interface iCompany{
    company_id?: number;
    name: string;
    currency: string;
}
interface iContact{}
interface iService{}


export {
    iClient,
    iCompany,
    iTech,
    iLocation,
    iTicket,
    iContact,
    iService
}