import appleStock from '@visx/mock-data/lib/mocks/appleStock.js'
import useMeasure from 'react-use-measure'
import {scaleBand, scaleLinear, scaleTime} from '@visx/scale'
import {Group} from '@visx/group'
import {AxisLeft, AxisBottom} from '@visx/axis'
import {Bar} from '@visx/shape'
import styled from 'styled-components'
import HomeLink from "@/components/common/HomeLink.jsx";

const Wrapper = styled.div`
    width: 900px;
    height: 500px;
`
const Pedro = () => {

  const data = appleStock.slice(0, 10)
  console.log(data)

  const [ref, bounds] = useMeasure()

  const defaultWidth = 100
  const defaultHeight = 100

  const width = bounds.width || defaultWidth
  const height = bounds.height || defaultHeight

  const margin = 32

  const innerWidth = width - 2 * margin
  const innerHeight = height - 2 * margin


  // yAccessor
  const getYValue = d => d.close
  const getXValue = d =>  new Date(d.date).toLocaleDateString()


  const xScale = scaleBand()
    .domain(data.map(getXValue))
    .range([margin, width - margin])
    .padding(.2)

  const yScale = scaleLinear()  
    .domain([
      Math.min(...data.map(getYValue)) - 1,
      Math.max(...data.map(getYValue)) + 1
    ])
    .range([height - margin, margin])

  return (
    <div className='container'>
      <HomeLink/>
      <h2>visX</h2>
      <Wrapper>
        <svg ref={ref} width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>

          <Group>{
            data.map(d => {

              return <Bar
                key={getXValue(d)}
                x={xScale(getXValue(d))}
                y={yScale(getYValue(d))}
                width={xScale.bandwidth()}
                height={innerHeight - yScale(getYValue(d))}
                fill="orange"
              />
            })
          }</Group>
          <Group>
            <AxisLeft left={margin} scale={yScale}/>

          </Group>
          <Group>
            <AxisBottom top={innerHeight + margin} scale={xScale}/>
          </Group>
        </svg>
      </Wrapper>

      <br/>
      <br/>
      
      <h2>Recharts</h2>
    </div>
  );
};

export default Pedro;