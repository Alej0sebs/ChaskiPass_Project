import React, { useState, useEffect } from 'react';
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

const TypebusRegistration = () => {
    // Estado para almacenar los elementos del bus (asientos, baños, escaleras) con posiciones relativas
    const [elements, setElements] = useState([]);

    // Función para agregar un nuevo elemento (asiento, baño, escaleras) con el SVG correspondiente
    const addElement = (type: any) => {
        const busContainer = document.getElementById('bus-container');
        const busRect = busContainer!.getBoundingClientRect();

        const newElement = {
            id: elements.length + 1, // ID único para cada elemento
            type,
            // Posición inicial relativa en porcentaje
            position: { x: 10 / busRect.width * 100, y: 10 / busRect.height * 100 },
        };
        setElements([...elements, newElement]);
    };

    // Efecto para manejar el arrastre de los elementos
    useEffect(() => {
        const handleDrag = (e: any, id: any) => {
            const element = document.getElementById(`element-${id}`);
            const busContainer = document.getElementById('bus-container');
            const busRect = busContainer!.getBoundingClientRect();
            const elementRect = element!.getBoundingClientRect();

            let shiftX = e.clientX - elementRect.left;
            let shiftY = e.clientY - elementRect.top;

            const onMouseMove = (event) => {
                let newLeft = (event.clientX - busRect.left - shiftX) / busRect.width * 100;
                let newTop = (event.clientY - busRect.top - shiftY) / busRect.height * 100;

                // Limitar los valores a entre 0 y 100 para mantenerse dentro del contenedor
                if (newLeft < 0) newLeft = 0;
                if (newTop < 0) newTop = 0;
                if (newLeft > 100) newLeft = 100;
                if (newTop > 100) newTop = 100;

                // Actualizar la posición del elemento en porcentajes
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
            const element = document.getElementById(`element-${el.id}`);
            if (element) {
                element!.onmousedown = (e) => handleDrag(e, el.id);
                element!.ondragstart = () => false; // Desactivar el arrastre por defecto
            }
        });
    }, [elements]);

    return (
        <>
            <div className="mx-auto max-w-270">
                <Breadcrumb pageName="Registro de buses" />
                <div className="flex flex-col md:flex-row justify-center items-start gap-4">

                    {/* Contenedor del bus */}
                    <div
                        id="bus-container"
                        className="relative h-[600px] w-[350px] md:w-[350px] border-2 border-gray-300 bg-white flex flex-col  md:flex-row justify-center items-center"
                    >
                        {elements.map((element) => {
                            const busContainer = document.getElementById('bus-container');
                            const busRect = busContainer!.getBoundingClientRect();

                            // Calcular las posiciones absolutas a partir de las proporciones almacenadas
                            const absoluteLeft = (element!.position.x / 100) * busRect.width;
                            const absoluteTop = (element!.position.y / 100) * busRect.height;

                            return (
                                <div
                                    key={element!.id}
                                    id={`element-${element!.id}`}
                                    className={`absolute cursor-grab`}
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
                                            <text width="20" height="20" x="20" y="18" fill="#000" fontSize="10" textAnchor="middle">V2</text>
                                        </svg>
                                    )}
                                    {element.type === 'bathroom' && (
                                        <svg width="60" height="52" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="10" y="2" width="20" height="28" rx="3" fill="#FFF" stroke="#000" strokeWidth="1.5" />
                                            <circle cx="20" cy="12" r="4" fill="#000" />
                                            <rect x="15" y="18" width="10" height="8" fill="#000" />
                                            <text x="20" y="29" textAnchor="middle" fill="#000" fontSize="6" fontFamily="Arial"></text>
                                        </svg>
                                    )}
                                    {element.type === 'stairs' && (
                                        <svg width="60" height="52" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="5" y="5" width="30" height="22" fill="#FFF" stroke="#000" strokeWidth="1.5" />
                                            <line x1="10" y1="20" x2="30" y2="20" stroke="#000" strokeWidth="1.5" />
                                            <line x1="10" y1="15" x2="30" y2="15" stroke="#000" strokeWidth="1.5" />
                                            <line x1="10" y1="10" x2="30" y2="10" stroke="#000" strokeWidth="1.5" />
                                            <text x="20" y="30" textAnchor="middle" fill="#000" fontSize="6" fontFamily="Arial"></text>
                                        </svg>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Botones para agregar los elementos */}
                    <div className="controls mt-4 flex flex-col gap-4 ">
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default TypebusRegistration;
