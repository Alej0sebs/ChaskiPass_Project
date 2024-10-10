export type SeatConfigT = {
    id:string,
    type: string,
    name: string,
    position: {"x": number, "y": number},
};

export type LayoutBusT = {
    id: string,
    name: string,
    cooperative_id: string,
    layout: SeatConfigT[],
}




