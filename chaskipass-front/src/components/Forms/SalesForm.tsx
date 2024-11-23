import React, { useState, useEffect } from 'react';
import SelectGroupTwo from './SelectGroup/SelectGroupTwo';
import TableSeats from '../Tables/TableSeats';
import { useClient } from '../../hooks/useClient';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import ChaskiLogoB from '../../images/chaski-logo/chaskilogoblack.svg';

interface SalesFormProps {
    stopOvers: string;
    stop_city_names: string;
    seats: string[];
    ticketData: {
        placa: string,
        piloto: string,
        copiloto: string,
        libres: string,
        vendidos: string,
        reservados: string,
        total: string,
        horaSalida: string,
        dia: Date,
        fechaViaje: Date,
        horaLlegada: string
        terminal: string
    };
}

interface PassengerData {
    nombres: string;
    apellidos: string;
}

const SalesForm: React.FC<SalesFormProps> = ({ seats, stopOvers, stop_city_names, ticketData }) => {

    //Hooks
    const { getClientByDNI, loading } = useClient();
    
    const [destinos, setDestinos] = useState<string[]>([]);
    const [tipoDocumento, setTipoDocumento] = useState<string>('');
    const [numeroDocumento, setNumeroDocumento] = useState<string>('');
    const [nombres, setNombres] = useState<string>('');
    const [apellidos, setApellidos] = useState<string>('');
    const [isDocumentoValid, setIsDocumentoValid] = useState<boolean>(false);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [selectedDestination, setSelectedDestination] = useState<string>('');
    const [isFound, setIsFound] = useState<boolean>(false);
    const [price, setPrice] = useState<number>();
    const [selectedState, setSelectedState] = useState<string>('');
    const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

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

    const handleEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedState(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedState !== 'vender') return;

        // Recolectar los datos del formulario
        const data = {
            tipoDocumento,
            numeroDocumento,
            nombres,
            apellidos,
            destino: selectedDestination,
            asientos: seats,
            price,
        };

        // Enviar datos al backend
        try {
            // const response = await fetch('http://localhost:3000/api/tickets', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data),
            // });

            // if (!response.ok) throw new Error('Error al guardar los datos');

            // Generar el PDF del boleto
            generatePDF(data);
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };

    const generatePDF = async (data: any) => {
        const doc = new jsPDF({
            format: [80, 180],
            unit: 'mm'
        });

        try {
            const response = await fetch(ChaskiLogoB);
            const svgText = await response.text();
            
            const svg = new DOMParser().parseFromString(svgText, 'image/svg+xml').documentElement;
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = 200;
            canvas.height = 150;
            
            const svgImage = new Image();
            const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
            const svgUrl = URL.createObjectURL(svgBlob);
            
            svgImage.onload = () => {
                ctx?.drawImage(svgImage, 0, 0, 200, 150);
                const pngBase64 = canvas.toDataURL('image/png');
                
                doc.addImage(pngBase64, 'PNG', 15, 0, 50, 40);
                
                generateRestOfPDF(doc, data);
            };
            
            svgImage.src = svgUrl;
        } catch (error) {
            console.error('Error al procesar el logo:', error);
            generateRestOfPDF(doc, data);
        }
    };

    const generateRestOfPDF = async (doc: jsPDF, data: any) => {
        doc.setFontSize(10);
        const centerX = 40;
        let currentY = 22;
        const lineHeight = 4;
        
        const addCenteredText = (text: string, y: number, fontSize: number = 10) => {
            doc.setFontSize(fontSize);
            doc.text(text, centerX, y, { align: 'center' });
        };

        const addInfoLine = (label: string, value: string) => {
            doc.setFontSize(8);
            doc.text(`${label}: ${value}`, 5, currentY);
            currentY += lineHeight;
        };

        currentY += lineHeight*3;
        addCenteredText('Av. Elhuesardo xD', currentY, 8);
        currentY += lineHeight;
        addCenteredText('RUC: 1818181818001', currentY, 8);
        currentY += lineHeight;
        addCenteredText('Teléfono: (03) 2 742 358', currentY, 8);
        currentY += lineHeight * 1.5;

        doc.setLineWidth(0.1);
        doc.line(5, currentY, 75, currentY);
        currentY += lineHeight;

        addCenteredText('BOLETO DE VIAJE', currentY, 10);
        currentY += lineHeight;
        addCenteredText('N° 100 - 000016', currentY, 10);
        currentY += lineHeight * 1.5;

        doc.line(5, currentY, 75, currentY);
        currentY += lineHeight;

        addInfoLine('Fecha', ticketData.dia.toString());
        addInfoLine('Hora Salida', ticketData.horaSalida);
        addInfoLine('Hora Llegada', ticketData.horaLlegada);
        addInfoLine('Bus', ticketData.placa);
        addInfoLine('Origen', ticketData.terminal);
        addInfoLine('Destino', data.destino);
        addInfoLine('Asiento', seats.join(', '));
        addInfoLine('Pasajero', `${data.nombres} ${data.apellidos}`);
        addInfoLine(data.tipoDocumento, ` ${data.numeroDocumento}`);
        addInfoLine('Fecha Emisión', `${new Date().getHours().toString()}:${new Date().getMinutes().toString()}`);
        addInfoLine('Total', `$ ${data.price.toFixed(2)}`);

        currentY += 25;

        const qrData = `Ticket:100-000017,DNI:${data.numeroDocumento},Asiento:${seats.join(',')}`;
        const qrCodeDataUrl = await QRCode.toDataURL(qrData);
        doc.addImage(qrCodeDataUrl, 'PNG', 25, currentY, 30, 30);
        currentY += 30;

        doc.line(5, currentY, 75, currentY);
        currentY += lineHeight;

        doc.setFontSize(6);
        addCenteredText('Este documento es un comprobante de pago válido.', currentY, 6);
        currentY += lineHeight;
        addCenteredText('Conserve este boleto para cualquier reclamo posterior.', currentY, 6);
        currentY += lineHeight;
        addCenteredText('Gracias por viajar con ChaskiPass', currentY, 6);

        const pdfBlob = doc.output('blob');
        setPdfBlob(pdfBlob);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };


    return (
        <>
            <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">BOLETO: 100 - 000017</h2>
            <form onSubmit={handleSubmit}>
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
                            value={price}
                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                            min="0"
                            step="0.01"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                    <div>
                        <SelectGroupTwo label="Estado" value={selectedState} onChange={handleEstadoChange}>
                            <option value="vender">Vender</option>
                            <option value="reservar">Reservar</option>
                        </SelectGroupTwo>
                    </div>
                </div>
                <div className="flex justify-between items-center my-4">
                    <button
                        type="submit"
                        disabled={seats.length === 0}
                        className={`py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${selectedState === 'reservar'
                            ? 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500'
                            : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
                            }`}
                    >
                        {selectedState === 'reservar' ? 'Reservar' : 'Pagar'}
                    </button>
                    {seats.length > 0 ? (
                        <TableSeats headerTable="Boletos" displayData={seats} />
                    ) : (
                        <div className="text-xl text-gray-500 dark:text-gray-400">
                            No hay asientos seleccionados
                        </div>
                    )}
                </div>
            </form>

            {showModal && pdfBlob && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white dark:bg-boxdark p-4 rounded-md shadow-lg"
                        onClick={(e) => e.stopPropagation()} // Evitar que el clic dentro cierre el modal
                    >
                        <iframe
                            src={URL.createObjectURL(pdfBlob)}
                            width="500px"
                            height="800px"
                            title="Boleto PDF"
                            className="border border-gray-300 rounded-md"
                        ></iframe>
                        <button
                            onClick={closeModal}
                            className="mt-4 w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default SalesForm;
