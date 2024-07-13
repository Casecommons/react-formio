type PaginationResult<T> = {
    data: T[];
    total: number | undefined;
    page: number;
    hasMore: boolean;
    nextPage: () => void;
    prevPage: () => void;
    setPage: (page: number) => void;
    fetchPage: (page: number, limit: number) => Promise<void>;
};
type FetchFunction<T> = (limit: number, skip: number) => Promise<T[]>;
export declare function usePagination<T>(initialPage: number, limit: number, dataOrFetchFunction: T[] | FetchFunction<T>): PaginationResult<T>;
export {};
//# sourceMappingURL=usePagination.d.ts.map