import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import userThree from '../../images/user/user-03.png';
import { FaBus } from 'react-icons/fa';
import { IoCalendarNumberSharp, IoLogoModelS } from 'react-icons/io5';
import { MdOutlineReduceCapacity } from 'react-icons/md';
import { CreateBusT } from '../../types';
import createBus from '../../hooks/busCreation';
import { useState } from 'react';
import { ObtainBusStructure } from '../../hooks/ObtainBusStructure'; // Importar el hook

const initialStateBus: CreateBusT = {
  id: 0,
  cooperative_id: "",
  bus_number: "",
  licence_plate: "",
  chassis_vin: "",
  bus_manufacture: "",
  model: "",
  year: 0,
  capacity: 0,
  picture: "",
  bus_structure_id: ""
};

const BusRegistration: React.FC = () => {
  const [inputBus, setInputBus] = useState<CreateBusT>(initialStateBus);
  const { loading: loadingBus, bus } = createBus();
  const { fetchBusStructures, loading: loadingStructures } = ObtainBusStructure(); // Usar el hook para obtener las estructuras de bus

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInputBus({
      ...inputBus,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    bus(inputBus);
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Registro de buses" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Información del bus</h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="bus_number">
                        Número de la unidad
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4"><FaBus /></span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="bus_number"
                          id="bus_number"
                          placeholder="001"
                          value={inputBus.bus_number}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="licence_plate">
                        Número de Placa
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4"><IoLogoModelS /></span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="licence_plate"
                          id="licence_plate"
                          placeholder="ABC-123"
                          value={inputBus.licence_plate}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="chassis_vin">
                        Número de chasis
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4"><FaBus /></span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="chassis_vin"
                          id="chassis_vin"
                          placeholder="1787459825..."
                          value={inputBus.chassis_vin}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="bus_manufacture">
                        Marca
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4"><IoLogoModelS /></span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="bus_manufacture"
                          id="bus_manufacture"
                          placeholder="Mercedes"
                          value={inputBus.bus_manufacture}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="model">
                        Modelo
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4"><IoLogoModelS /></span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="model"
                          id="model"
                          placeholder="eCitaro"
                          value={inputBus.model}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="year">
                        Año de fabricación
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4"><IoCalendarNumberSharp /></span>
                        <select
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary appearance-none"
                          name="year"
                          id="year"
                          value={inputBus.year}
                          onChange={handleChange}
                        >
                          <option value="" disabled>Selecciona un año</option>
                          {Array.from({ length: 50 }, (_, i) => {
                            const year = new Date().getFullYear() - i;
                            return <option key={year} value={year}>{year}</option>;
                          })}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="capacity">
                        Capacidad
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4"><MdOutlineReduceCapacity /></span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          name="capacity"
                          id="capacity"
                          placeholder="30"
                          value={inputBus.capacity}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="bus_structure_id">
                        Estructura del Bus
                      </label>
                      <select
                        className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name="bus_structure_id"
                        id="bus_structure_id"
                        value={inputBus.bus_structure_id}
                        onChange={handleChange}
                        disabled={loadingStructures}
                      >
                        <option value="">Seleccione una estructura</option>
                        {fetchBusStructures.map((structure: any) => (
                          <option key={structure.id} value={structure.id}>{structure.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="button"
                    >
                      Cancelar
                    </button>

                    <div className="mb-5">
                      <button
                        type="submit"
                        disabled={loadingBus}
                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                      >
                        {loadingBus ? <span className="loading loading-spinner"></span> : 'Guardar'}
                      </button>
                    </div>
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

export default BusRegistration;
