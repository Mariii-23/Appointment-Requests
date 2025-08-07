import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../services/api";
import { MetaData } from "@/types/meta_data";
import { NutritionistWithServices } from "@/types/nutritionist_with_service";
import { PATHS } from "@/constants/paths";

type PageKey = string;

interface NutritionistsState {
    cache: {
        [key: PageKey]: {
            data: NutritionistWithServices[];
            meta: MetaData;
        };
    };
    loading: boolean;
    error: string | null;
}

const initialState: NutritionistsState = {
    cache: {},
    loading: false,
    error: null,
};

function makePageKey(params: { search: string; page: number; per_page: number }) {
    return `search=${params.search || ""}&per_page=${params.per_page}&page=${params.page}`;
}

export const fetchNutritionists = createAsyncThunk<
    { data: NutritionistWithServices[]; meta: MetaData; pageKey: string },
    { search: string; page: number; per_page: number },
    { rejectValue: string }
>("nutritionists/fetch", async (params, thunkAPI) => {
    const { search, page, per_page } = params;
    const pageKey = makePageKey(params);

    const state = thunkAPI.getState() as { nutritionists: NutritionistsState };
    const cachedPage = state.nutritionists.cache[pageKey];

    if (cachedPage) {
        return {
            data: cachedPage.data,
            meta: cachedPage.meta,
            pageKey,
        };
    }

    try {
        const res = await api.get(PATHS.NUTRICIONISTS_BY_FILTER, {
            params: {
                search,
                page,
                per_page,
                include_services: true,
            },
        });

        if (res.data.isSuccess) {
            const result = res.data.result;
            return {
                data: result.data,
                meta: {
                    current_page: result.current_page,
                    per_page: result.per_page,
                    total_count: result.total_count,
                    total_pages: result.total_pages,
                },
                pageKey,
            };
        } else {
            return thunkAPI.rejectWithValue("Failed to fetch nutritionists");
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue("Unknown error occurred");
    }
});

const nutritionistsSlice = createSlice({
    name: "nutritionists",
    initialState,
    reducers: {
        resetCache(state) {
            state.cache = {};
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNutritionists.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNutritionists.fulfilled, (state, action) => {
                state.loading = false;
                const { pageKey, data, meta } = action.payload;
                state.cache[pageKey] = { data, meta };
            })
            .addCase(fetchNutritionists.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to load nutritionists";
            });
    },
});

export const { resetCache } = nutritionistsSlice.actions;
export default nutritionistsSlice.reducer;
export { makePageKey };
