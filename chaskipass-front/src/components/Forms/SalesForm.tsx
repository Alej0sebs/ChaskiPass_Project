import React, { useState, useEffect } from 'react';
import SelectGroupTwo from './SelectGroup/SelectGroupTwo';
import TableSeats from '../Tables/TableSeats';
import { useClient } from '../../hooks/useClient';

interface SalesFormProps {
    stopOvers: string;
    stop_city_names: string;
    seats: string[];
}

interface PassengerData {
    nombres: string;
    apellidos: string;
}

const SalesForm: React.FC<SalesFormProps> = ({ seats, stopOvers, stop_city_names }) => {

    //Hooks
    const {getClientByDNI, loading} = useClient();

    const [destinos, setDestinos] = useState<string[]>([]);
    const [tipoDocumento, setTipoDocumento] = useState<string>('');
    const [numeroDocumento, setNumeroDocumento] = useState<string>('');
    const [nombres, setNombres] = useState<string>('');
    const [apellidos, setApellidos] = useState<string>('');
    const [isDocumentoValid, setIsDocumentoValid] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [selectedDestination, setSelectedDestination] = useState<string>('');
    const [isFound, setIsFound] = useState<boolean>(false);

    useEffect(() => {
        const cities = stop_city_names.split(',').map((city) => city.trim());
        const destination = stopOvers.split(',').map((stopOver, index) => `${stopOver.trim()} - ${cities[index]}`);
        destination.unshift('Viaje Completo');
        setDestinos(destination);
    }, [stopOvers, stop_city_names]);

    // Función para simular la búsqueda en la base de datos
    // const searchInDatabase = async (tipoDoc: string, numeroDoc: string): Promise<PassengerData | null> => {
    //     // Simular un retraso
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             // Simular datos encontrados
    //             if (numeroDoc === '1234567890') {
    //                 resolve({ nombres: 'Juan', apellidos: 'Pérez' });
    //             } else {
    //                 resolve(null);
    //             }
    //         }, 1000);
    //     });
    // };

    // Manejar cambio en "Tipo de Documento"
    const handleTipoDocumentoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setTipoDocumento(value);
        setNumeroDocumento('');
        setNombres('');
        setApellidos('');
        setIsDocumentoValid(false);
        setIsFound(false);
    };

    // Manejar cambio en "Número de Documento"
    const handleNumeroDocumentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); // Remover caracteres no numéricos
        const maxLength = tipoDocumento === 'Cedula' ? 10 : 9;
        if (value.length > maxLength) {
            value = value.slice(0, maxLength);
        }
        setNumeroDocumento(value);
        setIsDocumentoValid(value.length === maxLength);
    };

    const handleDestinationChange= (e:React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDestination(e.target.value);
    }

    // Usar efecto para desencadenar búsqueda cuando el documento es válido
    useEffect(() => {
        const fetchPassengerData = async () => {
            if (isDocumentoValid) {
                setIsSearching(true);
                const result = await getClientByDNI(numeroDocumento)
                if (result) {
                    setNombres(result.nombres);
                    setApellidos(result.apellidos);
                    setIsFound(true);
                } else {
                    setIsFound(false);
                    // Permitir entrada manual
                }
                setIsSearching(false);
            } else {
                setNombres('');
                setApellidos('');
                setIsFound(false);
            }
        };
        fetchPassengerData();
    }, [isDocumentoValid, tipoDocumento, numeroDocumento]);

    return (
        <>
            <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">BOLETO: 100 - 000017</h2>
            <form>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <SelectGroupTwo label="Tipo de Documento" onChange={handleTipoDocumentoChange} value={tipoDocumento}>
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
                            value={numeroDocumento}
                            onChange={handleNumeroDocumentoChange}
                            disabled={!tipoDocumento}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-gray-200 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        {isSearching && <p className="text-sm text-gray-500">Buscando...</p>}
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
                            value={nombres}
                            onChange={(e) => setNombres(e.target.value)}
                            disabled={!tipoDocumento || isSearching}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-gray-200 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Apellidos
                        </label>
                        <input
                            type="text"
                            placeholder="Ingrese los apellidos"
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                            disabled={!tipoDocumento || isSearching}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-gray-200 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <SelectGroupTwo label="Destino" value={selectedDestination} onChange={handleDestinationChange}>
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
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div>
                        <SelectGroupTwo label="Estado">
                            <option value="sn">Seleccione una opcion</option>
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
                    {seats.length > 0 ? (
                        <TableSeats headerTable='Boletos' displayData={seats}/>
                    ) : (
                        <div className="text-xl text-gray-500 dark:text-gray-400">
                            No hay asientos seleccionados
                        </div>
                    )}
                </div>
            </form>
        </>
    );
};

export default SalesForm;
