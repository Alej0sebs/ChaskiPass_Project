import React, { useState, useEffect } from 'react';
import SelectGroupTwo from './SelectGroup/SelectGroupTwo';
import TableSeats from '../Tables/TableSeats';
import { useClient } from '../../hooks/useClient';
import { ClientT, FrequencyListObjectT, SelectedSeatT } from '../../types';
import { useSelectedSeatsStore } from '../../Zustand/useSelectedSeats';

interface SalesFormProps {
    dataFrequency: FrequencyListObjectT;
}

interface PassengerData {
    name: string;
    lastName: string;
    exist: boolean;
}

const SalesForm: React.FC<SalesFormProps> = ({ dataFrequency }: SalesFormProps) => {

    //Store seats
    const { selectedSeats, addSeat, removeSeat, updateSeatClient } = useSelectedSeatsStore();
    //Hooks
    const { getClientByDNI } = useClient();

    const [destinos, setDestinos] = useState<string[]>([]);
    const [documentType, setDocumentType] = useState<string>('');
    const [documentNumber, setDocumentNumber] = useState<string>('');
    const [name, setNames] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    // const [isDocumentoValid, setIsDocumentoValid] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [selectedDestination, setSelectedDestination] = useState<string>('');
    const [isFound, setIsFound] = useState<boolean>(false);
    //total price
    const [totalPrice, setTotalPrice] = useState<number>(0);
    // Estado de los asientos para asignacion
    const [currentSeat, setCurrentSeat] = useState<SelectedSeatT | null>(null);



    useEffect(() => {
        const cities = dataFrequency.stop_city_names.split(',').map((city) => city.trim());
        const destination = dataFrequency.stop_station_names.split(',').map((stopOver, index) => `${stopOver.trim()} - ${cities[index]}`);
        destination.unshift('Viaje Completo');
        setDestinos(destination);
    }, [dataFrequency]);

    useEffect(() => {
        const accumulativePrice: number = selectedSeats.reduce((acc, seat) => {
            return acc + (Number(dataFrequency.price) + Number(seat.additionalCost));
        }, 0);
        setTotalPrice(Number(accumulativePrice.toFixed(2)));
    }, [selectedSeats, dataFrequency.price]);

    const isDocumentoValid = documentNumber.length === (documentType === 'Cedula' ? 10 : 9);

    // Usar efecto para desencadenar búsqueda cuando el documento es válido
    useEffect(() => {
        const fetchPassengerData = async () => {
            if (isDocumentoValid && documentNumber) {
                setIsSearching(true);
                const result = await getClientByDNI(documentNumber)
                if (result) {
                    setNames(result.client.name);
                    setLastName(result.client.last_name);
                    setIsFound(result.client.exist);
                }
                setIsSearching(false);
            } else {
                setNames('');
                setLastName('');
                setIsFound(false);
            }
        };
        fetchPassengerData();
    }, [isDocumentoValid, documentType, documentNumber]);


    // Manejar cambio en "Tipo de Documento"
    const handledocumentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setDocumentType(value);
        setDocumentNumber('');
        setNames('');
        setLastName('');
        setIsFound(false);
    };

    // Manejar cambio en "Número de Documento"
    const handledocumentNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ''); // Remover caracteres no numéricos
        const maxLength = documentType === 'Cedula' ? 10 : 9;
        if (value.length > maxLength) {
            value = value.slice(0, maxLength);
        }
        setDocumentNumber(value);
    };

    const handleDestinationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDestination(e.target.value);
    }

    const handleSelectSeat = (seat: SelectedSeatT) => {
        setCurrentSeat(seat);
        setDocumentType(''); // Opcional: limpiar inputs
        setDocumentNumber('');
        setNames(seat.client?.name || '');
        setLastName(seat.client?.lastName || '');
    };

    //Agrego los datos del pasajero
    const setClientSeat = (client: PassengerData) => {
        if (currentSeat) {
            updateSeatClient(currentSeat.seatId, {
                dni: documentNumber,
                name: client.name,
                lastName: client.lastName,
                exist: isFound
            });
            setCurrentSeat(null);
        }
    }


    return (
        <>
            <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">BOLETO: 100 - 000017</h2>
            <div className="col-span-3">
                <label className="mb-3 block text-black dark:text-white text-lg font-semibold">
                    Frecuencia: {dataFrequency.id}
                </label>
            </div>
            <form>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <SelectGroupTwo label="Tipo de Documento" onChange={handledocumentTypeChange} value={documentType}>
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
                            value={documentNumber}
                            onChange={handledocumentNumberChange}
                            disabled={!documentType}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-gray-200 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        {isSearching && <p className="text-sm text-gray-500">Buscando...</p>}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 my-3">
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Nombre
                        </label>
                        <input
                            type="text"
                            placeholder="Ingrese los Names"
                            value={name}
                            onChange={(e) => setNames(e.target.value)}
                            disabled={!documentType || isSearching}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-gray-200 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div>
                        <label className="mb-3 block text-black dark:text-white">
                            Apellido
                        </label>
                        <input
                            type="text"
                            placeholder="Ingrese los lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            disabled={!documentType || isSearching}
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
                            type="text"
                            placeholder="Ingrese el precio"
                            value={totalPrice}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div>
                        {selectedSeats.length === 1 || selectedSeats.every(seat => seat.client) ? (
                            <>
                                <label className="mb-3 block text-black dark:text-white">
                                    Procesar Pago
                                </label>
                                <button
                                    type="button"
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Pagar
                                </button>
                            </>
                        ) : (
                            <>
                                <label className="mb-3 block text-black dark:text-white">
                                    Agregar Pasajero
                                </label>
                                <button
                                    type="button"
                                    className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                    onClick={() => setClientSeat({ name, lastName, exist:isFound})}
                                >
                                    Agregar
                                </button>
                            </>
                        )}
                    </div>
                    <div className="col-span-3">
                        <label className="mb-3 block text-black dark:text-white text-lg font-semibold">
                            Asiento: {
                                selectedSeats.length === 0
                                    ? ''
                                    : selectedSeats.length === 1
                                        ? selectedSeats[0].seatId
                                        : currentSeat?.seatId || 'No seleccionado'
                            }

                        </label>
                    </div>
                </div>
                <div className="flex justify-between items-center my-4">
                    {selectedSeats.length > 0 ? (
                        <TableSeats headerTable='Boletos' displayData={selectedSeats} onSelectSeat={handleSelectSeat} />
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
