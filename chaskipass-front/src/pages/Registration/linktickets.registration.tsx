import React, { useState } from 'react';

const LinkTicketSeriesRegistration = () => {
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
       
        </div>
    );

};
export default LinkTicketSeriesRegistration;
