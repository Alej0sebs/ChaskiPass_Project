import { SelectedSeatT } from "../../types";

interface TableTicketsProps {
    headerTable: string;
    displayData: SelectedSeatT[];
}

const TableSeats = ({ headerTable, displayData }: TableTicketsProps) => {
    return (
        <div className="h-96 overflow-x-auto w-[40%]">
            <table className="table table-pin-rows">
                <thead>
                    <tr>
                        <th>{headerTable}</th>
                        <th>Costo</th>
                    </tr>
                </thead>
                <tbody>
                    {displayData.map((val: SelectedSeatT, index: number) => (
                        <tr key={index}>
                            <td>{val.seatId}</td>
                            <td>{val.additionalCost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default TableSeats;