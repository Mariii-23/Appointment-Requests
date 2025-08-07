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
