import { ReactNode } from 'react';
import { FormBuilderProps } from './FormBuilder';
import { FormOptions, FormType, FormProps } from './Form';
import { ComponentProp } from './FormGrid';
import { Form as CoreFormType } from '@formio/core';
type FormEditProps = {
    initialForm?: FormType;
    settingsForm?: FormType;
    settingsFormOptions?: FormOptions;
    onSettingsFormReady?: FormProps['onFormReady'];
    builderOptions?: FormBuilderProps['options'];
    onBuilderReady?: FormBuilderProps['onBuilderReady'];
    Builder?: FormBuilderProps['Builder'];
    saveFormFn?: (form: FormType) => Promise<CoreFormType>;
    onSaveForm?: (form: FormType) => void;
    components?: {
        Container?: ComponentProp<{
            children: ReactNode;
        }>;
        SettingsFormContainer?: ComponentProp<{
            children: ReactNode;
        }>;
        BuilderContainer?: ComponentProp<{
            children: ReactNode;
        }>;
        SaveButtonContainer?: ComponentProp<{
            children: ReactNode;
        }>;
        SaveButton?: ComponentProp<{
            onClick: () => void;
        }>;
    };
};
export declare const DEFAULT_SETTINGS_FORM: {
    display: "form";
    components: {
        label: string;
        columns: ({
            components: ({
                label: string;
                labelPosition: string;
                applyMaskOn: string;
                tableView: boolean;
                validate: {
                    required: boolean;
                };
                key: string;
                type: string;
                input: boolean;
                calculateValue?: undefined;
                columns?: undefined;
            } | {
                label: string;
                labelPosition: string;
                applyMaskOn: string;
                tableView: boolean;
                calculateValue: string;
                validate: {
                    required: boolean;
                };
                key: string;
                type: string;
                input: boolean;
                columns?: undefined;
            } | {
                label: string;
                columns: ({
                    components: {
                        label: string;
                        applyMaskOn: string;
                        tableView: boolean;
                        calculateValue: string;
                        validate: {
                            required: boolean;
                        };
                        key: string;
                        type: string;
                        input: boolean;
                    }[];
                    width: number;
                    offset: number;
                    push: number;
                    pull: number;
                    size: string;
                    currentWidth: number;
                } | {
                    components: {
                        label: string;
                        widget: string;
                        tableView: boolean;
                        data: {
                            values: {
                                label: string;
                                value: string;
                            }[];
                        };
                        validate: {
                            required: boolean;
                        };
                        key: string;
                        type: string;
                        input: boolean;
                        defaultValue: string;
                    }[];
                    width: number;
                    offset: number;
                    push: number;
                    pull: number;
                    size: string;
                    currentWidth: number;
                })[];
                key: string;
                type: string;
                input: boolean;
                tableView: boolean;
                labelPosition?: undefined;
                applyMaskOn?: undefined;
                validate?: undefined;
                calculateValue?: undefined;
            })[];
            width: number;
            offset: number;
            push: number;
            pull: number;
            size: string;
            currentWidth: number;
        } | {
            components: {
                label: string;
                placeholder: string;
                tableView: boolean;
                key: string;
                type: string;
                input: boolean;
            }[];
            offset: number;
            push: number;
            pull: number;
            size: string;
            currentWidth: number;
            width: number;
        })[];
        key: string;
        type: string;
        input: boolean;
        tableView: boolean;
    }[];
};
export declare const FormEdit: ({ initialForm, settingsForm, settingsFormOptions, components, builderOptions, Builder, onSaveForm, saveFormFn, onSettingsFormReady, onBuilderReady, }: FormEditProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FormEdit.d.ts.map