import { IWidgetGroup } from '@config'

export const observationWidgetConfig: IWidgetGroup = {
  child: [
    {
      document: require('@assets/embedded-widget/observation/observation-blood-pressure-card.md')
        .default,
      label: 'Observation Blood Pressure Card',
      parameters: [],
      path: '/embedded-widget/observation/blood-pressure-card',
      queryParams: [
        {
          defaultValue: '0debf275-d585-4897-a8eb-25726def1ed5',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
        {
          defaultValue: '3898f0f9-385e-478d-be25-5f05719e80af',
          label: 'Encounter ID',
          type: 'text',
          value: 'encounterId',
        },
      ],
      value: 'observation-blood-pressure-card',
    },
    {
      document: require('@assets/embedded-widget/observation/observation-temperature-card.md')
        .default,
      label: 'Observation Temperature Card',
      parameters: [],
      path: '/embedded-widget/observation/temperature-card',
      queryParams: [
        {
          defaultValue: '0debf275-d585-4897-a8eb-25726def1ed5',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
        {
          defaultValue: '3898f0f9-385e-478d-be25-5f05719e80af',
          label: 'Encounter ID',
          type: 'text',
          value: 'encounterId',
        },
      ],
      value: 'observation-temperature-card',
    },
    {
      document: require('@assets/embedded-widget/observation/observation-tobacco-smoking-status-card.md')
        .default,
      label: 'Observation Tobacco Smoking Status Card',
      parameters: [],
      path: '/embedded-widget/observation/tobacco-smoking-status-card',
      queryParams: [
        {
          defaultValue: '0debf275-d585-4897-a8eb-25726def1ed5',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
        {
          defaultValue: '3898f0f9-385e-478d-be25-5f05719e80af',
          label: 'Encounter ID',
          type: 'text',
          value: 'encounterId',
        },
      ],
      value: 'observation-tobacco-smoking-status-card',
    },
    {
      document: require('@assets/embedded-widget/observation/observation-body-measurement-card.md')
        .default,
      label: 'Observation Body Measurement Card',
      parameters: [],
      path: '/embedded-widget/observation/body-measurement-card',
      queryParams: [
        {
          defaultValue: '0debf275-d585-4897-a8eb-25726def1ed5',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
        {
          defaultValue: '3898f0f9-385e-478d-be25-5f05719e80af',
          label: 'Encounter ID',
          type: 'text',
          value: 'encounterId',
        },
      ],
      value: 'observation-body-measurement-card',
    },
    {
      document: require('@assets/embedded-widget/observation/observation-heart-rate-card.md')
        .default,
      label: 'Observation Heart Rate Card',
      parameters: [],
      path: '/embedded-widget/observation/heart-rate-card',
      queryParams: [
        {
          defaultValue: '0debf275-d585-4897-a8eb-25726def1ed5',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
        {
          defaultValue: '3898f0f9-385e-478d-be25-5f05719e80af',
          label: 'Encounter ID',
          type: 'text',
          value: 'encounterId',
        },
      ],
      value: 'observation-heart-rate-card',
    },
    {
      document: require('@assets/embedded-widget/observation/observation-blood-pressure-graph.md')
        .default,
      label: 'Observaion Blood Pressure Graph',
      parameters: [],
      path: '/embedded-widget/observation/blood-pressure-graph',
      queryParams: [
        {
          defaultValue: '0debf275-d585-4897-a8eb-25726def1ed5',
          label: 'Patient ID',
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
      value: 'observaion-blood-pressure-graph',
    },
    {
      document: require('@assets/embedded-widget/observation/observation-body-height-graph.md')
        .default,
      label: 'Observaion Body Height Graph',
      parameters: [],
      path: '/embedded-widget/observation/body-height-graph',
      queryParams: [
        {
          defaultValue: '0debf275-d585-4897-a8eb-25726def1ed5',
          label: 'Patient ID',
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
      value: 'observaion-body-height-graph',
    },
    {
      document: require('@assets/embedded-widget/observation/observation-body-weight-graph.md')
        .default,
      label: 'Observaion Body Weight Graph',
      parameters: [],
      path: '/embedded-widget/observation/body-weight-graph',
      queryParams: [
        {
          defaultValue: '0debf275-d585-4897-a8eb-25726def1ed5',
          label: 'Patient ID',
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
      value: 'observaion-body-weight-graph',
    },
    {
      document: require('@assets/embedded-widget/observation/observation-body-mass-index-graph.md')
        .default,
      label: 'Observaion Body Mass Index Graph',
      parameters: [],
      path: '/embedded-widget/observation/body-mass-index-graph',
      queryParams: [
        {
          defaultValue: '0debf275-d585-4897-a8eb-25726def1ed5',
          label: 'Patient ID',
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
      value: 'observaion-body-mass-index-graph',
    },
    {
      document: require('@assets/embedded-widget/observation/observation-body-temperature-graph.md')
        .default,
      label: 'Observaion Body Temperature Graph',
      parameters: [],
      path: '/embedded-widget/observation/body-temperature-graph',
      queryParams: [
        {
          defaultValue: '0debf275-d585-4897-a8eb-25726def1ed5',
          label: 'Patient ID',
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
      value: 'observaion-body-temperature-graph',
    },
    {
      document: require('@assets/embedded-widget/observation/observation-heart-rate-graph.md')
        .default,
      label: 'Observaion Heart Rate Graph',
      parameters: [],
      path: '/embedded-widget/observation/heart-rate-graph',
      queryParams: [
        {
          defaultValue: '0debf275-d585-4897-a8eb-25726def1ed5',
          label: 'Patient ID',
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
      value: 'observaion-heart-rate-graph',
    },
    {
      document: require('@assets/embedded-widget/observation/observation-laboratory-table.md')
        .default,
      label: 'Observaion Laboratory Table',
      parameters: [],
      path: '/embedded-widget/observation/laboratory-table',
      queryParams: [
        {
          defaultValue: '0debf275-d585-4897-a8eb-25726def1ed5',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
        {
          defaultValue: '3898f0f9-385e-478d-be25-5f05719e80af',
          label: 'Encounter ID',
          type: 'text',
          value: 'encounterId',
        },
        {
          defaultValue: 20,
          label: 'Max',
          type: 'number',
          value: 'max',
        },
      ],
      value: 'patient-observaion-laboratory-table',
    },
    // {
    //   document: require('@assets/embedded-widget/medical-record/observation-laboratory-card.md')
    //     .default,
    //   label: 'Observation - Laboraory',
    //   path: '/embedded-widget/observation/laboratory-card',
    //   queryParams: [
    //     {
    //       defaultValue: '3898f0f9-385e-478d-be25-5f05719e80af',
    //       label: 'Encounter Id',
    //       type: 'text',
    //       value: 'encounterId',
    //     },
    //     {
    //       defaultValue: 20,
    //       label: 'Max',
    //       type: 'number',
    //       value: 'max',
    //     },
    //   ],
    //   value: 'observation-laboratory-card',
    // },
    // {
    //   document: require('@assets/embedded-widget/medical-record/observation-vital-sign-card.md')
    //     .default,
    //   label: 'Observation - VitalSign',
    //   path: '/embedded-widget/observation/vital-sign-card',
    //   queryParams: [
    //     {
    //       defaultValue: '3898f0f9-385e-478d-be25-5f05719e80af',
    //       label: 'Encounter Id',
    //       type: 'text',
    //       value: 'encounterId',
    //     },
    //     {
    //       defaultValue: 20,
    //       label: 'Max',
    //       type: 'number',
    //       value: 'max',
    //     },
    //   ],
    //   value: 'observation-vital-sign-card',
    // },
    {
      document: require('@assets/embedded-widget/observation/observation-summary-graph.md')
        .default,
      label: 'Observation Summary Graph',
      path: '/embedded-widget/observation/summary-graph',
      queryParams: [
        {
          defaultValue: '0debf275-d585-4897-a8eb-25726def1ed5',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
      ],
      value: 'observation-summary-card',
    },
    {
      document: require('@assets/embedded-widget/observation/observation-history-graph.md')
        .default,
      label: 'Observation History Graph',
      path: '/embedded-widget/observation/history-graph',
      queryParams: [
        {
          defaultValue: '0debf275-d585-4897-a8eb-25726def1ed5',
          label: 'Patient ID',
          type: 'text',
          value: 'patientId',
        },
        {
          choices: [
            {
              label: 'Blood Pressure',
              value: 'bloodPressure',
            },
            {
              label: 'Body Height',
              value: 'bodyHeight',
            },
            {
              label: 'Body Weight',
              value: 'bodyWeight',
            },
            {
              label: 'Body Mass Index',
              value: 'bodyMassIndex',
            },
            {
              label: 'Body Temperature',
              value: 'bodyTemperature',
            },
            {
              label: 'Heart Rate',
              value: 'heartRate',
            },
          ],
          defaultValue: 'bloodPressure',
          label: 'SelectedCard',
          type: 'options',
          value: 'selectedCard',
        },
      ],
      value: 'observation-history-graph',
    },
  ],
  label: 'Observation - Laboraory',
  value: 'observation-laboratory-card',
}
