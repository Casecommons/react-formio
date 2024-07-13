export function forms({ name, limit, query, select, sort, }: {
    name: any;
    limit?: number | undefined;
    query?: {} | undefined;
    select?: string | undefined;
    sort?: string | undefined;
}): (state: {
    error: string;
    forms: never[];
    isActive: boolean;
    limit: number;
    pagination: {
        numPages: number;
        page: number;
        total: number;
    };
    query: {};
    select: string;
    sort: string;
} | undefined, action: any) => {
    error: string;
    forms: never[];
    isActive: boolean;
    pagination: {
        page: any;
        numPages: number;
        total: number;
    };
    sort: any;
    limit: any;
    select: any;
    query: any;
} | {
    forms: any;
    isActive: boolean;
    pagination: {
        numPages: number;
        total: any;
        page: number;
    };
    error: string;
    limit: number;
    query: {};
    select: string;
    sort: string;
} | {
    error: any;
    isActive: boolean;
    forms: never[];
    limit: number;
    pagination: {
        numPages: number;
        page: number;
        total: number;
    };
    query: {};
    select: string;
    sort: string;
};
//# sourceMappingURL=reducers.d.ts.map