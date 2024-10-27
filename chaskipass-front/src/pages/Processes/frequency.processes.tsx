import { FaBus } from "react-icons/fa";
import { TbBusStop } from "react-icons/tb";
import { MdOutlinePriceChange } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { FaRoute } from "react-icons/fa";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import PaginationDataTable from "../../components/Tables/PaginationDataTable";


// DATOS DE PRUEBA RENDERIZADO
const titles = [
    'Language',
    'Paradigm',
    'First Appeared',
    'File Extension',
    'Typing Discipline',
    'Developer',
    'License',
    'Latest Version',
    'Stable Release Date',
    'Popular Framework'
];

const data = [
    { Language: 'JavaScript', Paradigm: 'Multi-paradigm', 'First Appeared': 1995, 'File Extension': '.js', 'Typing Discipline': 'Dynamic', Developer: 'Brendan Eich', License: 'MIT', 'Latest Version': 'ES2023', 'Stable Release Date': '2023-06-01', 'Popular Framework': 'React' },
    { Language: 'Python', Paradigm: 'Multi-paradigm', 'First Appeared': 1991, 'File Extension': '.py', 'Typing Discipline': 'Dynamic', Developer: 'Guido van Rossum', License: 'PSF', 'Latest Version': '3.10', 'Stable Release Date': '2021-10-04', 'Popular Framework': 'Django' },
    { Language: 'Java', Paradigm: 'Object-oriented', 'First Appeared': 1995, 'File Extension': '.java', 'Typing Discipline': 'Static', Developer: 'James Gosling', License: 'GPL', 'Latest Version': '17', 'Stable Release Date': '2021-09-14', 'Popular Framework': 'Spring' },
    { Language: 'C++', Paradigm: 'Multi-paradigm', 'First Appeared': 1985, 'File Extension': '.cpp', 'Typing Discipline': 'Static', Developer: 'Bjarne Stroustrup', License: 'ISO', 'Latest Version': 'C++20', 'Stable Release Date': '2020-12-15', 'Popular Framework': 'Qt' },
    { Language: 'C#', Paradigm: 'Multi-paradigm', 'First Appeared': 2000, 'File Extension': '.cs', 'Typing Discipline': 'Static', Developer: 'Microsoft', License: 'MIT', 'Latest Version': '9.0', 'Stable Release Date': '2021-08-11', 'Popular Framework': '.NET' },
    { Language: 'Ruby', Paradigm: 'Multi-paradigm', 'First Appeared': 1995, 'File Extension': '.rb', 'Typing Discipline': 'Dynamic', Developer: 'Yukihiro Matsumoto', License: 'MIT', 'Latest Version': '3.0', 'Stable Release Date': '2020-12-25', 'Popular Framework': 'Rails' },
    { Language: 'Swift', Paradigm: 'Multi-paradigm', 'First Appeared': 2014, 'File Extension': '.swift', 'Typing Discipline': 'Static', Developer: 'Apple Inc.', License: 'Apache 2.0', 'Latest Version': '5.5', 'Stable Release Date': '2021-09-20', 'Popular Framework': 'SwiftUI' },
    { Language: 'Kotlin', Paradigm: 'Multi-paradigm', 'First Appeared': 2011, 'File Extension': '.kt', 'Typing Discipline': 'Static', Developer: 'JetBrains', License: 'Apache 2.0', 'Latest Version': '1.5.31', 'Stable Release Date': '2021-08-10', 'Popular Framework': 'Ktor' },
    { Language: 'Go', Paradigm: 'Procedural', 'First Appeared': 2009, 'File Extension': '.go', 'Typing Discipline': 'Static', Developer: 'Google', License: 'BSD', 'Latest Version': '1.18', 'Stable Release Date': '2022-02-15', 'Popular Framework': 'Gin' },
    { Language: 'Rust', Paradigm: 'Multi-paradigm', 'First Appeared': 2010, 'File Extension': '.rs', 'Typing Discipline': 'Static', Developer: 'Mozilla', License: 'MIT/Apache 2.0', 'Latest Version': '1.57', 'Stable Release Date': '2022-03-03', 'Popular Framework': 'Rocket' },
    { Language: 'PHP', Paradigm: 'Multi-paradigm', 'First Appeared': 1995, 'File Extension': '.php', 'Typing Discipline': 'Dynamic', Developer: 'Rasmus Lerdorf', License: 'PHP License', 'Latest Version': '8.1', 'Stable Release Date': '2021-11-25', 'Popular Framework': 'Laravel' },
    { Language: 'TypeScript', Paradigm: 'Multi-paradigm', 'First Appeared': 2012, 'File Extension': '.ts', 'Typing Discipline': 'Static', Developer: 'Microsoft', License: 'Apache 2.0', 'Latest Version': '4.5', 'Stable Release Date': '2021-11-17', 'Popular Framework': 'Angular' },
];
// DATOS DE PRUEBA RENDERIZADO

const FrequencyRegistration = () => {
    return (
        <>
            <div className="mx-auto ">
                <Breadcrumb pageName="Registro de Frecuencias" />
                <div className="grid grid-cols-8 gap-8">
                    <div className="col-span-8 xl:col-span-5">
                        <PaginationDataTable titles={titles} rowsPerPage={5}>
                            {data}
                        </PaginationDataTable>
                    </div>
                    <div className="col-span-8 xl:col-span-3">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Datos de registro
                                </h3>
                            </div>
                            <div className="p-7">
                                <form action="#">
                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-[50%]">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="license_plate"
                                            >
                                                Placa autobús
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    <TbBusStop />
                                                </span>
                                                <input
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="license_plate"
                                                    id="license_plate"
                                                    placeholder="TAR-2107"
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-[50%]">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="driver_id"
                                            >
                                                Conductor
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    <TbBusStop />
                                                </span>
                                                <input
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="driver_id"
                                                    id="driver_id"
                                                    placeholder="18021XXXXX"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-[50%]">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="price"
                                            >
                                                Precio
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    <MdOutlinePriceChange />
                                                </span>
                                                <input
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="price"
                                                    id="price"
                                                    placeholder="25"
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-[50%]">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="bus_company"
                                            >
                                                Estado
                                            </label>
                                            <div className="relative">
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-[50%]">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="bus_company"
                                            >
                                                Ruta
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    <FaRoute />
                                                </span>
                                                <input
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="bus_company"
                                                    id="bus_company"
                                                    placeholder="Cooperativa X"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                        <div className="w-full sm:w-[33.33%]">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="bus_company"
                                            >
                                                Fecha
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    <CiCalendarDate />
                                                </span>
                                                <input
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="bus_company"
                                                    id="bus_company"
                                                    placeholder="Cooperativa X"
                                                />
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-[33.33%]">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="bus_company"
                                            >
                                                Hora de salida
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    <IoMdTime />
                                                </span>
                                                <input
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="bus_company"
                                                    id="bus_company"
                                                    placeholder="Bus"
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full sm:w-[33.33%]">
                                            <label
                                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                htmlFor="bus_company"
                                            >
                                                Hora de llegada
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4.5 top-4">
                                                    <IoMdTime />
                                                </span>
                                                <input
                                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                                    type="text"
                                                    name="bus_company"
                                                    id="bus_company"
                                                    placeholder="Bus"
                                                />
                                            </div>
                                        </div>
                                    </div>

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

export default FrequencyRegistration;
