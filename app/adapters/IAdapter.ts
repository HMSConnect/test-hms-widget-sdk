export default interface IAdapter {
  doRequest(resource: string, params: any): Promise<any>
}
