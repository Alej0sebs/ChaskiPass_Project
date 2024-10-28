import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { SeatConfigT } from "../../types";
import toast from "react-hot-toast";
import Accordion from "../../components/Accordion";
import Tabs from "../../components/Tabs";
import SalesForm from "../../components/Forms/SalesForm";
import { AlertCircle, Square } from "lucide-react";
import TableOne from "../../components/Tables/TableOne";
import TableThree from "../../components/Tables/TableThree";

interface InputFieldProps {
    label: string;
    value: string;
    isWide?: boolean;
}

const TicketsalesRegistration = () => {
    const [floorElements, setFloorElements] = useState<{ [key: number]: SeatConfigT[] }>({}); // Almacenar los elementos del bus por piso
    const [numFloors, setNumFloors] = useState(1); // Número de pisos
    const [selectedFloor, setSelectedFloor] = useState(1); // Piso seleccionado para visualizar
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]); // Asientos seleccionados por el usuario para reservar

    // Simular la llamada a la API para recuperar los datos del bus (esto debería ser reemplazado por una llamada real a tu backend)
    const fetchBusConfiguration = async () => {
        // Simulación de datos recuperados de la base de datos
        const busData = {
            numFloors: 2,
            floors: {
                1: [
                    { id: 'seat-v1', type: 'seat', name: 'V1', position: { x: 10, y: 10 } },
                    { id: 'seat-v2', type: 'seat', name: 'V2', position: { x: 30, y: 10 } },
                    { id: 'bath-1', type: 'bathroom', name: 'Bathroom', position: { x: 80, y: 20 } },
                ],
                2: [
                    { id: 'seat-v3', type: 'seat', name: 'V3', position: { x: 10, y: 10 } },
                    { id: 'seat-v4', type: 'seat', name: 'V4', position: { x: 30, y: 10 } },
                    { id: 'stairs-1', type: 'stairs', name: 'Stairs', position: { x: 70, y: 20 } },
                ],
            },
        };

        // Establecer los datos en los estados
        setNumFloors(busData.numFloors);
        setFloorElements(busData.floors);
    };



    useEffect(() => {
        fetchBusConfiguration(); // Llamar a la función para obtener la configuración
    }, []);

    // Manejar la selección de un asiento
    const handleSeatClick = (seatId: string) => {
        // Si el asiento ya está seleccionado, lo deselecciona
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(id => id !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const isSeatSelected = (seatId: string) => selectedSeats.includes(seatId);

    const handlePurchase = () => {
        if (selectedSeats.length === 0) {
            toast.error('Debe seleccionar al menos un asiento para continuar.');
            return;
        }

        // Aquí enviarías los asientos seleccionados al backend para procesar la compra
        toast.success(`Has reservado los siguientes asientos: ${selectedSeats.join(', ')}`);
    };

    const tabsData = [
        { title: 'Ventas', content: <SalesForm origin="Baños" destination="Quito" seat={5} /> },
        { title: 'Reservados', content: <TableOne/> },
        { title: 'Pasajeros', content: <TableOne/> }
    ];

    const statuses = [
        { label: 'Libre', count: 22, color: 'text-gray-500', bgColor: 'bg-gray-100' },
        { label: 'Reservados', count: 6, color: 'text-amber-500', bgColor: 'bg-amber-100' },
        { label: 'Vendidos', count: 11, color: 'text-teal-500', bgColor: 'bg-teal-100' },
    ];

    // Estos datos vendrían de una consulta en una aplicación real
    const travelData = {
        placa: 'TBA-2365',
        piloto: 'Andrea Sifuentes Diaz',
        copiloto: 'Ronaldo Izaguirre Melchor',
        libres: '32',
        vendidos: '15',
        reservados: '0',
        total: '47',
        horaSalida: '05:00:00',
        dia: '2021-04-30',
        fechaViaje: '2021-04-30',
        horaPartida: '05:05:00',
        terminal: 'TERMINAL TERRESTRE - BAÑOS'
    };

    const InputField = ({ label, value, isWide = false }: InputFieldProps) => (
        <div className={`mb-4 ${isWide ? 'col-span-2' : ''}`}>
            <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-200">
                {label}
            </label>
            <input
                type="text"
                value={value}
                disabled
                className="w-full rounded-lg border-[1.5px] border-gray-300 bg-gray-100 py-3 px-5 text-gray-700 outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-gray-200 dark:border-form-strokedark dark:bg-form-input dark:text-gray-300"
            />
        </div>
    );


    return (
        <div className="mx-auto max-w-7xl p-4">
            <Breadcrumb pageName="Selección de asientos" />
            <div className="flex flex-col md:flex-row gap-15 mt-4">


                <div className="max-w-[350px] min-w-[256px] md:w-[300px] flex-shrink-0">

                    <div className="controls mb-4">
                        <label className="mr-4">Piso actual:</label>
                        <select
                            value={selectedFloor}
                            onChange={(e) => setSelectedFloor(parseInt(e.target.value, 10))}
                            className="border border-gray-300 rounded px-2 py-1   bg-transparent transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                        >
                            {Array.from({ length: numFloors }, (_, i) => i + 1).map((floor) => (
                                <option key={floor} value={floor}>
                                    Piso {floor}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div
                        id={`bus-container-${selectedFloor}`}
                        className="relative h-[600px] w-full border-4 border-gray-700 rounded-2xl bg-gradient-to-b from-gray-300 to-gray-100 shadow-lg"
                    >
                        {floorElements[selectedFloor]?.map((element) => {
                            const busContainer = document.getElementById(`bus-container-${selectedFloor}`);
                            const busRect = busContainer!.getBoundingClientRect();
                            const absoluteLeft = (element.position.x / 100) * busRect.width;
                            const absoluteTop = (element.position.y / 100) * busRect.height;

                            return (
                                <div
                                    key={element.id}
                                    id={element.id}
                                    className={`absolute cursor-pointer ${element.type === 'seat' && isSeatSelected(element.id) ? 'bg-green-400' : ''
                                        }`}
                                    style={{
                                        left: `${absoluteLeft}px`,
                                        top: `${absoluteTop}px`,
                                    }}
                                    onClick={() => element.type === 'seat' && handleSeatClick(element.id)} // Solo permitir click en asientos
                                >

                                    {element.type === 'seat' && (
                                        <svg
                                            width="60"
                                            height="52"
                                            viewBox="0 0 40 32"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="seat"
                                        >
                                            <rect
                                                x="8.75"
                                                y="2.75"
                                                width="22.5"
                                                height="26.5"
                                                rx="2.25"
                                                fill="#FFF"
                                                stroke="#B8B8B8"
                                                strokeWidth="1.5"
                                                strokeLinejoin="round"
                                            ></rect>
                                            <text
                                                width="20"
                                                height="20"
                                                x="20"
                                                y="18"
                                                fill="#000"
                                                fontSize="10"
                                                textAnchor="middle"
                                            >
                                                {element.name}
                                            </text>
                                        </svg>
                                    )}

                                    {element.type === 'bathroom' && (
                                        <svg
                                            width="60"
                                            height="52"
                                            viewBox="0 0 40 32"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                x="10"
                                                y="2"
                                                width="20"
                                                height="28"
                                                rx="3"
                                                fill="#FFF"
                                                stroke="#000"
                                                strokeWidth="1.5"
                                            />
                                            <circle cx="20" cy="12" r="4" fill="#000" />
                                            <rect x="15" y="18" width="10" height="8" fill="#000" />
                                        </svg>
                                    )}
                                    {element.type === 'stairs' && (
                                        <svg
                                            width="60"
                                            height="52"
                                            viewBox="0 0 40 32"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                x="5"
                                                y="5"
                                                width="30"
                                                height="22"
                                                fill="#FFF"
                                                stroke="#000"
                                                strokeWidth="1.5"
                                            />
                                            <line
                                                x1="10"
                                                y1="20"
                                                x2="30"
                                                y2="20"
                                                stroke="#000"
                                                strokeWidth="1.5"
                                            />
                                            <line
                                                x1="10"
                                                y1="15"
                                                x2="30"
                                                y2="15"
                                                stroke="#000"
                                                strokeWidth="1.5"
                                            />
                                            <line
                                                x1="10"
                                                y1="10"
                                                x2="30"
                                                y2="10"
                                                stroke="#000"
                                                strokeWidth="1.5"
                                            />
                                        </svg>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-4">
                        <button
                            onClick={handlePurchase}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Comprar Asientos
                        </button>
                    </div>
                </div>
                <div className="flex-grow">
                    <Accordion title="Descripción" color="#4A90E2">
                        <div className="flex p-4">
                            {statuses.map((status) => (
                                <div key={status.label} className="flex items-center  mx-auto">
                                    <div className={`p-1 ${status.bgColor} rounded`}>
                                        <Square className={`w-5 h-5 ${status.color}`} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-lg font-medium text-gray-700">{status.label}</span>
                                        <span className="text-base text-gray-500">{status.label.toLowerCase()}: {status.count}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Accordion>
                    <Accordion title="Detalle de Bus Baños - Quito" color="#f4c05c">
                            <div className="grid grid-cols-3 gap-x-6 gap-y-2">
                                <InputField label="PLACA DE BUS" value={travelData.placa} />
                                <InputField label="LIBRES" value={travelData.libres} />
                                <InputField label="PILOTO" value={travelData.piloto} />
                                <InputField label="VENDIDOS" value={travelData.vendidos} />
                                <InputField label="COPILOTO" value={travelData.copiloto} />
                                <InputField label="RESERVADOS" value={travelData.reservados} />

                                <div className="my-auto">
                                    <div className="bg-teal-600 text-white py-2 px-4 rounded-md inline-block">
                                        {travelData.terminal}
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <span className="font-medium">TOTAL:</span>
                                    <input
                                        type="text"
                                        value={travelData.total}
                                        disabled
                                        className="w-16 rounded-lg border-[1.5px] border-gray-300 bg-gray-100 py-1 px-2 text-gray-700 outline-none"
                                    />
                                    <AlertCircle className="text-red-500 w-5 h-5" />
                                </div>

                                <InputField label="HORA SALIDA" value={travelData.horaSalida} />
                                <InputField label="DIA" value={travelData.dia} />
                                <InputField label="FECHA DE VIAJE" value={travelData.fechaViaje} />
                                <InputField label="HORA PARTIDA" value={travelData.horaPartida} />
                            </div>
                    </Accordion>

                    <Tabs tabs={tabsData} />
                </div>
            </div>
        </div>
    );


};

export default TicketsalesRegistration;
