import React, { useState, useEffect } from 'react';
import SelectGroupTwo from './SelectGroup/SelectGroupTwo';

interface SalesFormProps {
    origin: string;
    destination: string;
    seat: number;
}

const SalesForm: React.FC<SalesFormProps> = ({ origin, destination, seat }) => {
    const [destinos, setDestinos] = useState<string[]>([]);

    useEffect(() => {
        setTimeout(() => {
            setDestinos(['Huaral', 'Quito', 'Ambato', 'Latacunga']);
        }, 1000);
    }, []);


    return (
        <>
            <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">BOLETO: 100 - 000017</h2>
            <form>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <SelectGroupTwo label="Tipo de Documento">
                            <option value="RUC">RUC</option>
                            <option value="Cedula">Cédula</option>
                            <option value="Pasaporte">Pasaporte</option>
                        </SelectGroupTwo>
                    </div>
                    <div className="relative">
                        <label className="mb-3 block text-black dark:text-white">
                            Número de Documento
                        </label>
                        <input
                            type="text"
                            placeholder="Ingrese número de documento"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 my-3">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Nombres
                        </label>
                        <input
                            type="text"
                            placeholder="Ingrese los nombres"
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Apellidos
                        </label>
                        <input
                            type="text"
                            placeholder="Ingrese los apellidos"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <SelectGroupTwo label="Destino">
                            {destinos.length > 0 ? (
                                destinos.map((destino) => (
                                    <option key={destino} value={destino}>
                                        {destino}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>
                                    Cargando destinos...
                                </option>
                            )}
                        </SelectGroupTwo>
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Precio
                        </label>
                        <input
                            type="number"
                            placeholder="Ingrese el precio"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div>
                        <SelectGroupTwo label="Estado">
                            <option value="reservar">Reservar</option>
                            <option value="vender">Vender</option>
                        </SelectGroupTwo>
                    </div>
                </div>
                <div className="flex justify-between items-center my-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Pagar
                    </button>
                    <div className="text-4xl font-bold text-black dark:text-white">Asiento: {seat}</div>
                </div>
            </form>
        </>
    );
};

export default SalesForm;