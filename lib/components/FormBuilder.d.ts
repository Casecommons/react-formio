import { FormBuilder as FormioFormBuilder } from '@formio/js';
import { Component } from '@formio/core';
import { FormType } from './Form';
interface BuilderConstructor {
    new (element: HTMLDivElement, form: FormType, options: FormioFormBuilder['options']): FormioFormBuilder;
}
export type FormBuilderProps = {
    options?: FormioFormBuilder['options'];
    Builder?: BuilderConstructor;
    initialForm?: FormType;
    onBuilderReady?: (builder: FormioFormBuilder) => void;
    onChange?: (form: FormType) => void;
    onSaveComponent?: (component: Component, original: Component, parent: Component, path: string, index: number, isNew: boolean, originalComponentSchema: Component) => void;
    onEditComponent?: (component: Component) => void;
    onUpdateComponent?: (component: Component) => void;
    onDeleteComponent?: (component: Component, parent: Component, path: string, index: number) => void;
};
export declare const FormBuilder: ({ options, Builder, initialForm, onBuilderReady, onChange, onDeleteComponent, onEditComponent, onSaveComponent, onUpdateComponent, }: FormBuilderProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FormBuilder.d.ts.map