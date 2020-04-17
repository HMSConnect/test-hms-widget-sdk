import * as _ from 'lodash'
import { stringify } from 'qs'

interface IRouteOption {
  matchBy?: MatchBy
  params?: any
}
type RouteMode = 'full' | 'widget'
type MatchBy = 'name' | 'url'

class RouteManager {
  private mode: RouteMode | null = null

  registryMode(pathName: string) {
    const isWidget = _.includes(pathName, 'embedded-widget')
    if (isWidget) {
      this.mode = 'widget'
    } else {
      this.mode = 'full'
    }
    console.info('entering mode: ', this.mode)
  }

  getPath(path: string, options: IRouteOption = {}) {
    const matchBy = options.matchBy ? options.matchBy : 'name'
    const querystring = _.isEmpty(options.params)
      ? ''
      : `?${stringify(options.params)}`
    const prefixPath = matchBy === 'url' ? '/' : ''

    if (this.mode === 'widget') {
      return `${prefixPath}embedded-widget/${path}${querystring}`
    }
    return `${prefixPath}${path}${querystring}`
  }
}

export default new RouteManager()
