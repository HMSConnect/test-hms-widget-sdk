import IAdapter from './IAdapter'

export default abstract class AbstractAdapter implements IAdapter {
  constructor(protected host: string, protected env: string) {
    this.host = host
    this.env = env
  }
  abstract doRequest(resource: string, params: any): Promise<any>
}
