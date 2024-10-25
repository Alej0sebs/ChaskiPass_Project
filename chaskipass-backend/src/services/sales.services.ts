import { TicketInformationT } from "../types/index.types";

export const generateTicketService = async (data:string) => {

};

export const generateTemporalTicketService = async ({arrival_station,client_dni,date,departure_station,frequency_id,id,price,seat_id,ticket_code}:TicketInformationT) => {
    //la informacion ya viene validada
    
};

const payment= async (data:string) => {

};

//genero ticket temporal, mando a pagar si se hace valido el pago, genero ticket definitivo 
