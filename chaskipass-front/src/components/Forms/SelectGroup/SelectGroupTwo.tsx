import React, { useState } from 'react';

interface SelectGroupProps {
  label: string;
  children: React.ReactNode;
}

const SelectGroupTwo: React.FC<SelectGroupProps> = ({ label, children }) => {
  const [selectedOption, setSelectedOption] = useState<string>(''); // Inicia sin ninguna opción seleccionada
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOption(value);

    // Cambia el estado si no es la opción predeterminada
    if (value !== '') {
      setIsOptionSelected(true);
    } else {
      setIsOptionSelected(false);
    }
  };

  return (
    <div>
      <label className="mb-3 block text-black dark:text-white">{label}</label>

      <div className="relative z-20 bg-white dark:bg-form-input">
        <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
        </span>

        <select
          value={selectedOption}
          onChange={changeTextColor}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 pl-5 pr-10 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            isOptionSelected ? 'text-black dark:text-white' : 'text-gray-400'
          }`}
          required // Campo obligatorio
        >
          <option value="" disabled>
            Seleccione una opción
          </option>
          {children}
        </select>

        <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill="#637381"
              ></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SelectGroupTwo;
