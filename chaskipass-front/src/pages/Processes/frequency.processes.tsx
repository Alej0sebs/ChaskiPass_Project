import { TbBusStop } from "react-icons/tb";
import { MdOutlinePriceChange } from "react-icons/md";
import { FaRoute } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import PaginationDataTable from "../../components/Tables/PaginationDataTable";
import Switcher from "../../components/Switchers/switcher.components";
import { useEffect, useState } from "react";
import useRoutes from "../../hooks/useRoutes";
import useBusCreation from "../../hooks/useBusCreation";
import DataList from "../../components/DataList/datalist.components";
import useUsers from "../../hooks/useUsers";
import { FrequencyT, timeDateT } from "../../types";
import toast from "react-hot-toast";
import useFrequency from "../../hooks/useFrequency";

// DATOS DE PRUEBA RENDERIZADO
const titles = ['id', 'departure_station_name',
    'departure_city_name', 'arrival_station_name',
    'arrival_city_name'];
const expandTitles = ['stop_station_names', 'stop_city_names'];
const displayHeader = ['Identificador', 'Estación de salida', 'Ciudad de salida',
    'Estación de llegada', 'Ciudad de llegada'];

//Estado inicial Datos
const initialStateTimeDate: timeDateT = {
    date: '',
    departure_time: '',
    arrival_time: ''
}

// DATOS DE PRUEBA RENDERIZADO
const FrequencyRegistration = () => {
    const [frequencyStatus, setFrequencyStatus] = useState(false);
    //PaginationDataTable data
    const { loading, listRoutes } = useRoutes();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const rowsPerPage = 6;
    //state of inputs
    const [selectedBus, setSelectedBus] = useState('');
    const [selectedDriver, setSelectedDriver] = useState('');
    const [routeID, setRouteID] = useState('');
    const [price, setPrice] = useState(0);
    const today = new Date().toISOString().split('T')[0]; //get today's date in the format YYYY-MM-DD
    const [selectedDateTime, setSelectedDateTime] = useState<timeDateT>(initialStateTimeDate);

    //hook
    const { getBuses } = useBusCreation();
    const { getDrivers } = useUsers();
    const { createFrequency } = useFrequency();
    //render data
    const [buses, setBuses] = useState([]);
    const [drivers, setDrivers] = useState([]);


    useEffect(() => {
        const fetchBuses = async () => {
            const busData = await getBuses();
            if (busData) setBuses(busData);
            const driverData = await getDrivers();
            if (driverData) setDrivers(driverData.json);
        };

        fetchBuses();
    }, []);

    useEffect(() => {
        // Actualizar totalPages basado en el tamaño de listRoutes
        setTotalPages(Math.ceil(listRoutes.length / rowsPerPage));
    }, [listRoutes]);


    //Para el switcher
    const handleChange = (checked: boolean) => {
        setFrequencyStatus(checked); //actualizo el estado con el valor del checkbox
    };

    const handleTimeDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDateTime({
            ...selectedDateTime,
            [e.target.id]: e.target.value
        });
    };
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const frequencyData: FrequencyT = {
            bus_id: selectedBus,
            route_id: routeID,
            departure_time: selectedDateTime.departure_time,
            date: selectedDateTime.date,
            arrival_time: selectedDateTime.arrival_time,
            driver_id: selectedDriver,
            price: price,
            status: frequencyStatus
        };
        if (!selectedBus || !routeID || !selectedDateTime.departure_time || !selectedDateTime.date || !selectedDateTime.arrival_time || !selectedDriver || price <= 0) {
            toast.error("Por favor, complete todos los campos.");
            return;
        };
        createFrequency(frequencyData);
        cleanData();
        return;
    };


    const handleCancelBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        cleanData();
    };

    const cleanData = () => {
        setSelectedDateTime(initialStateTimeDate);
        setSelectedDriver('');
        setSelectedBus('');
        setRouteID('');
        setFrequencyStatus(false);
        setPrice(0);
    };

    return (
        <>
            <div className="mx-auto">
                <Breadcrumb pageName="Registro de Frecuencias" />
                <div className="grid grid-cols-8 gap-8">
                    <div className="col-span-8 xl:col-span-5 ">
                        <PaginationDataTable
                            displayHeader={displayHeader}
                            titles={titles}
                            data={listRoutes}
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                            loading={loading}
                            onRowClick={(row) => setRouteID(row.id)}
                            dataHeaderToExpand={expandTitles}
                        />
                    </div>
                    <div className="col-span-8 xl:col-span-3">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Datos de registro
                                </h3>
                            </div>
                            <div className="p-7">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-[50%]">
                                            <DataList
                                                id={'license_plate'}
                                                label="Placa autobús"
                                                placeholder="TAR-2107"
                                                options={buses}
                                                opKey={'id'}
                                                opValue={'license_plate'}
                                                optionP={'bus_number'}
                                                onSelect={setSelectedBus}
                                                value={selectedBus}
                                                iconP={TbBusStop}
                                            />
                                        </div>

                                        <div className="w-full sm:w-[50%]">
                                            <DataList
                                                id={'driver_id'}
                                                label="Conductor"
                                                placeholder="18021XXXXX"
                                                options={drivers}
                                                opKey={'dni'}
                                                opValue={'name'}
                                                optionP={'dni'}
                                                onSelect={setSelectedDriver}
                                                value={selectedDriver}
                                                iconP={CiUser}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-[50%]">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="price"
                                            >
                                                Precio
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    <MdOutlinePriceChange />
                                                </span>
                                                <input
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="price"
                                                    id="price"
                                                    placeholder="7"
                                                    value={price}
                                                    onChange={(e) => setPrice(Number(e.target.value))}
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-[50%]">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="bus_company"
                                            >
                                                Estado
                                            </label>
                                            <div className="relative">
                                                <Switcher
                                                    onChange={handleChange}
                                                    checked={frequencyStatus}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-[75%]">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="route_id"
                                            >
                                                Ruta
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    <FaRoute />
                                                </span>
                                                <input
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="route_id"
                                                    id="route_id"
                                                    placeholder="Jer2-1622-4"
                                                    value={routeID}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5.5 flex flex-col gap-2.5 sm:flex-row">
                                        <div className="w-full sm:w-[33%]">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="date"
                                            >
                                                Fecha
                                            </label>
                                            <div className="relative">
                                                <input
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    type="date"
                                                    name="date"
                                                    id="date"
                                                    onChange={handleTimeDateChange}
                                                    value={selectedDateTime.date}
                                                    min={today}
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-[32%]">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="departure_time"
                                            >
                                                Hora de salida
                                            </label>
                                            <div className="relative">
                                                <input
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    type="time"
                                                    name="departure_time"
                                                    id="departure_time"
                                                    onChange={handleTimeDateChange}
                                                    value={selectedDateTime.departure_time}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full sm:w-[32%]">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="arrival_time">
                                                Hora de llegada
                                            </label>
                                            <div className="relative">
                                                <input
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    type="time"
                                                    name="arrival_time"
                                                    id="arrival_time"
                                                    onChange={handleTimeDateChange}
                                                    value={selectedDateTime.arrival_time}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-4.5">
                                        <button
                                            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                            type="button"
                                            onClick={handleCancelBtn}>
                                            Cancelar
                                        </button>
                                        <button
                                            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                            type="submit">
                                            Guardar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FrequencyRegistration;
