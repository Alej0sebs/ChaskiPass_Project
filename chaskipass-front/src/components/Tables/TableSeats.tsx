import { SelectedSeatT } from "../../types";

interface TableTicketsProps {
    headerTable: string;
    displayData: SelectedSeatT[];
    onSelectSeat: (seat: SelectedSeatT) => void; // Nueva función para seleccionar asiento
}

const TableSeats = ({ headerTable, displayData, onSelectSeat }: TableTicketsProps) => {
    return (
        <div className="h-55 overflow-x-auto">
            <table className="table table-pin-rows">
                <thead>
                    <tr>
                        <th>{headerTable}</th>
                        <th>Costo Adicional</th>
                        <th>Pasajero</th>
                        <th>Destino de viaje final</th>
                    </tr>
                </thead>
                <tbody>
                    {displayData.map((val: SelectedSeatT, index: number) => (
                        <tr
                            key={index}
                            onClick={() => onSelectSeat(val)} // Asignar asiento al hacer clic
                            className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700" // Agregar feedback visual
                        >
                            <td>{val.seatId}</td>
                            <td>${val.additionalCost}</td>
                            <td>{val.client?.name} {val.client?.last_name}</td>
                            <td>{val.destination}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableSeats;
