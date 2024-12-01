import React, { useState } from "react";
import toast from "react-hot-toast";
import useUsers from "../hooks/useUsers";
import { FaIdCard, FaRegUser, FaUserTie, FaUserAstronaut } from "react-icons/fa";

const Settings: React.FC = () => {
  const { getUsersByDni, updateUsers, loading } = useUsers();
  const [dni, setDni] = useState("");
  const [formData, setFormData] = useState({
    user_name: "",
    phone: "",
    password: "",
  });
  const [isUserFound, setIsUserFound] = useState(false); // Indica si los datos se encontraron
  const [isLoadingData, setIsLoadingData] = useState(false); // Para manejar la carga inicial de datos

  // Maneja el cambio del input de DNI
  const handleDniChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDni(e.target.value);
  };

  // Busca datos del usuario por DNI
  const handleDniSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingData(true);
    try {
      console.log("Fetching user data for DNI:", dni);
      const userData = await getUsersByDni(dni); // Llamar a la función actualizada
      console.log("Fetched user data:", userData);

      if (userData) {
        // Prellenar el formulario con los datos del usuario
        setFormData({
          user_name: userData.user_name || "",
          phone: userData.phone || "",
          password: "", // No precargamos contraseñas por seguridad
        });
        setIsUserFound(true);
        toast.success("User data loaded. You can now edit it.");
      } else {
        setIsUserFound(false);
        toast.error("User not found. Please check the DNI.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data.");
    } finally {
      setIsLoadingData(false);
    }
  };

  // Maneja los cambios en los campos del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Enviar el formulario de actualización
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedData = { ...formData };
      await updateUsers(dni, updatedData);
      toast.success("Perfil Actualizado correctamente!");
    } catch (error) {
      console.error("Error al Actualizar Perfil:", error);
      toast.error("Fallo la actualizacion del perfil.");
    }
  };

  return (
    <div className="settings-container max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Configuración del Usuario</h1>

      {/* Formulario para buscar al usuario por DNI */}
      <form onSubmit={handleDniSubmit} className="dni-form bg-gray-100 p-6 rounded-lg shadow-sm mb-6">
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Cédula de Identidad
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ingrese su CI"
                id="dni"
                value={dni}
                onChange={handleDniChange}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                required
              />
              <span className="absolute right-4 top-4">
                <FaIdCard className="w-[22px] h-[22px]" />
              </span>
            </div>
          </div>
        </div>
        <button type="submit" disabled={loading || isLoadingData} className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition">
          {isLoadingData ? "Buscando..." : "Buscar Usuario"}
        </button>
      </form>

      {/* Formulario para actualizar datos, bloqueado hasta que se encuentre al usuario */}
      {isUserFound && (
        <form onSubmit={handleUpdateSubmit} className="update-form bg-gray-100 p-6 rounded-lg shadow-sm">
          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Nombre de usuario
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ingrese su nuevo nombre de usuario"
                  id="user_name"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                />
                <span className="absolute right-4 top-4">
                  <FaUserAstronaut className="w-[22px] h-[22px]" />
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Teléfono
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="Ingrese su número de teléfono"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                />
                <span className="absolute right-4 top-4">
                  <FaRegUser className="w-[22px] h-[22px]" />
                </span>
              </div>
            </div>
          </div>

          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Ingrese su nueva contraseña"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                />
                <span className="absolute right-4 top-4">
                  <FaUserTie className="w-[22px] h-[22px]" />
                </span>
              </div>
            </div>
          </div>
          <button type="submit" disabled={loading} className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition">
            {loading ? "Actualizando..." : "Actualizar Perfil"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Settings;
