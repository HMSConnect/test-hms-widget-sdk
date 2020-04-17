export interface IQueryResult {
  error: any
  data: any[] | any
  schema?: ISchema
  totalCount?: number
}

export interface IListDefaultQuery {
  orderyBy?: string
  order?: string
  offset?: number
  max?: number
}

export interface IServiceResult extends IQueryResult {
  isLoading: boolean
}

export interface ISchema {
  version: number
  standard: 'SFHIR' | 'HMS_CONNECT'
  resourceType: string
}
