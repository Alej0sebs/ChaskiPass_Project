import { useState, useEffect } from 'react';
import useBusStations from '../../hooks/useBusStations';
import useLinkCooperativeStation from '../../hooks/useLinkCooperativeStation';
import toast from 'react-hot-toast';
import PaginationDataTable from '../../components/Tables/PaginationDataTable';

const LinkStations = () => {
  const [selectedStations, setSelectedStations] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0); // Página actual para estaciones vinculadas
  const [totalPages, setTotalPages] = useState(1); // Número total de páginas para estaciones vinculadas
  const { allBusStations, loading: stationsLoading } = useBusStations();
  const {
    linkStation,
    getLinkedStations,
    loading: saving,
    linkedStations,
  } = useLinkCooperativeStation();

  // Obtener estaciones vinculadas al cargar el componente
  useEffect(() => {
    const fetchLinkedStations = async () => {
      try {
        const result = await getLinkedStations();
        if (result && result.length) {
          setTotalPages(Math.ceil(result.length / 5)); // Actualizar total de páginas
        }
      } catch (error) {
        toast.error('Error al obtener las estaciones vinculadas.');
      }
    };

    // Llamar a la función solo si no se ha hecho antes
    if (linkedStations.length === 0) {
      fetchLinkedStations();
    }
  }, [linkedStations, getLinkedStations]); // Dependencia en `linkedStations` para evitar bucles infinitos

  const handleStationSelection = (station: any) => {
    setSelectedStations(
      (prev) =>
        prev.includes(station)
          ? prev.filter((s) => s.id !== station.id) // Desmarcar si ya está seleccionada
          : [...prev, station], // Añadir si no está seleccionada
    );
  };

  const handleSave = async () => {
    try {
      if (selectedStations.length === 0) {
        toast.error('Por favor, selecciona al menos una estación.');
        return;
      }

      // Enlazar todas las estaciones seleccionadas
      for (const station of selectedStations) {
        const result = await linkStation(station.id);
        if (result && result.status === 'success') {
          // Si es necesario, mostrar un toast de éxito por estación
        } else {
          // Si es necesario, mostrar un toast de error por estación
        }
      }

      // Actualizar la lista de estaciones vinculadas si todas fueron exitosas
      setSelectedStations([]); // Limpiar selección
      const result = await getLinkedStations(); // Obtener nuevamente las estaciones vinculadas
      if (result && result.length) {
        setTotalPages(Math.ceil(result.length / 5)); // Actualizar total de páginas
      }
    } catch (error) {
      toast.error('Error al guardar las estaciones.');
    }
  };

  const handleCancel = () => {
    setSelectedStations([]); // Restablecer selección
  };

  // Lógica para manejar el cambio de página para las estaciones vinculadas
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Datos de la página actual para la paginación de estaciones vinculadas
  const paginatedLinkedStations = linkedStations.slice(
    currentPage * 5,
    (currentPage + 1) * 5,
  ); // 5 elementos por página

  return (
    <div className="mx-auto max-w-270">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="col-span-1 xl:col-span-2">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Enlazar rutas
              </h3>
            </div>

            <div className="p-7">
              <h4 className="font-medium text-black dark:text-white mb-4">
                Link Stations
              </h4>

              <div className="mb-5.5">
  {stationsLoading ? (
    <p className="text-gray-500">Cargando estaciones...</p>
  ) : (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allBusStations.map((station, index) => (
          <label
            key={index}
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedStations.some((s) => s.id === station.id)}
              onChange={() => handleStationSelection(station)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-gray-800">{station.name}</span>
          </label>
        ))}
      </div>
    </div>
  )}
</div>


              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                >
                  {saving ? 'Guardando...' : 'Guardar'}
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full cursor-pointer rounded-lg border border-gray-400 bg-gray-300 p-4 text-black transition hover:bg-opacity-90 dark:bg-gray-700 dark:text-white"
                >
                  Cancelar
                </button>
              </div>

              {/* Aquí se muestra la lista de estaciones vinculadas con paginación */}
              <div className="mt-6">
                <h4 className="font-medium text-black dark:text-white mb-4">
                  Estaciones vinculadas
                </h4>
                <PaginationDataTable
                  titles={['name']} // Puedes agregar más títulos según sea necesario
                  displayHeader={['Estación']}
                  data={paginatedLinkedStations} // Pasa los datos paginados de estaciones vinculadas
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  loading={saving}
                  onRowClick={() => {}} // Aquí no es necesario seleccionar, ya que no estamos usando checkboxes para esta tabla
                  dataHeaderToExpand={[]} // Si tienes datos para expandir
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkStations;
