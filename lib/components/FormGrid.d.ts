import { Form as FormType } from '@formio/core';
import { JSON } from './Form';
import { ReactNode } from 'react';
export type Action = {
    name: string;
    fn: (id: string) => void;
};
export type ComponentProp<T = object> = (props: T) => JSX.Element;
export type FormGridProps = {
    actions?: Action[];
    forms?: FormType[];
    components?: {
        Container?: ComponentProp<{
            children: ReactNode;
        }>;
        FormContainer?: ComponentProp<{
            children: ReactNode;
        }>;
        FormNameContainer?: ComponentProp<{
            children: ReactNode;
            onClick?: () => void;
        }>;
        FormActionsContainer?: ComponentProp<{
            children: ReactNode;
        }>;
        FormActionButton?: ComponentProp<{
            action: Action;
            onClick: () => void;
        }>;
        PaginationContainer?: ComponentProp<{
            children: ReactNode;
        }>;
        PaginationButton?: ComponentProp<{
            children: ReactNode;
            isActive?: boolean;
            disabled?: boolean;
            onClick: () => void;
        }>;
    };
    onFormClick?: (id: string) => void;
    formQuery?: {
        [key: string]: JSON;
    };
    limit?: number;
};
export declare const DEFAULT_COMPONENTS: {};
export declare const FormGrid: ({ actions, components, onFormClick, forms, formQuery, limit, }: FormGridProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FormGrid.d.ts.map