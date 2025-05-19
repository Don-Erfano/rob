export interface INetworkResponse<D, I = string> {
    detail: I;
    code: string;
    data: D;
}

export interface INetworkError {
    detail: string[];
    code: string;
    data: unknown;
}
