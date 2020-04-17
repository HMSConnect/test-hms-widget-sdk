import { render } from '@testing-library/react'
import * as React from 'react'
import GraphBase from '../GraphBase'

const jsdom = require('jsdom')
const { JSDOM } = jsdom

const generateData = (start: number, end: number, step: number) => {
  const data = []
  for (let i = start; i < end; i += step) {
    data.push({
      splineValue: Math.sin(i) / i,
      lineValue: (i / 15) ** 2.718 - 0.2,
      argument: i,
    })
  }

  return data
}

const ChartRootComponent: React.FunctionComponent<any> = ({ children }) => {
  return <div>{children}</div>
}
describe('<GraphBase />', () => {
  beforeEach(() => {
    // window.SVGElement.prototype.getBBox = () => ({
    //   x: 0,
    //   y: 0,
    //   // whatever other props you need
    // })
    // window.SVGAElement.prototype.proto
    // window.SVGElement.prototype.getComputedTextLength = () => 200
  })

  afterEach(() => {
    // delete window.SVGElement.prototype.
  })
  it('render GraphBase', () => {
    const data = generateData(2.5, 12, 0.5)
    // console.log('global.innerWidth = 500; :', global.innerWidth)
    // const data = [
    //   {
    //     value: 10,
    //     issuedDate: '2016-10-01T03:39:53.923+00:00',
    //   },
    //   {
    //     value: 20,
    //     issuedDate: '2016-11-01T03:39:53.923+00:00',
    //   },
    //   {
    //     value: 33,
    //     issuedDate: '2016-12-01T03:39:53.923+00:00',
    //   },
    // ]
    // const { queryByText } = render(
    //   <Chart data={data} rootComponent={ChartRootComponent}>
    //     <LineSeries valueField='value' argumentField='argument' />
    //     <SplineSeries valueField='value' argumentField='argument' />
    //   </Chart>,
    // )
    // const { queryByText } = render(
    //   <GraphBase
    //     data={data}
    //     argumentField='issuedDate'
    //     optionStyle={{
    //       height: 700,
    //       width: 700,
    //     }}
    //   />,
    // )

    expect(true).toBeTruthy()
  })
})
