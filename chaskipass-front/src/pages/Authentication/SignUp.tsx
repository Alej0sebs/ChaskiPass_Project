import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
//my imports
import ChaskiLogoW from '../../images/chaski-logo/chaskilogowhite.svg';
import ChaskiLogoB from '../../images/chaski-logo/chaskilogoblack.svg';


const SignUp: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Sign Up" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-10 px-12 text-center">
              <img className='dark:hidden' src={ChaskiLogoB} alt="Logo" />
              <img className='hidden dark:block' src={ChaskiLogoW} alt="Logo" />
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Registro</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Registro de usuarios
              </h2>

              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* DNI */}
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">Ci.</label>
                    <input
                      type="text"
                      placeholder="Ingresa cedula de identidad"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  {/* Name */}
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">Nombre</label>
                    <input
                      type="text"
                      placeholder="Ingresa tu nombre"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">Apellido</label>
                    <input
                      type="text"
                      placeholder="Ingresa tu apellido"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  {/* Username */}
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">Nombre de usuario</label>
                    <input
                      type="text"
                      placeholder="Ingresa tu nombre de usuario"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">Email</label>
                    <input
                      type="email"
                      placeholder="Ingresa tu email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  {/* Phone */}
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">Telefono</label>
                    <input
                      type="tel"
                      placeholder="Ingresa tu numero de telefono"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  {/* Address */}
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">Dirección</label>
                    <input
                      type="text"
                      placeholder="Ingresa tu dirección"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="roleDataList" className="mb-2.5 block font-medium text-black dark:text-white">Rol de usuario</label>
                    <input
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      list="roleOptions"
                      id="roleDataList"
                      placeholder="Busca o Selecciona el rol"
                    />
                    <datalist id="roleOptions">
                      <option value="Admin" />
                      <option value="User" />
                      <option value="Supervisor" />
                      <option value="Manager" />
                    </datalist>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mb-5">
                  <input
                    type="submit"
                    value="Create account"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>
              </form>


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
