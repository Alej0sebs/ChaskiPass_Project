import { TicketClientInformationT } from "../types/index.types";

export const sellTicketService = async (ticket: TicketClientInformationT) => {
    const {arrival_station, date, departure_station, frequency_id,id,price,seats,serial_station_id} = ticket;
    
}