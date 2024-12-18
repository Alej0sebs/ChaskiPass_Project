import React, { useState, useEffect } from 'react';
import DataList from '../../components/DataList/datalist.components';
import { useSeller } from '../../hooks/useSeller';
import { TicketsListT } from '../../types';
import useBusStations from '../../hooks/useBusStations';
import toast from 'react-hot-toast';
import useSerialStation from '../../hooks/useSerialStation'; // Importar el hook
import PaginationDataTable from '../../components/Tables/PaginationDataTable';

const TicketSeriesRegistration = () => {
    const { loading: loadingSellers, selectSeller } = useSeller();
    const { loading: loadingStations, dataListBusStations } = useBusStations();
    const { loading, createSerialStation, getSerialStation } = useSerialStation(); // Usar el hook para obtener datos y crear seriales
    const [selectedSeller, setSelectedSeller] = useState<string | null>(null);
    const [selectedStation, setSelectedStation] = useState<number | null>(null);
    const [serial_number, setSerie] = useState<string>('');
    const [serialStations, setSerialStations] = useState<TicketsListT[]>([]); // Estado para las series de boletos
    const [totalPages, setTotalPages] = useState<number>(0); // Total de páginas
    const [currentPage, setCurrentPage] = useState(0); // Página inicial en 1, no en 0


    // Manejadores para guardar el id de la selección
    const handleSelectSede = (stationId: string) => setSelectedStation(Number(stationId)); // Convertir a número
    const handleSelectSeller = (sellerId: string) => setSelectedSeller(sellerId);

    // Manejar el envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedSeller || !selectedStation || !serial_number) {
            toast.error('Por favor complete todos los campos.');
            return;
        }

        const SerialStationData: TicketsListT = {
            station_id: selectedStation,
            user_id: selectedSeller,
            serial_number: serial_number,
            status: "true",
        };

        try {
            await createSerialStation(SerialStationData); // Guardar datos usando el hook
            toast.success('Serie registrada correctamente');
            handleCancelBtn();
            fetchSerialStations(); // Volver a cargar las series después de registrar
        } catch (error) {
            console.error("Error al guardar la serie:", error);
        }
    };

    const handleCancelBtn = () => {
        setSelectedSeller(null);
        setSelectedStation(null);
        setSerie('');
    };


    const fetchSerialStations = async () => {
        try {
            const data = await getSerialStation(); // Obtén la respuesta de la API
            if (Array.isArray(data)) {
                // Si la respuesta es un arreglo, mapeamos los datos
                const formattedData = data.map((item: any) => ({
                    serial_number: item.serial_number,
                    station_name: item.BusStation.name,
                    user_name: `${item.User.name} ${item.User.last_name}`,
                    station_id: item.BusStation.id, // Agregamos station_id
                    user_id: item.User.dni, // Agregamos user_id (puede ser cualquier identificador único del usuario)
                    status: "active" // Asegúrate de incluir el valor para status si se requiere
                }));

                // Actualiza los estados con los datos formateados
                setSerialStations(formattedData);
                setTotalPages(1); // Solo una página, ya que no hay paginación en la respuesta
            } else {
                console.error("Estructura de datos inesperada: la respuesta no es un arreglo", data);
                throw new Error("Estructura de datos inesperada: la respuesta no es un arreglo");
            }
        } catch (error) {
            console.error("Error al obtener las series:", error);
        }
    };





    // Cargar las series de boletos cuando cambia la página
    useEffect(() => {
        fetchSerialStations();
    }, [currentPage]);

    // Manejar el cambio de página
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">

            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
                Registrar Series de Boletos
            </h2>


            {/* Formulario de registro */}
            <div className="col-span-8 xl:col-span-3">
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1 dark:text-white">Vendedor:</label>
                                    {loadingSellers ? (
                                        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
                                    ) : (
                                        <DataList
                                            id="seller"
                                            label=""
                                            options={selectSeller}
                                            placeholder="Seleccione un vendedor"
                                            onSelect={handleSelectSeller}
                                            value={selectedSeller || ''}
                                            opKey="dni"
                                            opValue="name"
                                            optionP="name"
                                        />
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 dark:text-white">Sede:</label>
                                    {loadingStations ? (
                                        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
                                    ) : (
                                        <DataList
                                            id="sede"
                                            label=""
                                            options={dataListBusStations}
                                            placeholder="Seleccione una sede"
                                            onSelect={handleSelectSede}
                                            value={selectedStation?.toString() || ''}
                                            opKey="id"
                                            opValue="name"
                                            optionP="name"
                                        />
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 dark:text-white">N° Serie:</label>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-3 dark:bg-boxdark dark:border-strokedark dark:text-white"
                                        placeholder="Ingrese el número de serie"
                                        value={serial_number}
                                        onChange={(e) => setSerie(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-4.5">
                                <button
                                    className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                    type="button"
                                    onClick={handleCancelBtn}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90 dark:bg-primary dark:hover:bg-opacity-90"
                                    type="submit"
                                    disabled={loading} // Deshabilitar el botón mientras se guarda
                                >
                                    {loading ? 'Guardando...' : 'Guardar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            {/* Tabla de series de boletos paginada */}
            <PaginationDataTable
                titles={['station_name', 'user_name', 'serial_number']} // Claves ajustadas a los datos aplanados
                displayHeader={['Sede', 'Vendedor', 'Número de Serie']} // Encabezados de columnas
                data={serialStations} // Datos formateados de series de boletos
                totalPages={totalPages} // Total de páginas para la paginación
                currentPage={currentPage} // Página actual
                onPageChange={handlePageChange} // Función para manejar el cambio de página
                loading={loading} // Indicador de carga
                dataHeaderToExpand={[]} // No hay datos adicionales para expandir en este ejemplo
            />

        </div>
    );
};

export default TicketSeriesRegistration;
