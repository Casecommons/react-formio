/// <reference types="react" />
export declare function useFormioContext(): {
    Formio: any;
    baseUrl: any;
    projectUrl: any;
} & {
    token: any;
    setToken: import("react").Dispatch<any>;
    isAuthenticated: boolean;
    logout: () => Promise<void>;
};
//# sourceMappingURL=useFormioContext.d.ts.map