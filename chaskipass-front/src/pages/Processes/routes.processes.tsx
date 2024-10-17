import { TbBusStop } from "react-icons/tb";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useState } from "react";
import TableRoutesComponent from "./tableRoutesComponent.processes";


const RoutesRegistration = () => {

    const [isStopsEnabled, setIsStopsEnabled] = useState(false);
    const [stopOvers, setStopOvers] = useState([]); //tiene que ser del tipo de dato que se va a guardar id parada - nombre parada

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsStopsEnabled(e.target.checked); //actualizo el estado con el valor del checkbox
    };

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
                                <form action="#">
                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-[33.33%]">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="departure_station"
                                            >
                                                Estación de salida
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    <TbBusStop />
                                                </span>
                                                <input
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="departure_station"
                                                    id="departure_station"
                                                    placeholder="Estación A"
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-[33.33%]">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="arrival_station"
                                            >
                                                Estación de llegada
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    <TbBusStop />
                                                </span>
                                                <input
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="arrival_station"
                                                    id="arrival_station"
                                                    placeholder="Estación B"
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-[33.33%]">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            >
                                                Asignar Paradas
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    value="synthwave"
                                                    className="toggle theme-controller col-span-2 col-start-1 row-start-1 bg-blue-300 [--tglbg:theme(colors.blue.900)] checked:border-blue-800 checked:bg-blue-50 checked:[--tglbg:theme(colors.green.500)]"
                                                    onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>

                                    {isStopsEnabled && (
                                        <div className="mb-5.5 flex flex-col gap-5.5">
                                            {/* Contenedor para el input y el botón */}
                                            <div className="w-full">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="bus_company"
                                                >
                                                    Agregar Paradas
                                                </label>

                                                {/* Flex para alinear input y botón */}
                                                <div className="relative flex items-center gap-3">
                                                    {/* Input */}
                                                    <div className="relative w-full sm:w-[50%]">
                                                        <span className="absolute left-4.5 top-4">
                                                            <TbBusStop />
                                                        </span>
                                                        <input
                                                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                            list="roleOptions"
                                                            id="roleDataList"
                                                            placeholder="Busca o Selecciona la parada"
                                                        />
                                                        <datalist id="roleOptions">
                                                            <option value="Parada 1" />
                                                            <option value="Parada 2" />
                                                            <option value="Parada 3" />
                                                            <option value="Parada 4" />
                                                        </datalist>
                                                    </div>

                                                    {/* Botón */}
                                                    <button
                                                        className="rounded bg-green-700 py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                                        type="submit"
                                                    >
                                                        Agregar
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Colocar TableRoutesComponent debajo del input y botón */}
                                            <div className="mt-5">
                                                <TableRoutesComponent />
                                            </div>
                                        </div>
                                    )}



                                    <div className="flex justify-end gap-4.5">
                                        <button
                                            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                            type="submit"
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
