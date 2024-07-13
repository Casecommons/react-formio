export function Report(props: ReportProps): JSX.Element;
export namespace Report {
    namespace propTypes {
        let src: PropTypes.Requireable<string>;
        let projectEndpoint: PropTypes.Requireable<string>;
        let report: PropTypes.Requireable<object>;
        let options: PropTypes.Requireable<PropTypes.InferProps<{
            readOnly: PropTypes.Requireable<boolean>;
            noAlerts: PropTypes.Requireable<boolean>;
            i18n: PropTypes.Requireable<object>;
            template: PropTypes.Requireable<string>;
            language: PropTypes.Requireable<string>;
        }>>;
        let onRowClick: PropTypes.Requireable<(...args: any[]) => any>;
        let onRowSelectChange: PropTypes.Requireable<(...args: any[]) => any>;
        let onFetchDataError: PropTypes.Requireable<(...args: any[]) => any>;
        let onChangeItemsPerPage: PropTypes.Requireable<(...args: any[]) => any>;
        let onPage: PropTypes.Requireable<(...args: any[]) => any>;
        let onChange: PropTypes.Requireable<(...args: any[]) => any>;
        let onFormLoad: PropTypes.Requireable<(...args: any[]) => any>;
        let onError: PropTypes.Requireable<(...args: any[]) => any>;
        let onRender: PropTypes.Requireable<(...args: any[]) => any>;
        let onFocus: PropTypes.Requireable<(...args: any[]) => any>;
        let onBlur: PropTypes.Requireable<(...args: any[]) => any>;
        let onInitialized: PropTypes.Requireable<(...args: any[]) => any>;
        let onReportReady: PropTypes.Requireable<(...args: any[]) => any>;
    }
    function getDefaultEmitter(): EventEmitter;
}
export default Report;
export type Options = {
    readOnly?: boolean | undefined;
    noAlerts?: boolean | undefined;
    i18n?: object | undefined;
    template?: string | undefined;
    projectEndpoint?: string | undefined;
};
export type ReportProps = {
    src?: string | undefined;
    projectEndpoint?: string | undefined;
    report?: object | undefined;
    options?: Options | undefined;
    onFormLoad?: Function | undefined;
    onError?: Function | undefined;
    onRender?: Function | undefined;
    onFocus?: Function | undefined;
    onBlur?: Function | undefined;
    onInitialized?: Function | undefined;
    onReportReady?: Function | undefined;
    onChange?: Function | undefined;
    onRowClick?: Function | undefined;
    onRowSelectChange?: Function | undefined;
    onFetchDataError?: Function | undefined;
    onChangeItemsPerPage?: Function | undefined;
    /**
     * u
     */
    onPage?: Function | undefined;
};
import PropTypes from 'prop-types';
import { EventEmitter } from '@formio/js';
//# sourceMappingURL=Report.d.ts.map