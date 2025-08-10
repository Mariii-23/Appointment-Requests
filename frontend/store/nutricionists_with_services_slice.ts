import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
import { MetaData } from "@/types/meta_data";
import { NutritionistWithServices } from "@/types/nutritionist_with_service";
import { PATHS } from "@/constants/paths";
import { State as CachedState } from "@/types/state_store";
import { extractApiErrors } from "@/types/fetch";

interface NutritionistsState extends CachedState<NutritionistWithServices[]> {
    selectedNutritionist?: NutritionistWithServices,
}

const initialState: NutritionistsState = {
    cache: {},
    loading: false,
    error: null,
};

interface FetchNutritionistsParams {
    nutritionistOrServiceName: string;
    page: number;
    per_page: number;
    location: string;
}

function makePageKeyNutritionists(params: FetchNutritionistsParams) {
    return `location=${params.location || ""}&nutritionistOrServiceName=${params.nutritionistOrServiceName || ""}&per_page=${params.per_page}&page=${params.page}`;
}

export const fetchNutritionists = createAsyncThunk<
    { data: NutritionistWithServices[]; meta: MetaData; pageKey: string },
    FetchNutritionistsParams,
    { rejectValue: string }
>("nutritionists/fetch", async (params, thunkAPI) => {
    const { location, nutritionistOrServiceName, page, per_page } = params;
    const pageKey = makePageKeyNutritionists(params);

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
                location,
                nutritionist_or_service_name: nutritionistOrServiceName,
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
        const extracted = extractApiErrors(error);
        return thunkAPI.rejectWithValue(extracted ?? "Unknown error occurred");
    }
});

export const fetchNutritionistById = createAsyncThunk<
    NutritionistWithServices,
    string,
    { rejectValue: string }
>("nutritionists/fetchById", async (nutritionistId, thunkAPI) => {
    try {
        const res = await api.get(`${PATHS.NUTRICIONISTS_BY_ID(nutritionistId)}?include_services=true`);

        if (res.data.isSuccess) {
            return res.data.result as NutritionistWithServices;
        } else {
            return thunkAPI.rejectWithValue("Failed to fetch nutritionist");
        }
    } catch (error: unknown) {
        const extracted = extractApiErrors(error);
        return thunkAPI.rejectWithValue(extracted ?? "Not Found");
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
            state.selectedNutritionist = undefined;
        },
        clearSelectedNutritionist(state) {
            state.selectedNutritionist = undefined;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchNutritionists.pending, state => {
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
            })

            .addCase(fetchNutritionistById.pending, state => {
                state.loading = true;
                state.error = null;
                state.selectedNutritionist = undefined;
            })
            .addCase(fetchNutritionistById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedNutritionist = action.payload;
            })
            .addCase(fetchNutritionistById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to load nutritionist";
                state.selectedNutritionist = undefined;
            });
    },
});

export const { resetCache } = nutritionistsSlice.actions;
export default nutritionistsSlice.reducer;
export { makePageKeyNutritionists };
