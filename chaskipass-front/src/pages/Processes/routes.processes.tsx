import { TbBusStop } from "react-icons/tb";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import React, { useState } from "react";
import TableRoutes from "../../components/Tables/TableRoutes";
import DataListBusStation from "../../components/DataList/datalistBusStation.component";
import useBusStations from "../../hooks/useBusStations";
import { BusStationT } from "../../types";
import toast from "react-hot-toast";
import useRoutes from "../../hooks/useRoutes";
import Switcher from "../../components/Switchers/switcher.components";

const RoutesRegistration = () => {

    const [isStopsEnabled, setIsStopsEnabled] = useState(false);
    const [stopOvers, setStopOvers] = useState<BusStationT[]>([]); //tiene que ser del tipo de dato que se va a guardar id parada - nombre parada
    const { dataListBusStations } = useBusStations(); //hook para obtener las paradas
    const [selectedDepartureStation, setSelectedDepartureStation] = useState(""); //estado para guardar la parada de salida
    const [selectedArrivalStation, setSelectedArrivalStation] = useState(""); //estado para guardar la parada de llegada
    const [selectedStopOver, setSelectedStopOver] = useState("");
    //Hook
    const {createRoute} = useRoutes();

    const handleChange = (checked:boolean) => {
        setIsStopsEnabled(checked); //actualizo el estado con el valor del checkbox
    };

    const handleSubmit =async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!selectedDepartureStation || !selectedArrivalStation) return toast.error("Debe seleccionar una estación de salida y una estación de llegada");
        const departure_station_id:number= parseInt(selectedDepartureStation);
        const arrival_station_id:number= parseInt(selectedArrivalStation);
        const stopOverList:number[] = stopOvers.map((station) => Number(station.id));
        const wasCreated = await createRoute({departure_station_id, arrival_station_id, stopOverList});
        if(wasCreated) cleanData();
    }

    const handleCancelBtn= (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        cleanData();
    };

    const cleanData= () => {
        setSelectedDepartureStation("");
        setSelectedArrivalStation("");
        setSelectedStopOver("");
        setStopOvers([]);
    };

    const handleAddStopOver = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const stopOver = stopOversOptions.find((station) => station.id === selectedStopOver);
        const stopOverExists = stopOvers.find((station) => station.id === stopOver?.id);
        if (stopOverExists) {
            toast.error("La parada ya ha sido agregada");
            setSelectedStopOver("");
        } else if (stopOver) {
            setStopOvers([...stopOvers, stopOver]);
            setSelectedStopOver("");
        }

    }

    //Filtros para que no aparezcan las paradas de salida y llegada en las opciones de paradas
    const departureOptions = dataListBusStations.filter((station) => station.id !== selectedArrivalStation);
    const arrivalOptions = dataListBusStations.filter((station) => station.id !== selectedDepartureStation);
    const stopOversOptions = dataListBusStations.filter((station) => station.id !== selectedDepartureStation && station.id !== selectedArrivalStation);

    return (
        <>
            <div className="mx-auto ">
                <Breadcrumb pageName="Registro de Rutas" />

                <div className="grid grid-cols-5 gap-8">
                    <div className="col-span-5 xl:col-span-5">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Información de la Ruta
                                </h3>
                            </div>
                            <div className="p-7">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-[33.33%]">
                                            <DataListBusStation
                                                id="departure_station"
                                                label="Estación de salida"
                                                options={departureOptions}
                                                placeholder="Estación A"
                                                onSelect={(value) => setSelectedDepartureStation(value)}
                                                value={selectedDepartureStation}
                                                iconP={TbBusStop} />
                                        </div>

                                        <div className="w-full sm:w-[33.33%]">
                                            <DataListBusStation
                                                id="arrival_station"
                                                label="Estación de llegada"
                                                options={arrivalOptions}
                                                placeholder="Estación B"
                                                onSelect={(value) => setSelectedArrivalStation(value)}
                                                value={selectedArrivalStation}
                                                iconP={TbBusStop}
                                            />
                                        </div>

                                        <div className="w-full sm:w-[33.33%]">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            >
                                                Asignar Paradas
                                            </label>
                                            <div className="relative">
                                                <Switcher
                                                    checked={isStopsEnabled}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {isStopsEnabled && (
                                        <div className="mb-5.5 flex flex-col gap-5.5">
                                            {/* Contenedor para el input y el botón */}
                                            <div className="w-full">
                                                {/* Flex para alinear input y botón */}
                                                <div className="relative flex items-center gap-3">
                                                    {/* Input */}
                                                    <DataListBusStation
                                                        id="stop_over"
                                                        label="Agregar Paradas"
                                                        options={stopOversOptions}
                                                        placeholder="Parada"
                                                        onSelect={(value) => setSelectedStopOver(value)}
                                                        value={selectedStopOver}
                                                        iconP={TbBusStop}
                                                        className="w-full sm:w-[50%]"
                                                    />
                                                    {/* Botón */}
                                                    <button
                                                        className="mt-8 rounded bg-green-700 py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                                        type="button"
                                                        onClick={handleAddStopOver}
                                                    >
                                                        Agregar
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Colocar TableRoutesComponent debajo del input y botón */}
                                            <div className="mt-5">
                                                <TableRoutes
                                                    headerTable={['id', 'name', 'city_bus_station.name']}
                                                    displayHeader={['id', 'Estacion de bus', 'Ciudad', 'Acciones']}
                                                    onClick={(id) => { setStopOvers(stopOvers.filter((station) => station.id !== id)) }}
                                                > 
                                                    {stopOvers}
                                                </TableRoutes>
                                            </div>
                                        </div>
                                    )}



                                    <div className="flex justify-end gap-4.5">
                                        <button
                                            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                            type="button"
                                            onClick={handleCancelBtn}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                            type="submit"
                                        >
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

export default RoutesRegistration;
