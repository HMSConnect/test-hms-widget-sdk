import * as React from 'react'

import {
  tableWithFilterReducer,
  tableWithFilterState,
} from '@app/reducers/tableWithFilter.reducer'
import ErrorSection from '@components/base/ErrorSection'
import GraphBaseLegend from '@components/base/GraphTestLegend'
import LoadingSection from '@components/base/LoadingSection'
import { FormModalContent, useModal } from '@components/base/Modal'
import TableFilterPanel from '@components/base/TableFilterPanel'
import ToolbarWithFilter from '@components/base/ToolbarWithFilter'
import useObservationList from '@components/hooks/useObservationList'
import { OBSERVATION_CODE } from '@config/observation'
import { mergeWithObservationInitialFilterQuery } from '@data-managers/ObservationDataManager'
import { ArgumentScale } from '@devexpress/dx-react-chart'
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@material-ui/core'
import { parse } from '@utils'
import { scaleTime } from 'd3-scale'
import * as _ from 'lodash'

const mapObservaionCode = (codes: string[]) => {
  return _.reduce(
    codes,
    (acc, code) => {
      const findObservationName = _.find(
        OBSERVATION_CODE,
        (observation: any) => {
          return observation.code === code
        },
      )
      if (findObservationName) {
        return { ...acc, [findObservationName.value]: true }
      }
      return acc
    },
    {},
  )
}

const ObservationSummaryTestGraph: React.FunctionComponent<any> = ({
  query,
  initialFilter: customInitialFilter = {
    codes: `${OBSERVATION_CODE.BLOOD_PRESSURE.code},${OBSERVATION_CODE.BODY_MASS_INDEX.code},${OBSERVATION_CODE.BODY_WEIGHT.code}`,
    encounterId: undefined,
    patientId: undefined,
  },
  max = 100,
  optionsGraph = {},
}) => {
  const initialFilter = React.useMemo(() => {
    return mergeWithObservationInitialFilterQuery(customInitialFilter, {
      patientId: _.get(query, 'patientId'),
    })
  }, _.values(customInitialFilter))

  const [selection, setSelection] = React.useState({
    'Body Mass Index': true,
    'Body Weight': true,
    'Diastolic Blood Pressure': true,
    'Systolic Blood Pressure': true,
  })

  const [{ filter, submitedFilter }, dispatch] = React.useReducer(
    tableWithFilterReducer,
    tableWithFilterState,
  )

  React.useEffect(() => {
    dispatch({ type: 'INIT_FILTER', payload: initialFilter })
    setFilter(initialFilter)
  }, [])

  const {
    isLoading,
    data: observationList,
    error,
    setFilter,
  } = useObservationList({
    filter: initialFilter,
    max,
  })

  const submitSearch = (filter: any) => {
    const observationCode = _.chain(filter.selection)
      .map((value, key) => {
        if (!value) {
          return false
        }
        const findObservationName = _.find(
          OBSERVATION_CODE,
          (observation: any) => {
            return observation.value === key
          },
        )
        return _.get(findObservationName, 'code') || ''
      })
      .filter((value: any) => value)
      .value()
    const newFilter = {
      ...filter,
      codes: _.join(observationCode, ','),
    }
    dispatch({ type: 'SUBMIT_SEARCH', payload: newFilter })
    setFilter(newFilter)
  }

  const handleParameterChange = (type: string, value: any) => {
    const selectionPayload = parse(`${type}=${value}`)
    dispatch({
      payload: selectionPayload,
      type: 'FILTER_ON_CHANGE',
    })
  }

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    submitSearch(filter)
    closeModal()
  }

  const handleSearchReset = () => {
    submitSearch(initialFilter)
    closeModal()
  }

  const { showModal, renderModal, closeModal } = useModal(TableFilterPanel, {
    CustomModal: FormModalContent,
    modalTitle: 'Observation Selection',
    name: `${name}Modal`,
    optionCustomModal: {
      onReset: handleSearchReset,
      onSubmit: handleSearchSubmit,
    },
    params: {
      filter,
      filterOptions: [
        {
          group: [
            {
              label: 'Blood Pressure',
              name: OBSERVATION_CODE.BLOOD_PRESSURE.value,
              value: OBSERVATION_CODE.BLOOD_PRESSURE.code,
            },
            {
              label: 'Body Mass Index',
              name: OBSERVATION_CODE.BODY_MASS_INDEX.value,
              value: OBSERVATION_CODE.BODY_MASS_INDEX.code,
            },
            {
              label: 'Body Weight',
              name: OBSERVATION_CODE.BODY_WEIGHT.value,
              value: OBSERVATION_CODE.BODY_WEIGHT.code,
            },
          ],
          label: 'Selection',
          name: 'selection',
          type: 'checkbox-group',
        },
      ],
      onParameterChange: handleParameterChange,
      onSearchSubmit: handleSearchSubmit,
    },
  })

  const prepareGraphData = (data: any) => {
    const newValue: any[] = _.chain(data)
      .map(item => {
        const objectData = _.reduce(
          item['valueModal'],
          (acc, v) => {
            const key = _.camelCase(v.code)
            return {
              ...acc,
              [key]: v.value,
            }
          },
          {},
        )
        return {
          ...objectData,
          issuedDate: item['issuedDate'],
        }
      })
      .groupBy('issuedDate')
      .map((data, key) => {
        return _.reduce(
          data,
          (acc, v, k) => {
            return { ...acc, ...v }
          },
          {},
        )
      })
      .value()
    return newValue
  }

  const onUpdateSelection = (name: string) => {
    setSelection((prev: any) => ({
      ...prev,
      [name]: !prev[name],
    }))
  }

  if (error) {
    return <ErrorSection error={error} />
  }

  if (isLoading) {
    return <LoadingSection />
  }

  if (!submitedFilter.codes) {
    return (
      <>
        <ToolbarWithFilter
          title={'Summary Graph'}
          onClickIcon={showModal}
          option={{
            style: {
              backgroundColor: '#ef5350',
              color: '#e1f5fe',
            },
          }}
        >
          {renderModal}
        </ToolbarWithFilter>
        <Typography variant='body1' style={{ textAlign: 'center' }}>
          Please Choose Category to display
        </Typography>
      </>
    )
  }
  return (
    <>
      <ToolbarWithFilter
        title={'Summary Graph'}
        onClickIcon={showModal}
        option={{
          style: {
            backgroundColor: '#ef5350',
            color: '#e1f5fe',
          },
        }}
      >
        {renderModal}
      </ToolbarWithFilter>
      <ObservationSummaryTestGraphView
        key={`${observationList.length}`}
        observationList={observationList}
        submitedFilter={submitedFilter}
        prepareGraphData={prepareGraphData}
        selection={selection}
        onUpdateSelection={onUpdateSelection}
        options={optionsGraph}
      />
    </>
  )
}

