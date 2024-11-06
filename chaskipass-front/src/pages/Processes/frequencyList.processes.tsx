import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import PaginationDataTable from "../../components/Tables/PaginationDataTable";

// DATOS DE PRUEBA RENDERIZADO
const titles = ['id', 'departure_station_name',
    'departure_city_name', 'arrival_station_name',
    'arrival_city_name'];
const expandTitles = ['stop_station_names', 'stop_city_names'];
const displayHeader = ['Identificador', 'Estación de salida', 'Ciudad de salida',
    'Estación de llegada', 'Ciudad de llegada'];

// DATOS DE PRUEBA RENDERIZADO
const FrequencyList = () => {

    return (
        <>
            <div className="mx-auto">
                <Breadcrumb pageName="Registro de Frecuencias" />
                <div className="grid grid-cols-8 gap-8">
                    <div className="col-span-8 xl:col-span-5 ">
                        {/*<PaginationDataTable
                            displayHeader={displayHeader}
                            titles={titles}
                            data={listRoutes}
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                            loading={loading}
                            onRowClick={(row) => setRouteID(row.id)}
                            dataHeaderToExpand={expandTitles}
                        />*/}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FrequencyList;
