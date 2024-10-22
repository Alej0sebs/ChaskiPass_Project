import { useState } from "react";
import useTypeSeats from "../../hooks/useTypeSeats";

type SelectTypesComponentProps = {
    onSelectChange:(selectedvalue:string)=>void;
}

export default function SelectTypesComponent({onSelectChange}:SelectTypesComponentProps) {
    const { selectSeatTypes} = useTypeSeats();
    const [selectedSeatType, setSelectedSeatType] = useState<string>('');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedSeatType(value);
        onSelectChange(value);
    };

    return (
        <select value={selectedSeatType} onChange={handleSelectChange}>
            {!selectedSeatType && <option value="">Tipo de asiento</option>}
            {selectSeatTypes.map((seatType) => (
                <option key={seatType.id} value={seatType.special_caracter}>
                    {seatType.name}
                </option>
            ))}
        </select>
    )
}