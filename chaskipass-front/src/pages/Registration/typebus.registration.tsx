import { useState, useEffect } from 'react';
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

interface BusElement {
    id: string;
    type: string;
    name: string;
    position: { x: number; y: number };
}

const TypebusRegistration = () => {
    const [elements, setElements] = useState<BusElement[]>([]); // Almacena los elementos del bus
    const [selectedElement, setSelectedElement] = useState<string | null>(null); // Almacena el ID del elemento seleccionado
    const [seatName, setSeatName] = useState(''); // Nombre dinámico del asiento
    const [bathCounter, setBathCounter] = useState(1); // Contador para los baños
    const [stairsCounter, setStairsCounter] = useState(1); // Contador para las escaleras

    const addElement = (type: string) => {
        const busContainer = document.getElementById('bus-container');
        const busRect = busContainer!.getBoundingClientRect();

        let newElement = {
            id: '',
            type,
            name: '',
            position: { x: 10 / busRect.width * 100, y: 10 / busRect.height * 100 },
        };

        if (type === 'seat' && seatName) {
            // Asignar ID basado en el nombre del asiento
            newElement.id = `seat-${seatName.toLowerCase()}`;
            newElement.name = seatName;
        } else if (type === 'bathroom') {
            // ID autoincremental para baños
            newElement.id = `bath-${bathCounter}`;
            setBathCounter(bathCounter + 1); // Incrementar contador para el próximo baño
        } else if (type === 'stairs') {
            // ID autoincremental para escaleras
            newElement.id = `stairs-${stairsCounter}`;
            setStairsCounter(stairsCounter + 1); // Incrementar contador para las próximas escaleras
        }

        // Verificar si ya existe un elemento con el mismo ID para evitar duplicados
        if (!elements.some(el => el.id === newElement.id)) {
            setElements([...elements, newElement]);
        } else {
            alert(`El ID "${newElement.id}" ya existe. Por favor, elige un nombre diferente para el asiento.`);
        }
    };

    const removeSelectedElement = () => {
        if (selectedElement !== null) {
            const updatedElements = elements.filter((el) => el.id !== selectedElement);
            setElements(updatedElements);
            setSelectedElement(null); // Deseleccionar después de eliminar
        }
    };

    useEffect(() => {
        const handleDrag = (e: MouseEvent, id: string) => {
            const element = document.getElementById(id);
            const busContainer = document.getElementById('bus-container');
            const busRect = busContainer!.getBoundingClientRect();
            const elementRect = element!.getBoundingClientRect();

            let shiftX = e.clientX - elementRect.left;
            let shiftY = e.clientY - elementRect.top;

            const onMouseMove = (event: MouseEvent) => {
                let newLeft = (event.clientX - busRect.left - shiftX) / busRect.width * 100;
                let newTop = (event.clientY - busRect.top - shiftY) / busRect.height * 100;

                // Obtener el tamaño del elemento
                const elementWidth = (elementRect.width / busRect.width) * 100;
                const elementHeight = (elementRect.height / busRect.height) * 100;

                // Limitar la posición para que no se salga del contenedor
                if (newLeft < 0) newLeft = 0;
                if (newTop < 0) newTop = 0;
                if (newLeft > 100 - elementWidth) newLeft = 100 - elementWidth; // Ajuste con el ancho del elemento
                if (newTop > 100 - elementHeight) newTop = 100 - elementHeight; // Ajuste con la altura del elemento

                const updatedElements = elements.map(el =>
                    el.id === id
                        ? { ...el, position: { x: newLeft, y: newTop } }
                        : el
                );
                setElements(updatedElements);
            };

            document.addEventListener('mousemove', onMouseMove);

            document.onmouseup = function () {
                document.removeEventListener('mousemove', onMouseMove);
                document.onmouseup = null;
            };
        };

        elements.forEach((el) => {
            const element = document.getElementById(el.id);
            if (element) {
                element!.onmousedown = (e) => {
                    setSelectedElement(el.id); // Selecciona el elemento cuando se hace clic en él
                    handleDrag(e as any, el.id);
                };
                element!.ondragstart = () => false; // Desactivar el arrastre por defecto
            }
        });
    }, [elements]);

    return (
        <>
            <div className="mx-auto max-w-270">
                <Breadcrumb pageName="Registro de buses" />
                <div className="flex flex-col md:flex-row items-start gap-4">
                    {/* Contenedor del bus con mejoras visuales */}
                    <div
                        id="bus-container"
                        className="relative h-[600px] w-[350px] md:w-[350px] border-4 border-gray-700 rounded-2xl bg-gradient-to-b from-gray-300 to-gray-100 shadow-lg"
                    >
                        {elements.map((element) => {
                            const busContainer = document.getElementById('bus-container');
                            const busRect = busContainer!.getBoundingClientRect();

                            const absoluteLeft = (element!.position.x / 100) * busRect.width;
                            const absoluteTop = (element!.position.y / 100) * busRect.height;

                            return (
                                <div
                                    key={element!.id}
                                    id={element!.id}
                                    className={`absolute cursor-grab ${selectedElement === element.id ? 'border border-blue-500' : ''}`}
                                    style={{
                                        left: `${absoluteLeft}px`,
                                        top: `${absoluteTop}px`,
                                    }}
                                >
                                    {element.type === 'seat' && (
                                        <svg width="60" height="52" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="reserved">
                                            <rect x="8.75" y="2.75" width="22.5" height="26.5" rx="2.25" fill="#FFF" stroke="#B8B8B8" strokeWidth="1.5"
                                                strokeLinejoin="round"></rect>
                                            <rect x="10.25" y="11.75" width="14.5" height="5.5" rx="2.25" transform="rotate(90 10.25 11.75)" fill="#FFF"
                                                stroke="#B8B8B8" strokeWidth="1.5" strokeLinejoin="round"></rect>
                                            <rect x="35.25" y="11.75" width="14.5" height="5.5" rx="2.25" transform="rotate(90 35.25 11.75)" fill="#FFF"
                                                stroke="#B8B8B8" strokeWidth="1.5" strokeLinejoin="round"></rect>
                                            <rect x="8.75" y="22.75" width="22.5" height="6.5" rx="2.25" fill="#FFF" stroke="#B8B8B8" strokeWidth="1.5"
                                                strokeLinejoin="round"></rect>
                                            {/* Texto dinámico que muestra el nombre del asiento */}
                                            <text width="20" height="20" x="20" y="18" fill="#000" fontSize="10" textAnchor="middle">{element.name}</text>
                                        </svg>
                                    )}
                                    {element.type === 'bathroom' && (
                                        <svg width="60" height="52" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="10" y="2" width="20" height="28" rx="3" fill="#FFF" stroke="#000" strokeWidth="1.5" />
                                            <circle cx="20" cy="12" r="4" fill="#000" />
                                            <rect x="15" y="18" width="10" height="8" fill="#000" />
                                        </svg>
                                    )}
                                    {element.type === 'stairs' && (
                                        <svg width="60" height="52" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
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

                    {/* Controles para agregar y eliminar elementos */}
                    <div className="controls mt-4 flex flex-col gap-4">
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
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Agregar Baño
                        </button>
                        <button
                            onClick={() => addElement('stairs')}
                            className="bg-yellow-500 text-white px-4 py-2 rounded"
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default TypebusRegistration;
