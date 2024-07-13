export function auth(): (state: {
    init: boolean;
    isActive: boolean;
    user: null;
    authenticated: boolean;
    submissionAccess: {};
    formAccess: {};
    projectAccess: {};
    roles: {};
    is: {};
    error: string;
} | undefined, action: any) => {
    isActive: boolean;
    user: any;
    authenticated: boolean;
    is: {};
    error: string;
    init: boolean;
    submissionAccess: {};
    formAccess: {};
    projectAccess: {};
    roles: {};
} | {
    isActive: boolean;
    is: {};
    error: any;
    init: boolean;
    user: null;
    authenticated: boolean;
    submissionAccess: {};
    formAccess: {};
    projectAccess: {};
    roles: {};
} | {
    submissionAccess: any;
    init: boolean;
    isActive: boolean;
    user: null;
    authenticated: boolean;
    formAccess: {};
    projectAccess: {};
    roles: {};
    is: {};
    error: string;
} | {
    formAccess: any;
    init: boolean;
    isActive: boolean;
    user: null;
    authenticated: boolean;
    submissionAccess: {};
    projectAccess: {};
    roles: {};
    is: {};
    error: string;
} | {
    projectAccess: any;
    init: boolean;
    isActive: boolean;
    user: null;
    authenticated: boolean;
    submissionAccess: {};
    formAccess: {};
    roles: {};
    is: {};
    error: string;
} | {
    roles: any;
    init: boolean;
    isActive: boolean;
    user: null;
    authenticated: boolean;
    submissionAccess: {};
    formAccess: {};
    projectAccess: {};
    is: {};
    error: string;
};
//# sourceMappingURL=reducers.d.ts.map