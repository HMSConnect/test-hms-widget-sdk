import environment from '@environment'
import * as _ from 'lodash'
import qs from 'qs'
import { MessageListenerService } from '@services/MessageListenerService'

interface IPostMessage {
  message?: string
  name?: string
  action?: string
  path?: string
  params?: any
  result?: any
  error?: any
}

export function toNaturalName(s: string) {
  return _.chain(s)
    .words()
    .map(v => _.capitalize(v))
    .join(' ')
    .value()
}

export function parse(s: string) {
  const decoded = qs.parse(s)
  // qs -> option decode not work, use JSON.parse instead.

  return JSON.parse(JSON.stringify(decoded), (key: any, value: any) => {
    if (/^(\d+|\d*\.\d+)$/.test(value)) {
      return Number(value)
    }
    const keywords: any = {
      false: false,
      null: null,
      true: true,
    }
    if (value in keywords) {
      return keywords[value]
    }

    return value
  })
}

export const sendMessage = (message: IPostMessage) => {
  if (typeof window !== undefined) {
    const iframeName = MessageListenerService.getIframeName()
    window.parent.postMessage(
      {
        ...message,
        eventType: 'embedded-widget',
        iframeName,
      },
      environment.iframe.targetOrigin,
    )
  }
}

export const countFilterActive = (
  filter: any,
  initialFilter: any,
  excludeFilter?: any[],
) => {
  let filterWithoutExcludeFilter = filter
  if (!_.isEmpty(excludeFilter)) {
    filterWithoutExcludeFilter = _.omit(
      filterWithoutExcludeFilter,
      excludeFilter,
    )
  }
  let count = 0
  _.forEach(filterWithoutExcludeFilter, (value, key) => {
    if (value !== initialFilter[key]) {
      count++
    }
  })

  return count
}

export const validQueryParams = (
  neededParams: any,
  queryParams: any,
  prefixError = 'Need the',
) => {
  return _.chain(neededParams)
    .filter(value => !_.get(queryParams, value))
    .map((v, k) => {
      return `${prefixError} ${v}`
    })
    .value()
}
