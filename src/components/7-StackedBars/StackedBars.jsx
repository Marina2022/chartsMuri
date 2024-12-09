import {useEffect, useRef} from 'react';
import HomeLink from "@/components/common/HomeLink.jsx";
import s from "./StackedBars.module.scss";
import * as d3 from "d3";


const fruitData = [
  {
    year: 1980,
    "🥑": 10,
    "🍌": 20,
    "🍆": 30
  },
  {
    year: 1990,
    "🥑": 20,
    "🍌": 40,
    "🍆": 60
  },
  {
    year: 2000,
    "🥑": 30,
    "🍌": 45,
    "🍆": 80
  },
  {
    year: 2010,
    "🥑": 40,
    "🍌": 60,
    "🍆": 100
  },
  {
    year: 2020,
    "🥑": 50,
    "🍌": 80,
    "🍆": 120
  }
];

const allKeys = ["🥑", "🍌", "🍆"];

const colors = {
  "🥑": "green",
  "🍌": "orange",
  "🍆": "purple"
};

const dimensions = {
  width: 700,
  height: 500
}
const StackedBars = () => {

  const svgRef = useRef()
  const svgRef2 = useRef()


  const xAccessor = d => d.year

  const xScale = d3.scaleBand()
    .domain(fruitData.map(xAccessor))
    .rangeRound([0, dimensions.width])
    .padding(.2)


  const xScaleArea = d3.scalePoint()
    .domain(fruitData.map(xAccessor))
    .rangeRound([0, dimensions.width])
    


  const yScale = d3.scaleLinear()
    .domain([0, 300])
    .range([dimensions.height, 0])

  // stack


  const mySomething = d3.stack()
    .keys(allKeys)

  const arrayForDiagram = mySomething(fruitData)

  useEffect(() => {
    const xAxis = d3.axisBottom(xScale)
      .tickSizeOuter(0)

    const xAxisArea = d3.axisBottom(xScaleArea)
      .tickSizeOuter(0)

    d3.select('.xAxis')
      .call(xAxis)

    const yAxis = d3.axisLeft(yScale)
      .tickSizeOuter(0)

    
    
    d3.select('.yAxis')
      .call(yAxis)

    d3.select('.xAxis2')
      .call(xAxisArea)
    
    d3.select('.yAxis2')
      .call(yAxis)


  }, []);


  return (
    <div className='container'>
      <HomeLink/>

      {/*stacked bars*/}

      <div className={s.wrapper}>
        <svg ref={svgRef} className={s.svg} preserveAspectRatio="xMidYMid meet" viewBox="0 0 700 500">

          <g className={s.diagram}>
            {
              arrayForDiagram.map((colorGroup, i) => {
                return <g
                  fill={colors[colorGroup.key]}
                  key={i}
                >
                  {
                    colorGroup.map((item, i2) => {
                        return <rect
                          key={i2}

                          x={xScale(item.data.year)}
                          width={xScale.bandwidth()}

                          y={yScale(item[1])}
                          height={dimensions.height - yScale(item[1] - item[0])}

                        />
                      }
                    )
                  }
                </g>
              })
            }
          </g>
          <g className='xAxis' transform={`translate(0, ${dimensions.height})`}></g>
          <g className='yAxis'></g>
        </svg>
      </div>

      {/* stacked areas */}

      <div className={s.wrapper}>
        <svg ref={svgRef2} className={s.svg} preserveAspectRatio="xMidYMid meet" viewBox="0 0 700 500">

          <g className={s.diagram}>
            {
              arrayForDiagram.map((colorGroup, i) => {                
                const areaGenerator = d3.area()
                  .x(d => xScaleArea(d.data.year))
                  .y0(d => yScale(d[0]))
                  .y1(d => yScale(d[1]))
                  .curve(d3.curveCardinal)

                const dValue = areaGenerator(colorGroup)

                return <g
                  fill={colors[colorGroup.key]}
                  key={i}
                >
                  <path
                    d={dValue}
                    
                  />

                </g>
              })
            }
          </g>
          <g className='xAxis2' transform={`translate(0, ${dimensions.height})`}></g>
          <g className='yAxis2'></g>
        </svg>
      </div>

    </div>
  );
};

export default StackedBars;
