import Axios, { AxiosResponse } from 'axios'
import * as _ from 'lodash'
import { stringify } from 'qs'

import AbstractAdapter from './AbstractAdapter'

export default class AuthAdapter extends AbstractAdapter {
  constructor(host: string) {
    super(host, 'dev')
  }

  async doRequest(resource: string, params: any): Promise<AxiosResponse<any>> {
    // console.info(`requesting for ${resource} with params = `, params)
    const result = await Axios.get(`${this.host}/${resource}`, {
      params,
      paramsSerializer: params => stringify(params)
    })
    return result.data
  }
}
