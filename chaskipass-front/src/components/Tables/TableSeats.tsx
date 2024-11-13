interface TableTicketsProps {
    headerTable: string;
    displayData: string[];
}

const TableSeats = ({ headerTable, displayData }: TableTicketsProps) => {
    return (
        <div className="h-96 overflow-x-auto w-[40%]">
            <table className="table table-pin-rows">
                <thead>
                    <tr>
                        <th>{headerTable}</th>
                    </tr>
                </thead>
                <tbody>
                    {displayData.map((val:string, index:number)=>(
                        <tr key={index}><td>{val}</td></tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default TableSeats;