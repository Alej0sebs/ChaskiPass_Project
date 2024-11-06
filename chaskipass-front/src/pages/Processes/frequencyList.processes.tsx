import { IoTrashOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { IoTicketSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import useFrequency from "../../hooks/useFrequency";
import { FrequencyListT } from "../../types";

const FrequencyList = () => {
    const [listRoutes, setListRoutes] = useState<FrequencyListT>([]);
    const { getFrequencies } = useFrequency();

    useEffect(() => {
        const fetchBuses = async () => {
            const frequenciesList = await getFrequencies();
            if (frequenciesList && (frequenciesList.frequency_id != null || frequenciesList.frequency_id != "")) setListRoutes(frequenciesList);
        };
        fetchBuses();
    }, []);

    const toggleStatus = (id: string) => {
        setListRoutes((prev: FrequencyListT) =>
            prev.map((freq) =>
                freq.frequency_id === id
                    ? { ...freq, status: freq.status === 0 ? 1 : 0 }
                    : freq)
        );
    };

    return (
        <div className="mx-auto">
            <Breadcrumb pageName="Lista de frecuencias disponibles" />
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Ruta
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Estaciones
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Autobus
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Fecha
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Horario
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                    Estado
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listRoutes.map((freq) => (
                                <tr key={freq.frequency_id}>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {freq.departure_city_name} - {freq.arrival_city_name}
                                        </h5>
                                        <p className="text-sm">
                                            {freq.stop_city_names !== null ? freq.stop_city_names : ""}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {freq.departure_station_name} - {freq.arrival_station_name}
                                        </h5>
                                        <p className="text-sm">
                                            {freq.stop_station_names !== null ? freq.stop_station_names : ""}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {freq.license_plate}
                                        </h5>
                                        <p className="text-sm">
                                            {freq.bus_number}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">{freq.date}</p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {freq.departure_time} - {freq.arrival_time}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                value="synthwave"
                                                checked={freq.status === 1}
                                                className="toggle theme-controller col-span-2 col-start-1 row-start-1 bg-blue-300 [--tglbg:theme(colors.blue.900)] checked:border-blue-800 checked:bg-blue-50 checked:[--tglbg:theme(colors.green.500)]"
                                                onChange={() => toggleStatus(freq.frequency_id)} />
                                        </label>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <button className="hover:text-primary"><IoTicketSharp /></button>
                                            <button className="hover:text-primary"><CiEdit /></button>
                                            <button className="hover:text-primary"><IoTrashOutline /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FrequencyList;
