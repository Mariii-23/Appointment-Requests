import { MetaData } from "./meta_data";

export type PageKey = string;

export interface State<T> {
    cache: {
        [key: PageKey]: {
            data: T;
            meta: MetaData;
        };
    };
    loading: boolean;
    error: string | null;
}
