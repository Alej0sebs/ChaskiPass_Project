import useTypeSeats from '../../hooks/useTypeSeats';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableAux from '../../components/Tables/TableAux';
import { SeatType } from '../../types';
import { useState } from 'react';

const initialStateTypeSeats:SeatType = {
    id: '',
    name: '',
    description: '',
    special_caracter: '',
    additional_cost: 0
}

const TypeSeats = () => {

    const { selectSeatTypes, createSeatType, reloadSeatTypes} = useTypeSeats();
    const [formTypeSeats , setFormTypeSeats] = useState<SeatType>(initialStateTypeSeats);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormTypeSeats({
            ...formTypeSeats,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createSeatType(formTypeSeats);
        setFormTypeSeats(initialStateTypeSeats);
        reloadSeatTypes();
    };

    const handleCancelBtn = () => {
        setFormTypeSeats(initialStateTypeSeats);
    };
    
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
                                <form onSubmit={handleSubmit}>

                                    <div className="mt-4 mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-[20%]">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Nombre del Asiento
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    placeholder='VIP'
                                                    value={formTypeSeats.name}
                                                    onChange={handleChange}
                                                    className="input input-bordered w-full mt-1 bg-white text-black border-gray-300 placeholder-gray-500 dark:bg-boxdark dark:text-white dark:border-strokedark dark:placeholder-gray-400"
                                                />
                                            </label>
                                        </div>
                                        <div className="w-full sm:w-[50%]">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Descripción
                                                <input
                                                    type="text"
                                                    name="description"
                                                    id="description"
                                                    placeholder='Asiento VIP'
                                                    value={formTypeSeats.description}
                                                    onChange={handleChange}
                                                    className="input input-bordered w-full mt-1 bg-white text-black border-gray-300 placeholder-gray-500 dark:bg-boxdark dark:text-white dark:border-strokedark dark:placeholder-gray-400"
                                                />
                                            </label>
                                        </div>
                                        <div className="w-full sm:w-[10%]">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Caracter Especial
                                                <input
                                                    type="text"
                                                    name="special_caracter"
                                                    id="special_caracter"
                                                    placeholder='V'
                                                    value={formTypeSeats.special_caracter}
                                                    onChange={handleChange}
                                                    className="input input-bordered w-full mt-1 bg-white text-black border-gray-300 placeholder-gray-500 dark:bg-boxdark dark:text-white dark:border-strokedark dark:placeholder-gray-400"
                                                />
                                            </label>
                                        </div>
                                        <div className="w-full sm:w-[10%]">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Costo Adicional
                                                <input
                                                    type="number"
                                                    name="additional_cost"
                                                    id="additional_cost"
                                                    placeholder='5.50'
                                                    value={formTypeSeats.additional_cost}
                                                    onChange={handleChange}
                                                    step="0.01"
                                                    className="input input-bordered w-full mt-1 bg-white text-black border-gray-300 placeholder-gray-500 dark:bg-boxdark dark:text-white dark:border-strokedark dark:placeholder-gray-400"
                                                />
                                            </label>
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
