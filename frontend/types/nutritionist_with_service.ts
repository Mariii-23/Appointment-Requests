import { Service } from "./service";

export interface NutritionistWithServices {
    id: string;
    name: string;
    email?: string;
    services: Service[];
}
