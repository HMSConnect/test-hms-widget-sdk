import { RouterContext } from 'next-server/dist/lib/router-context'
import { NextRouter } from 'next/router'
import * as React from 'react'

export function withTestRouter(tree: React.ReactElement, router: Partial<NextRouter> = {}) {
  const {
    route = '',
    pathname = '',
    query = {},
    asPath = '',
    push = async () => true,
    replace = async () => true,
    reload = () => null,
    back = () => null,
    prefetch = async () => undefined,
    beforePopState = () => null,
    events = {
      on: () => null,
      off: () => null,
      emit: () => null
    }
  } = router

  return (
    <RouterContext.Provider
      value={{
        route,
        pathname,
        query,
        asPath,
        push,
        replace,
        reload,
        back,
        prefetch,
        beforePopState,
        events
      }}
    >
      {tree}
    </RouterContext.Provider>
  )
}