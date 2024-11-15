import { FaCity, FaPhoneAlt } from 'react-icons/fa';
import { MdLocationOn, MdAccessTime } from 'react-icons/md';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { createBusStationT } from '../../types';
import createBusStation from '../../hooks/busStationRegistration';
import { useState } from 'react';
import { useCity } from '../../hooks/useCity';


const initialStateBusStation: createBusStationT = {
  city_id: '',
  name: '',
  address: '',
  phone: '',
  open_time: '',
  close_time: '',
};


const BusStationRegistration: React.FC = () => {
 
  const { loading: loadingBusStation, station } = createBusStation();
  const [inputBusStation, setInputBusStation] = useState<createBusStationT>(initialStateBusStation);
  const { selectCity } = useCity();
  const [selectedCity, setSelectCity] = useState<string>("");


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // Actualiza el estado seleccionado del bus si es el select de buses
    if (name === 'city_id') {
      setSelectCity(value);
    }

    setInputBusStation({
      ...inputBusStation,
      [name]:
        // Convertimos a número para campos específicos
        name === 'year' || name === 'capacity' || name === 'city_id'
          ? Number(value)
          : value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await station(inputBusStation);

  };

  const handleCancel = () => {
    setInputBusStation(initialStateBusStation);
     setSelectCity('');
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Registro de Terminales" />

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Información del Terminal</h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">


<div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="city_id"
                      >
                        Ciudad
                      </label>
                      <select
                        className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name="city_id"
                        id="city_id"
                        value={selectedCity}
                        onChange={handleChange}
                      >
                        <option value="" disabled>
                          Seleccione la Ciudad
                        </option>
                        {!selectedCity && (
                          <option value="">Ciudades</option>
                        )}
                        {selectCity.map((city) => (
                          <option key={city.id} value={city.id}>
                            {city.name}
                          </option>
                        ))}
                        ;
                      </select>
                    </div>


                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="name"
                      >
                        Nombre del Terminal
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <FaCity />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Nombre del Terminal"
                          value={inputBusStation.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="address"
                    >
                      Dirección
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <MdLocationOn />
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Dirección"
                        value={inputBusStation.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="phone"
                    >
                      Teléfono
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <FaPhoneAlt />
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="+593 x xxx xxxx"
                        value={inputBusStation.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="open_time"
                      >
                        Hora de Apertura
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <MdAccessTime />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="time"
                          name="open_time"
                          id="open_time"
                          value={inputBusStation.open_time}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="close_time"
                      >
                        Hora de Cierre
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <MdAccessTime />
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="time"
                          name="close_time"
                          id="close_time"
                          value={inputBusStation.close_time}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={loadingBusStation}
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    >
                      {loadingBusStation ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        'Guardar'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-span-5 xl:col-span-2">
            {/* Sección de la imagen del terminal si es necesario */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BusStationRegistration;
