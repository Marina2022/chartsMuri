import s from './Linechart.module.scss'
import HomeLink from "@/components/common/HomeLink.jsx";
import * as d3 from 'd3'
import {useEffect, useRef, useState} from "react";
import {motion} from 'framer-motion'

const LineChart = () => {

  const [data, setData] = useState([
    {name: 'Mara', age: 25},
    {name: 'Jeka', age: 35},
    {name: 'Kosta', age: 50},
    {name: 'Galya', age: 28},
    {name: 'Kira', age: 48},
  ])

  const dimensions = {
    width: 700,
    height: 500
  }
  const xAccessor = d => d.name

  const xScale = d3.scalePoint()
    .domain(data.map(xAccessor))
    .range([0, dimensions.width])
    .padding(.2)

  console.log(data)
  const yAccessor = d => d.age

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, yAccessor)])
    .rangeRound([dimensions.height, 0])

  const svgRef = useRef()

  useEffect(() => {
    const xAxis = d3.axisBottom(xScale)
    d3.select('.xAxis')
      .call(xAxis)

    const yAxis = d3.axisLeft(yScale)
    d3.select('.yAxis')
      .call(yAxis)
  }, [xScale, yScale]);

  const clickHandler = () => {
    const newArr = data.map((d) => {
      d.age = Math.round(Math.random() * 50) + 10
      return d
    })
    setData(newArr)
  }

  const lineGenerator = d3.line()
    .x(d => xScale(d.name))
    .y(d => yScale(d.age))


  return (
    <div className='container'>
      <HomeLink/>

      <svg ref={svgRef} className={s.svg} width="700" height="500">
        <g>
          {
            <path
              className={s.line}
              d={lineGenerator(data)}
            />
          }
        </g>
        
        <g className="points">
          {
            data.map((d, i)=>{
              return <circle
                key={i}
                className={s.circle}
                r={5}
                fill={'red'}
                cx={xScale(d.name)}
                cy={yScale(d.age)}              
              /> 
            })
          }
        </g>

        <g className='xAxis' transform={`translate(0, ${dimensions.height})`}></g>
        <g className='yAxis'></g>

      </svg>


      <button className={s.btn} onClick={clickHandler}>Click</button>
    </div>
  );
};

export default LineChart;

