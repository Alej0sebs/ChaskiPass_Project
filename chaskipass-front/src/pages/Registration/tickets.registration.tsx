import React, { useState } from 'react';

const TicketSeriesRegistration = () => {
    const [ticketSeries, setTicketSeries] = useState([
        { sede: 'Chancay', vendedor: 'Jan Nishiyama Camus', serie: '002', estado: true },
        { sede: 'Huacho', vendedor: 'Rafael Gonzales Ganoza', serie: '001', estado: true },
        { sede: 'Huacho', vendedor: 'Luis Develop', serie: '100', estado: true },
        { sede: 'Lima', vendedor: 'ABEL ENRIQUE ALEJANDRIA SALVADOR', serie: '010', estado: true },
    ]);

    return (
        <div className="mx-auto max-w-4xl p-6">
            <h2 className="text-xl font-semibold mb-4">Registrar Series de Boletos</h2>

            {/* Formulario de registro */}
            <div className="bg-white rounded shadow-md p-4 mb-6">
                <form>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Vendedor:</label>
                            <select className="w-full border rounded px-3 py-2">
                                <option>Seleccione</option>
                                {/* Opciones de vendedores */}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Sede:</label>
                            <select className="w-full border rounded px-3 py-2">
                                <option>Seleccione</option>
                                {/* Opciones de sedes */}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">N° Serie:</label>
                            <input type="text" className="w-full border rounded px-3 py-2" placeholder="Ingrese el número de serie" />
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
                </form>
            </div>

            {/* Tabla de series por sucursal */}
            <div className="bg-white rounded shadow-md">
                <table className="w-full text-left table-auto">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2">Sede</th>
                            <th className="px-4 py-2">Vendedor</th>
                            <th className="px-4 py-2">N° de Serie</th>
                            <th className="px-4 py-2">Estado</th>
                            <th className="px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ticketSeries.map((Series, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-4 py-2">{Series.sede}</td>
                                <td className="px-4 py-2">{Series.vendedor}</td>
                                <td className="px-4 py-2">{Series.serie}</td>
                                <td className="px-4 py-2">
                                    <input type="checkbox" checked={Series.estado} readOnly />
                                </td>
                                <td className="px-4 py-2">
                                    <button className="text-blue-600 hover:underline">Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="text-sm text-gray-500 mt-2 p-4">
                    Mostrando {ticketSeries.length} de un total de {ticketSeries.length} registros
                </p>
            </div>
        </div>
    );
};

export default TicketSeriesRegistration;


