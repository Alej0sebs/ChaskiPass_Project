import { useState } from "react";

interface SwitcherProps {
    onChange: (checked: boolean) => void;
    initialChecked?: boolean;
}

const switcher = ({ onChange, initialChecked }: SwitcherProps) => {

    const [checked, setChecked] = useState(initialChecked || false);
    
    const handleToggle = () => {
        setChecked((prev) =>{
            const newChecked = !prev;
            onChange(newChecked);
            return newChecked;
        })
    }


    return (
        <input
            type="checkbox"
            value="synthwave"
            className="toggle theme-controller col-span-2 col-start-1 row-start-1 bg-blue-300 [--tglbg:theme(colors.blue.900)] checked:border-blue-800 checked:bg-blue-50 checked:[--tglbg:theme(colors.green.500)]"
            onChange={handleToggle} />

    )
}

export default switcher;