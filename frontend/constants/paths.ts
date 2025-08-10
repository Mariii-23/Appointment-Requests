export const PATHS = {
    HOME: "/",
    LOGIN: "/auth/login",
    NUTRITIONISTS_BY_FILTER: "/nutritionists/search",
    NUTRITIONISTS_DASHBOARD: "/dashboard/appointments",
    NUTRITIONISTS_BY_ID: (id: string | number) => `/nutritionists/${id}`,
};
