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
      .tickSizeOuter(0)

    d3.select('.xAxis')
      .call(xAxis)

    const yAxis = d3.axisLeft(yScale)
      .tickSizeOuter(0)
    
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
    // .curve(d3.curveBumpX)
    .curve(d3.curveCardinal)


  return (
    <div className='container'>
      <HomeLink/>

      <svg ref={svgRef} className={s.svg} preserveAspectRatio="xMidYMid meet" viewBox="0 0 700 500" >
        <g>
          {
            <motion.path
              initial={false}
              className={s.line}

              animate={{
                d: lineGenerator(data)
              }}
            />
          }
        </g>

        <g className="points">
          {
            data.map((d, i) => {
              return <motion.circle
                initial={false}
                key={i}
                className={s.circle}
                r={5}
                fill={'red'}

                animate={{
                  cx: xScale(d.name),
                  cy: yScale(d.age)
                }}

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

