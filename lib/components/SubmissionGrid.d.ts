import { ReactNode } from 'react';
import { FormProps, JSON } from './Form';
import { ComponentProp } from './FormGrid';
export type FetchedSubmission = NonNullable<FormProps['submission']> & {
    _id: string;
};
export type SubmissionTableProps = {
    submissions?: FetchedSubmission[];
    components?: {
        Container?: ComponentProp<{
            children: ReactNode;
        }>;
        TableContainer?: ComponentProp<{
            children: ReactNode;
        }>;
        TableHeadContainer?: ComponentProp<{
            children: ReactNode;
        }>;
        TableHeadCell?: ComponentProp<{
            children: ReactNode;
        }>;
        TableBodyRowContainer?: ComponentProp<{
            children: ReactNode;
            onClick?: () => void;
        }>;
        TableHeaderRowContainer?: ComponentProp<{
            children: ReactNode;
        }>;
        TableBodyContainer?: ComponentProp<{
            children: ReactNode;
        }>;
        TableCell?: ComponentProp<{
            children: ReactNode;
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
    onSubmissionClick?: (id: string) => void;
    limit: number;
    submissionQuery?: {
        [key: string]: JSON;
    };
    formId?: string;
};
export declare const SubmissionTable: ({ formId, limit, submissions, onSubmissionClick, components, submissionQuery, }: SubmissionTableProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SubmissionGrid.d.ts.map