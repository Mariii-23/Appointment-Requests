/* eslint-disable @typescript-eslint/no-explicit-any */
export class FetchEndpointVoidResult {
    Errors: string[];

    constructor(errors: string[]) {
        this.Errors = errors;
    }

    get IsSuccess(): boolean {
        return !this.Errors;
    }

    get HasErrors(): boolean {
        return !!this.Errors;
    }
}

export class FetchEndpointResult<T> extends FetchEndpointVoidResult {
    Result: T | null;

    constructor(result: T | null, errors?: string[]) {
        super(errors ?? []);
        this.Result = result;
    }
}

export const extractApiErrors = (error: unknown): string | null => {
    if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as any).response === "object" &&
        (error as any).response?.data?.errors
    ) {
        const errors = (error as any).response.data.errors;

        if (Array.isArray(errors)) {
            return errors.join("\n");
        }

        if (typeof errors === "object") {
            return Object.values(errors)
                .flat()
                .join("\n");
        }

        return String(errors);
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Unknown error occurred";
}