const ObservationSummaryTestGraphView: React.FunctionComponent<any> = ({
  submitedFilter,
  observationList,
  prepareGraphData,
  selection,
  onUpdateSelection,
  options,
}) => {
  return (
    <>
      <GraphBaseLegend
        selection={selection}
        onUpdateSelection={onUpdateSelection}
        key={`${submitedFilter.codes}`}
        data={observationList}
        argumentField='issuedDate'
        optionStyle={{
          color: '#e57373',
        }}
        options={{
          ...options,
          ArgumentScale: <ArgumentScale factory={scaleTime as any} />,
          // ValueScale: <ValueScale modifyDomain={() => [0, 250]} />,
          customPrepareGraphData: prepareGraphData,
          includeLegend: true,
          type: 'line',
        }}
      />
      <MultiSelectForm />
    </>
  )
}

const MultiSelectForm: React.FunctionComponent<any> = ({
  filterOptions,
  onSearchSubmit,
  filter,
  keyField,
  onParameterChange,
}) => {
  const handleChange = (option: any, checked: boolean) => {
    onParameterChange(`${option.name}`, checked)
  }
  const filterMui = keyField ? filter[keyField] : filter
  return (
    <form onSubmit={(event: React.FormEvent) => onSearchSubmit(event, filter)}>
      <FormGroup>
        {_.map(filterOptions, (option, index) => (
          <FormControlLabel
            key={`mul-select${index}`}
            control={
              <Checkbox
                checked={filterMui[option.name]}
                onChange={event => handleChange(option, event.target.checked)}
                value={option.value}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
    </form>
  )
}

export default ObservationSummaryTestGraph
