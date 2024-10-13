import { useState, useEffect } from 'react';
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import useBusLayout from '../../hooks/useBusLayout';
import { SeatConfigT } from '../../types';
import toast from 'react-hot-toast';

const TypebusRegistration = () => {
    const [busConfigurationName, setBusConfigurationName] = useState(''); // Nuevo estado para el nombre del bus
    const [numFloors, setNumFloors] = useState(1); // Estado para el número de pisos
    const [floorElements, setFloorElements] = useState<{ [key: number]: SeatConfigT[] }>({ 1: [] }); // Estado para almacenar elementos por piso
    const [selectedElement, setSelectedElement] = useState<string | null>(null); // Almacena el ID del elemento seleccionado
    const [seatName, setSeatName] = useState(''); // Nombre dinámico del asiento
    const [bathCounter, setBathCounter] = useState(1); // Contador para los baños
    const [stairsCounter, setStairsCounter] = useState(1); // Contador para las escaleras
    const [selectedFloor, setSelectedFloor] = useState(1); // Piso seleccionado
    const { loading, sendBusLayout } = useBusLayout();

    // Función para verificar si el nombre del asiento ya existe en cualquier piso
    const seatNameExists = (name: string) => {
        for (const floor in floorElements) {
            if (floorElements[floor].some(el => el.type === 'seat' && el.name.toLowerCase() === name.toLowerCase())) {
                return true;
            }
        }
        return false;
    };

    const addElement = (type: string) => {
        const busContainer = document.getElementById(`bus-container-${selectedFloor}`);
        const busRect = busContainer!.getBoundingClientRect();

        if (type === 'seat' && seatName === '') return;

        // Verificar si el nombre del asiento ya existe
        if (type === 'seat' && seatNameExists(seatName)) {
            toast.error(`El nombre del asiento "${seatName}" ya existe en otro piso.`);
            return;
        }

        let newElement = {
            id: '',
            type,
            name: '',
            position: { x: 10 / busRect.width * 100, y: 10 / busRect.height * 100 },
        };

        if (type === 'seat' && seatName) {
            newElement.id = `seat-${seatName.toLowerCase()}`;
            newElement.name = seatName;
            setSeatName('');
        } else if (type === 'bathroom') {
            newElement.id = `bath-${bathCounter}`;
            setBathCounter(bathCounter + 1);
        } else if (type === 'stairs') {
            newElement.id = `stairs-${stairsCounter}`;
            setStairsCounter(stairsCounter + 1);
        }

        const currentFloorElements = floorElements[selectedFloor] || [];

        if (!currentFloorElements.some(el => el.id === newElement.id)) {
            setFloorElements({
                ...floorElements,
                [selectedFloor]: [...currentFloorElements, newElement]
            });
        } else {
            alert(`El ID "${newElement.id}" ya existe. Por favor, elige un nombre diferente para el asiento.`);
        }
    };

    const removeSelectedElement = () => {
        if (selectedElement !== null) {
            const updatedElements = floorElements[selectedFloor].filter((el) => el.id !== selectedElement);
            setFloorElements({
                ...floorElements,
                [selectedFloor]: updatedElements
            });
            setSelectedElement(null);
        }
    };

    const handleFloorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newNumFloors = parseInt(e.target.value, 10);
        setNumFloors(newNumFloors);

        // Crear nuevos pisos si se selecciona más de 1
        if (newNumFloors === 2 && !floorElements[2]) {
            setFloorElements({
                ...floorElements,
                2: []
            });
        }
    };

    useEffect(() => {
        const handleDrag = (e: MouseEvent, id: string) => {
            const element = document.getElementById(id);
            const busContainer = document.getElementById(`bus-container-${selectedFloor}`);
            const busRect = busContainer!.getBoundingClientRect();
            const elementRect = element!.getBoundingClientRect();

            let shiftX = e.clientX - elementRect.left;
            let shiftY = e.clientY - elementRect.top;

            const onMouseMove = (event: MouseEvent) => {
                let newLeft = (event.clientX - busRect.left - shiftX) / busRect.width * 100;
                let newTop = (event.clientY - busRect.top - shiftY) / busRect.height * 100;

                const elementWidth = (elementRect.width / busRect.width) * 100;
                const elementHeight = (elementRect.height / busRect.height) * 100;

                if (newLeft < 0) newLeft = 0;
                if (newTop < 0) newTop = 0;
                if (newLeft > 100 - elementWidth) newLeft = 100 - elementWidth;
                if (newTop > 100 - elementHeight) newTop = 100 - elementHeight;

                const updatedElements = floorElements[selectedFloor].map(el =>
                    el.id === id
                        ? { ...el, position: { x: newLeft, y: newTop } }
                        : el
                );
                setFloorElements({
                    ...floorElements,
                    [selectedFloor]: updatedElements
                });
            };

            document.addEventListener('mousemove', onMouseMove);

            document.onmouseup = function () {
                document.removeEventListener('mousemove', onMouseMove);
                document.onmouseup = null;
            };
        };

        floorElements[selectedFloor]?.forEach((el) => {
            const element = document.getElementById(el.id);
            if (element) {
                element.onmousedown = (e) => {
                    setSelectedElement(el.id);
                    handleDrag(e as any, el.id);
                };
                element.ondragstart = () => false;
            }
        });
    }, [floorElements, selectedFloor]);

    // Solución al problema de las posiciones incorrectas al cambiar de piso
    useEffect(() => {
        floorElements[selectedFloor]?.forEach((el) => {
            const element = document.getElementById(el.id);
            if (element) {
                const busContainer = document.getElementById(`bus-container-${selectedFloor}`);
                const busRect = busContainer!.getBoundingClientRect();

                // Calcular la posición absoluta correctamente
                const absoluteLeft = (el.position.x / 100) * busRect.width;
                const absoluteTop = (el.position.y / 100) * busRect.height;

                element.style.left = `${absoluteLeft}px`;
                element.style.top = `${absoluteTop}px`;
            }
        });
    }, [selectedFloor, floorElements]);

    const saveSeatsConfiguration = () => {
        if (!busConfigurationName) {
            toast.error('Debes asignar un nombre al bus.');
            return;
        }
        if (floorElements[1].length === 0) {
            toast.error('El primer piso debe tener al menos un elemento.');
            return;
        }

        const cooperative = localStorage.getItem('chaski-log') || '{}'; 
        sendBusLayout({
            id: 0,
            name: busConfigurationName,
            cooperative_id: JSON.parse(cooperative).cooperative,
            layout: floorElements,
        });
    };

    return (
        <div className="mx-auto max-w-270">
            <Breadcrumb pageName="Registro de buses" />
            <div className="flex flex-col md:flex-row items-start gap-4">
                <div className="controls mt-4 flex flex-col gap-4">
                    {/* Input para el nombre del bus */}
                    <input
                        type="text"
                        placeholder="Nombre del bus"
                        value={busConfigurationName}
                        onChange={(e) => setBusConfigurationName(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                    />
                    {/* Selector para el número de pisos */}
                    <label>Número de pisos:</label>
                    <select value={numFloors} onChange={handleFloorChange} className="border border-gray-300 rounded px-2 py-1">
                        <option value={1}>1 Piso</option>
                        <option value={2}>2 Pisos</option>
                    </select>
                    <div>
                        {/* Selección de piso actual para edición */}
                        <label>Piso actual: </label>
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

                    {/* Input para el nombre del asiento */}
                    <input
                        type="text"
                        placeholder="Nombre del asiento (e.g. V1)"
                        value={seatName}
                        onChange={(e) => setSeatName(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                    />
                    <button
                        onClick={() => addElement('seat')}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Agregar Asiento
                    </button>
                    <button
                        onClick={() => addElement('bathroom')}
                        className="bg-purple-400 text-white px-4 py-2 rounded"
                    >
                        Agregar Baño
                    </button>
                    <button
                        onClick={() => addElement('stairs')}
                        className="bg-orange-400 text-white px-4 py-2 rounded"
                    >
                        Agregar Escalera
                    </button>
                    {/* Botón para eliminar el elemento seleccionado */}
                    <button
                        onClick={removeSelectedElement}
                        className={`bg-red-500 text-white px-4 py-2 rounded ${selectedElement === null ? 'opacity-50' : ''}`}
                        disabled={selectedElement === null}
                    >
                        Eliminar Elemento Seleccionado
                    </button>
                    <button
                        onClick={saveSeatsConfiguration}
                        className='bg-green-500 text-white px-4 py-2 rounded'
                        disabled={loading}
                    >
                        {loading ? <span className="loading loading-spinner"></span> : "Guardar"}
                    </button>
                </div>

                {/* Contenedores para los pisos */}
                {Array.from({ length: numFloors }, (_, i) => i + 1).map(floor => (
                    <div
                        key={floor}
                        id={`bus-container-${floor}`}
                        className={`relative h-[600px] w-[350px] border-4 border-gray-700 rounded-2xl bg-gradient-to-b from-gray-300 to-gray-100 shadow-lg ${selectedFloor === floor ? 'block' : 'hidden'}`}
                    >
                        {floorElements[floor]?.map((element) => {
                            const busContainer = document.getElementById(`bus-container-${floor}`);
                            const busRect = busContainer!.getBoundingClientRect();
                            const absoluteLeft = (element.position.x / 100) * busRect.width;
                            const absoluteTop = (element.position.y / 100) * busRect.height;

                            return (
                                <div
                                    key={element.id}
                                    id={element.id}
                                    className={`absolute cursor-grab ${selectedElement === element.id ? 'border border-blue-500' : ''}`}
                                    style={{
                                        left: `${absoluteLeft}px`,
                                        top: `${absoluteTop}px`,
                                    }}
                                >
                                    {element.type === 'seat' && (
                                        <svg width="60" height="52" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="reserved">
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
                ))}
            </div>
        </div>
    );
};

export default TypebusRegistration;
