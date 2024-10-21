import { useState } from "react";
import useTypeSeats from "../../hooks/useTypeSeats";

export default function SelectTypesComponent() {
    const { selectSeatTypes} = useTypeSeats();
    // console.log(seatTypes);

    return (
        <select>
            {selectSeatTypes.map((seatType) => (
                <option key={seatType.id} value={seatType.special_caracter}>
                    {seatType.name}
                </option>
            ))}
        </select>
    )
}