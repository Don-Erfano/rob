/**
 * Generic network response wrapper.
 *
 * @template D The data payload type.
 * @template I The detail type (default string).
 */
export interface INetworkResponse<D, I = string> {
    detail: I;
    code: string;
    data: D;
}

/**
 * Generic network error wrapper.
 */
export interface INetworkError {
    detail: string[];
    code: string;
    data: unknown;
}
