// Función para obtener datos de paginación
export const getPaginationData = (query: any, pattern?: string) => {
    const { page = 1, limit = 10 } = query;
    const paginationData: any = {
        page: page as number,
        limit: limit as number
    };
    if (pattern) {
        paginationData.pattern = pattern;
    }
    return paginationData;
};