import React, { useState } from 'react';
//my imports
import ChaskiLogoW from '../../images/chaski-logo/chaskilogowhite.svg';
import ChaskiLogoB from '../../images/chaski-logo/chaskilogoblack.svg';
import { FaRegUser } from 'react-icons/fa';
import { FaIdCard, FaUserTie } from 'react-icons/fa'; // Nuevos íconos para los campos adicionales
import { CreateUserT } from '../../types';
import createUser from '../../hooks/userCreation';

const initialStateSignUp: CreateUserT = {
  dni: '',
  name: '',
  last_name: '',
  user_name: '',
  email: '',
  phone: '',
  address: '',
  role_id: '',
  cooperative_id: '',
};

const SignUp: React.FC = () => {
  const [inputSignUp, setInputSignUp] =
    useState<CreateUserT>(initialStateSignUp);
  const { loading, login } = createUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSignUp({
      ...inputSignUp,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(inputSignUp);
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center dark:bg-boxdark">
        <div className="rounded-lg shadow-lg p-6 dark:border-strokedark dark:bg-boxdark w-[90%] my-auto">
          <div className="flex flex-wrap items-center">
            <div className="hidden w-full xl:block xl:w-1/2">
              <div className="py-10 px-12 text-center">
                <img className="dark:hidden" src={ChaskiLogoB} alt="Logo" />
                <img
                  className="hidden dark:block"
                  src={ChaskiLogoW}
                  alt="Logo"
                />
              </div>
            </div>

            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                <span className="mb-1.5 block font-medium">Registro</span>
                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  ChaskiPass - Registro de Usuarios
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Cédula de Identidad
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Ingrese su CI"
                        id="dni"
                        value={inputSignUp.dni}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <span className="absolute right-4 top-4">
                        <FaIdCard className="w-[22px] h-[22px]" />
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Nombre
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Ingrese su nombre"
                        id="name"
                        value={inputSignUp.name}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <span className="absolute right-4 top-4">
                        <FaRegUser className="w-[22px] h-[22px]" />
                      </span>
                    </div>
                  </div>

                  {/* Campo de Apellido */}
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Apellido
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Ingrese su apellido"
                        id="last_name"
                        value={inputSignUp.last_name}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                      <span className="absolute right-4 top-4">
                        <FaUserTie className="w-[22px] h-[22px]" />
                      </span>
                    </div>
                  </div>

                  {/* Username */}
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Nombre de usuario
                    </label>
                    <input
                      type="text"
                      placeholder="Ingresa tu nombre de usuario"
                      id="user_name"
                      value={inputSignUp.user_name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Ingresa tu email"
                      id="email"
                      value={inputSignUp.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  {/* Phone */}
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Telefono
                    </label>
                    <input
                      type="tel"
                      placeholder="Ingresa tu numero de telefono"
                      id="phone"
                      value={inputSignUp.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  {/* Address */}
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Dirección
                    </label>
                    <input
                      type="text"
                      placeholder="Ingresa tu dirección"
                      id="address"
                      value={inputSignUp.address}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {/* Address */}
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Rol de Usuario
                    </label>
                    <input
                      type="text"
                      placeholder="Ingresa tu rol"
                      id="role_id"
                      value={inputSignUp.role_id}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Rol de Usuario
                  </label>
                  <div className="relative">
                    <span className="absolute left-4.5 top-4"></span>
                    <select
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary appearance-none"
                      name="role"
                      id="role"
                      value={inputSignUp.role_id} // Asegúrate de que este valor se actualice correctamente en tu estado
                      // onChange={handleChange}
                    >
                      <option value="" disabled>
                        Selecciona un rol
                      </option>
                      <option value="Administrador">Administrador</option>
                      <option value="Usuario">Usuario</option>
                      <option value="Supervisor">Supervisor</option>
                      <option value="Manager">Manager</option>
                    </select>
                  </div>

                  {/* <div className="mb-4">
                    <label htmlFor="roleDataList" className="mb-2.5 block font-medium text-black dark:text-white">Rol de usuario</label>
                    <input
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      list="roleOptions"
                      id="roleDataList"
                      placeholder="Busca o Selecciona el rol"
                     
                        value={inputSignUp.role_id}
                        onChange={handleChange}
                    />
                    <datalist id="roleOptions">
                      <option value="Administrador" />
                      <option value="Usuario" />
                      <option value="Supervisor" />
                      <option value="Manager" />
                    </datalist>
                  </div>
                 */}

                  <div className="mb-5">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    >
                      {loading ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        'Registrar'
                      )}
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

export default SignUp;
