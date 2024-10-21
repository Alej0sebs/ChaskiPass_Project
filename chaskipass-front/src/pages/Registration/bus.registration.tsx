import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import userThree from '../../images/user/user-03.png';
import { FaBus, FaRegRegistered } from 'react-icons/fa';
import { TbLicense } from 'react-icons/tb';
import { IoCalendarNumberSharp } from 'react-icons/io5';
import { MdOutlineReduceCapacity } from 'react-icons/md';
import { IoLogoModelS } from 'react-icons/io';

const BusRegistration = () => {

  
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Registro de buses" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Información del bus
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="bus_number"
                      >
                        Número de la unidad
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FaBus />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="bus_number"
                          id="bus_number"
                          placeholder="001"
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="license_plate"
                      >
                        Número de placa
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <TbLicense />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="license_plate"
                          id="license_plate"
                          placeholder="TAR-001"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="chassis_vin"
                      >
                        Número de chasis
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FaBus />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="chassis_vin"
                          id="chassis_vin"
                          placeholder="1787459825..."
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="bus_manufacturer"
                      >
                        Marca
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FaRegRegistered />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="bus_manufacturer"
                          id="bus_manufacturer"
                          placeholder="Mercedez Benz"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="model"
                      >
                        Modelo
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <IoLogoModelS />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="model"
                          id="model"
                          placeholder="eCitaro"
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="year"
                      >
                        Año de fabricación
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <IoCalendarNumberSharp />
                        </span>
                        <select
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary appearance-none"
                          name="year"
                          id="year"
                        >
                          <option value="" disabled selected>
                            Selecciona un año
                          </option>
                          {Array.from({ length: 50 }, (_, i) => {
                            const year = new Date().getFullYear() - i;
                            return (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="capacity"
                      >
                        Capacidad
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <MdOutlineReduceCapacity />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="capacity"
                          id="capacity"
                          placeholder="36"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb- flex flex-col gap-5.5 sm:flex-row"></div>

                  <div className="mt-6 flex justify-between">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="button" // Cambiar a "button" para evitar el envío inmediato
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

          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-30 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Cargar imágenes
                </h3>
              </div>
              <div className="p-7">
                <div className="flex flex-col gap-5.5">
                  <input type="file" accept="image/*" multiple />
                  <div className="flex flex-col">
                    <span className="text-black dark:text-white">
                      Imágenes seleccionadas:
                    </span>
                    <ul className="mt-2">
                      <li className="mt-1">Imagen 1.jpg</li>
                      <li className="mt-1">Imagen 2.jpg</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-stroke bg-white shadow-default mt-6 dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Resumen
                </h3>
              </div>
              <div className="p-7">
                <div className="flex items-center gap-3">
                  <img
                    src={userThree}
                    alt="user"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-black dark:text-white">Juan Pérez</h4>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      administrador
                    </span>
                  </div>
                </div>
                <div className="mt-5">
                  <h5 className="text-black dark:text-white">
                    Información del bus
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusRegistration;
