type BaseConfigurationArgs = {
    baseUrl?: string;
    projectUrl?: string;
};
export declare const FormioContext: import("react").Context<({
    Formio: any;
    baseUrl: any;
    projectUrl: any;
} & {
    token: any;
    setToken: import("react").Dispatch<any>;
    isAuthenticated: boolean;
    logout: () => Promise<void>;
}) | null>;
export declare function FormioProvider({ children, baseUrl, projectUrl, }: {
    children: React.ReactNode;
} & BaseConfigurationArgs): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FormioContext.d.ts.map