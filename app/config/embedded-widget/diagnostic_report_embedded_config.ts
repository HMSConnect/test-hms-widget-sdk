import { IWidgetGroup } from '@config'

export default {
  child: [
    {
      document: require('@assets/embedded-widget/medical-record/simple-diagnostic-report-card.md')
        .default,
      label: 'Simple Diagnositc Report Card',
      path: '/embedded-widget/medical-records/diagnostic-report-card',
      queryParams: [
        {
          defaultValue: 'cca7e86a-14de-417c-9d16-ac992f0629c9',
          label: 'Filter[id]',
          type: 'text',
          value: 'id',
        },
      ],
      value: 'simple-diagnostic-report-card',
    },
    {
      document: require('@assets/embedded-widget/medical-record/diagnostic-report-card.md')
        .default,
      label: 'Diagnositc Report Card',
      path: '/embedded-widget/medical-records/diagnostic-report-card',
      queryParams: [
        {
          defaultValue: '0debf275-d585-4897-a8eb-25726def1ed5',
          label: 'Filter[patientId]',
          type: 'text',
          value: 'patientId',
        },
        {
          defaultValue: '3898f0f9-385e-478d-be25-5f05719e80af',
          label: 'Filter[Encounter ID]',
          type: 'text',
          value: 'encounterId',
        },
        {
          defaultValue: true,
          label: 'Is Include Modal',
          type: 'boolean',
          value: 'isIncludeModal',
        },
      ],
      value: 'diagnostic-report-card',
    },
  ],
  label: 'Diagnostic Report',
  value: 'diagnostic-report-card',
} as IWidgetGroup
