import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { SeatConfigT } from "../../types";
import toast from "react-hot-toast";
import Accordion from "../../components/Accordion";
import Tabs from "../../components/Tabs";
import SalesForm from "../../components/Forms/SalesForm";
import { AlertCircle } from "lucide-react";
import TableOne from "../../components/Tables/TableOne";
import { useLocation } from "react-router-dom";
import SvgSeatComponent from "../../components/busElements/svgSeats.components";
import useSeatStructure from "../../hooks/useSeatStructure";
import SvgBathroomComponent from "../../components/busElements/svgBathroom.components";
import SvgStairsComponent from "../../components/busElements/svgStairs.components";
import BusTemplate from "../../components/Bus";

interface InputFieldProps {
    label: string;
    value: string;
    isWide?: boolean;
}

const TicketsalesRegistration = () => {
    //get data from frequency
    const location = useLocation();
    const { frequencyData } = location.state || {};
    if (!frequencyData) {
        return <div>No se han seleccionado datos de una frecuencia</div>
    }
    //hooks
    const { getSeatStructure } = useSeatStructure();

    //useState
    const [floorElements, setFloorElements] = useState<{ [key: number]: SeatConfigT[] }>({}); // Almacenar los elementos del bus por piso
    const [numFloors, setNumFloors] = useState(1); // Número de pisos
    const [selectedFloor, setSelectedFloor] = useState(1); // Piso seleccionado para visualizar
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]); // Asientos seleccionados por el usuario para reservar

    //global variables
    let totalSeats: number = 0;

    //Tomo los valores de la frecuencia
    useEffect(() => {
        const fetchBusConfiguration = async () => {
            try {
                const { id: frequency_id, bus_id, bus_structure_id } = frequencyData;
                const busData = await getSeatStructure({ frequency_id, bus_id, bus_structure_id });
                if (busData) {
                    const numFloors = Object.keys(busData).length;
                    setNumFloors(numFloors);
                    setFloorElements(busData);

                    // Calcula el número total de asientos
                    totalSeats = Object.values(busData).reduce((acc, floor) => {
                        const seatCount = floor.filter((element: any) => element.type === "seat").length;
                        return acc + seatCount;
                    }, 0);
                }
            } catch (err) {
                toast.error('Error al obtener la estructura del bus');
            }
        };
        fetchBusConfiguration();
    }, [frequencyData]);

    // Manejar la selección de un asiento
    const handleSeatClick = (seatId: string) => {
        setSelectedSeats((prevSelectedSeats) =>
            prevSelectedSeats.includes(seatId)
                ? prevSelectedSeats.filter((id) => id !== seatId)
                : [...prevSelectedSeats, seatId]
        );
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
        { title: 'Ventas', content: <SalesForm seats={selectedSeats} stopOvers={frequencyData.stop_station_names} stop_city_names={frequencyData.stop_city_names} /> },
        { title: 'Reservados', content: <TableOne /> },
        { title: 'Pasajeros', content: <TableOne /> }
    ];

    //Contabilizar los datos de los asientos segun la estructura
    const statuses = [
        { label: 'Libre', count: 22, statusSeat: 'free', name: 'F' },
        { label: 'Reservados', count: 6, statusSeat: 'reserved', name: 'R' },
        { label: 'Vendidos', count: 11, statusSeat: 'sold', name: 'V' },
    ];

    // Estos datos vendrían de una consulta en una aplicación real
    const travelData = {
        placa: frequencyData.license_plate,
        piloto: frequencyData.driver_name,
        copiloto: 'Un x',
        libres: '32',
        vendidos: '15',
        reservados: '0',
        total: '47',
        horaSalida: frequencyData.departure_time,
        dia: frequencyData.date,
        fechaViaje: frequencyData.date,
        horaLlegada: frequencyData.arrival_time,
        terminal: `${frequencyData.departure_station_name} - ${frequencyData.departure_city_name}`,
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
                            className="border border-gray-300 rounded px-2 py-1 bg-transparent transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
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
                        <BusTemplate floorNumber={selectedFloor}>
                            {floorElements[selectedFloor]?.map((element) => (
                                <div
                                    key={element.id}
                                    id={element.id}
                                    className={`absolute cursor-pointer ${element.type === 'seat' && isSeatSelected(element.id) ? 'border border-green-500' : ''
                                        }`}
                                    style={{
                                        left: `${element.position.x}%`,
                                        top: `${element.position.y}%`,
                                    }}
                                    onClick={() => element.type === 'seat' && handleSeatClick(element.id)}
                                >
                                    {element.type === 'seat' && (
                                        <SvgSeatComponent
                                            name={element.name}
                                            isSelected={isSeatSelected(element.id)}
                                            status="free" // Puedes ajustar el estado según tus datos
                                        />
                                    )}
                                    {element.type === 'bathroom' && <SvgBathroomComponent />}
                                    {element.type === 'stairs' && <SvgStairsComponent />}
                                </div>
                            ))}
                        </BusTemplate>
                    </div>
                </div>

                <div className="flex-grow">
                    <Accordion title="Descripción" color="#4A90E2">
                        <div className="flex p-4">
                            {statuses.map((statusSeat) => (
                                <div key={statusSeat.label} className="flex items-center  mx-auto">
                                    <SvgSeatComponent name={statusSeat.name} isSelected={false} status={statusSeat.statusSeat} />
                                    <div className="flex flex-col">
                                        <span className="text-lg font-medium text-black dark:text-white">{statusSeat.label}</span>
                                        <span className="text-base text-black dark:text-white">{statusSeat.label.toLowerCase()}: {statusSeat.count}</span>
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
                            <InputField label="HORA PARTIDA" value={travelData.horaLlegada} />
                        </div>
                    </Accordion>

                    <Tabs tabs={tabsData} />
                </div>
            </div>
        </div >
    );


};

export default TicketsalesRegistration;
