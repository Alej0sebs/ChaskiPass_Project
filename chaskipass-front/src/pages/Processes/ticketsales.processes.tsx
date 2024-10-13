import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { SeatConfigT } from "../../types";
import toast from "react-hot-toast";

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

    return (
        <div className="mx-auto max-w-270">
            <Breadcrumb pageName="Selección de asientos" />

            {/* Controles de piso */}
            <div className="controls mt-4">
                <label>Piso actual:</label>
                <select
                    value={selectedFloor}
                    onChange={(e) => setSelectedFloor(parseInt(e.target.value, 10))}
                    className="border border-gray-300 rounded px-2 py-1"
                >
                    {Array.from({ length: numFloors }, (_, i) => i + 1).map(floor => (
                        <option key={floor} value={floor}>Piso {floor}</option>
                    ))}
                </select>
            </div>

            {/* Contenedor de visualización de asientos */}
            <div
                id={`bus-container-${selectedFloor}`}
                className="relative h-[600px] w-[350px] border-4 border-gray-700 rounded-2xl bg-gradient-to-b from-gray-300 to-gray-100 shadow-lg"
            >
                {/* Renderizar los elementos del piso actual */}
                {floorElements[selectedFloor]?.map((element) => {
                    const busContainer = document.getElementById(`bus-container-${selectedFloor}`);
                    const busRect = busContainer!.getBoundingClientRect();
                    const absoluteLeft = (element.position.x / 100) * busRect.width;
                    const absoluteTop = (element.position.y / 100) * busRect.height;

                    return (
                        <div
                            key={element.id}
                            id={element.id}
                            className={`absolute cursor-pointer ${element.type === 'seat' && isSeatSelected(element.id) ? 'bg-green-400' : ''}`}
                            style={{
                                left: `${absoluteLeft}px`,
                                top: `${absoluteTop}px`,
                            }}
                            onClick={() => element.type === 'seat' && handleSeatClick(element.id)} // Solo permitir click en asientos
                        >
                            {element.type === 'seat' && (
                                <svg width="60" height="52" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="seat">
                                    {/* Seat SVG */}
                                    <rect x="8.75" y="2.75" width="22.5" height="26.5" rx="2.25" fill="#FFF" stroke="#B8B8B8" strokeWidth="1.5"
                                        strokeLinejoin="round"></rect>
                                    <text width="20" height="20" x="20" y="18" fill="#000" fontSize="10" textAnchor="middle">{element.name}</text>
                                </svg>
                            )}
                            {element.type === 'bathroom' && (
                                <svg width="60" height="52" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* Bathroom SVG */}
                                    <rect x="10" y="2" width="20" height="28" rx="3" fill="#FFF" stroke="#000" strokeWidth="1.5" />
                                    <circle cx="20" cy="12" r="4" fill="#000" />
                                    <rect x="15" y="18" width="10" height="8" fill="#000" />
                                </svg>
                            )}
                            {element.type === 'stairs' && (
                                <svg width="60" height="52" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* Stairs SVG */}
                                    <rect x="5" y="5" width="30" height="22" fill="#FFF" stroke="#000" strokeWidth="1.5" />
                                    <line x1="10" y1="20" x2="30" y2="20" stroke="#000" strokeWidth="1.5" />
                                    <line x1="10" y1="15" x2="30" y2="15" stroke="#000" strokeWidth="1.5" />
                                    <line x1="10" y1="10" x2="30" y2="10" stroke="#000" strokeWidth="1.5" />
                                </svg>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Botón para comprar asientos seleccionados */}
            <div className="mt-4">
                <button
                    onClick={handlePurchase}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Comprar Asientos
                </button>
            </div>
        </div>
    );
};

export default TicketsalesRegistration;
