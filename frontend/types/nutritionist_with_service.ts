export interface NutritionistWithServices {
    id: number;
    name: string;
    email?: string;
    services: {
        id: number;
        name: string;
        price_euros: number;
        location: string;
    }[];
}