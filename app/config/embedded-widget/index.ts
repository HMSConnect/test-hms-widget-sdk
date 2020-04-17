import { IWidgetGroup } from '@config'
import { observationWidgetConfig } from '@config/embedded-widget/observation_embedded_config'
import diagnostic_report_embedded_config from './diagnostic_report_embedded_config'
import patientEmbeddedWidgetConfig from './patient_embedded_config'

export const widgetGalleryPatientConfig: IWidgetGroup = patientEmbeddedWidgetConfig

export const widgetGalleryDiagnosticReportConfig: IWidgetGroup = diagnostic_report_embedded_config

export const widgetGalleryObservationConfig: IWidgetGroup = observationWidgetConfig

export const widgetGalleryAllergyIntoleranceConfig: IWidgetGroup = {
  child: [
    {
      document: require('@assets/embedded-widget/medical-record/allergy-intolerance-card.md')
        .default,
      label: 'Allergy Intolerance',
      path: '/embedded-widget/medical-records/allergy-intolerance-card',
      queryParams: [
        {
          defaultValue: '6f8f470e-07e8-4273-ad11-6e3fdc384a09',
          label: 'Patient Id',
          type: 'text',
          value: 'patientId',
        },
        {
          defaultValue: '6f8f470e-07e8-4273-ad11-6e3fdc384a09',
          label: 'Patient Id',
          type: 'text',
          value: 'patientId',
        },
        {
          defaultValue: 20,
          label: 'Max',
          type: 'number',
          value: 'max',
        },
      ],
      value: 'allergy-intolerance-card',
    },
  ],
  label: 'Allergy Intolerance',
  value: 'allergy-intolerance-card',
}

