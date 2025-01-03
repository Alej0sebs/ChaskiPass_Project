import useTypeSeats from '../../hooks/useTypeSeats';
import TableRoutes from '../../components/Tables/TableRoutes';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableAux from '../../components/Tables/TableAux';

const TypeSeats = () => {

    const { selectSeatTypes, createSeatType } = useTypeSeats();

    return (
        <>
            <div className="mx-auto ">
                <Breadcrumb pageName="Registro de Asientos" />

                <div className="grid grid-cols-5 gap-8">
                    <div className="col-span-5 xl:col-span-5">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Información del tipo de asiento
                                </h3>
                            </div>
                            <div className="p-7">
                                <form >

                                    <div className="mt-4 mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-[20%]">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Nombre del Asiento
                                                <input
                                                    type="text"
                                                    name="seat_name"
                                                    id="seat_name"
                                                    // value={selectedDataTimeAndPrice.departure_time}
                                                    // onChange={handleTimeDateChange}
                                                    className="input input-bordered w-full mt-1 bg-white text-black border-gray-300 placeholder-gray-500 dark:bg-boxdark dark:text-white dark:border-strokedark dark:placeholder-gray-400"
                                                />
                                            </label>
                                        </div>
                                        <div className="w-full sm:w-[50%]">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Descripción
                                                <input
                                                    type="text"
                                                    name="seat_description"
                                                    id="seat_description"
                                                    // value={selectedDataTimeAndPrice.departure_time}
                                                    // onChange={handleTimeDateChange}
                                                    className="input input-bordered w-full mt-1 bg-white text-black border-gray-300 placeholder-gray-500 dark:bg-boxdark dark:text-white dark:border-strokedark dark:placeholder-gray-400"
                                                />
                                            </label>
                                        </div>
                                        <div className="w-full sm:w-[10%]">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Caracter Especial
                                                <input
                                                    type="text"
                                                    name="seat_character"
                                                    id="seat_character"
                                                    // value={selectedDataTimeAndPrice.departure_time}
                                                    // onChange={handleTimeDateChange}
                                                    className="input input-bordered w-full mt-1 bg-white text-black border-gray-300 placeholder-gray-500 dark:bg-boxdark dark:text-white dark:border-strokedark dark:placeholder-gray-400"
                                                />
                                            </label>
                                        </div>
                                        <div className="w-full sm:w-[10%]">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Costo Adicional
                                                <input
                                                    type="text"
                                                    name="seat_cost"
                                                    id="seat_cost"
                                                    // value={selectedDataTimeAndPrice.departure_time}
                                                    // onChange={handleTimeDateChange}
                                                    className="input input-bordered w-full mt-1 bg-white text-black border-gray-300 placeholder-gray-500 dark:bg-boxdark dark:text-white dark:border-strokedark dark:placeholder-gray-400"
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-4.5">
                                        <button
                                            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                            type="button"
                                        // onClick={handleCancelBtn}
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

                {/* Tabla de rutas */}
                <div className="mt-4 col-span-8 xl:col-span-5 ">
                    <TableAux
                        headerTable={['id', 'name', 'special_caracter', 'description', 'additional_cost']}
                        displayHeader={['id', 'Tipo de asiento', 'Caracter', 'Descripción', 'Costo adicional']}
                    >
                        {selectSeatTypes}
                    </TableAux>
                </div>

            </div>
        </>
    );
};

export default TypeSeats;
