export function submissions({ name, limit, query, select, sort, }: {
    name: any;
    limit?: number | undefined;
    query?: {} | undefined;
    select?: string | undefined;
    sort?: string | undefined;
}): (state: {
    error: string;
    formId: string;
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
    submissions: never[];
} | undefined, action: any) => {
    error: string;
    formId: any;
    isActive: boolean;
    pagination: {
        page: any;
        numPages: number;
        total: number;
    };
    submissions: never[];
    sort: any;
    limit: any;
    select: any;
    query: any;
} | {
    isActive: boolean;
    pagination: {
        numPages: number;
        total: any;
        page: number;
    };
    submissions: any;
    error: string;
    formId: string;
    limit: number;
    query: {};
    select: string;
    sort: string;
} | {
    error: any;
    isActive: boolean;
    formId: string;
    limit: number;
    pagination: {
        numPages: number;
        page: number;
        total: number;
    };
    query: {};
    select: string;
    sort: string;
    submissions: never[];
};
//# sourceMappingURL=reducers.d.ts.map