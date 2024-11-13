import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
    requiredRole?: string[];
    children: JSX.Element
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const { authUser } = useAuthContext();

    // Redirigir al inicio de sesión si no hay usuario autenticado
    if (!authUser) {
        return <Navigate to="/auth/signin"/>;
    }

    // Redirigir a no autorizado si el rol no coincide
    if (requiredRole && !requiredRole.includes(authUser.role)) {
        return <Navigate to="/unauthorized"/>;
    }

    // Si está autenticado y tiene el rol correcto, renderiza el componente hijo
    return <>{children}</>;
};

export default ProtectedRoute;
