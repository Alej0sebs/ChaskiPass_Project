import {create} from 'zustand';
import { ClientT, SelectedSeatT } from '../types';
import { devtools } from 'zustand/middleware';

interface SeatStore {
    selectedSeats: SelectedSeatT[];
    setSelectedSeats: (seats: SelectedSeatT[]) => void;
    addSeat: (seat: SelectedSeatT) => void;
    updateSeatClient: (seatId: string, client: ClientT) => void;
    removeSeat: (seatId: string) => void;
    clearSeats: () => void;
}

//Creacion del store de los asientos seleccionados
export const useSelectedSeatsStore = create<SeatStore>()(
    devtools((set, get) => ({
        selectedSeats: [],

        setSelectedSeats: (seats: SelectedSeatT[]) =>
            set({ selectedSeats: seats }, false, 'setSelectedSeats'),

        addSeat: (seat: SelectedSeatT) =>
            set((state) => ({ selectedSeats: [...state.selectedSeats, seat] }), false, 'addSeat'),

        updateSeatClient: (seatId: string, client: ClientT) =>
            set(
                (state) => ({
                    selectedSeats: state.selectedSeats.map((seat) =>
                        seat.seatId === seatId ? { ...seat, client } : seat
                    ),
                }),
                false,
                'updateSeatClient'
            ),

        removeSeat: (seatId: string) =>
            set(
                (state) => ({
                    selectedSeats: state.selectedSeats.filter((seat) => seat.seatId !== seatId),
                }),
                false,
                'removeSeat'
            ),

        clearSeats: () => set({ selectedSeats: [] }, false, 'clearSeats'),
    }))
);