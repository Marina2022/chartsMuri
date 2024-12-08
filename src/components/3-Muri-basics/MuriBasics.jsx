import s from './MuriBasics.module.scss'
import HomeLink from "@/components/common/HomeLink.jsx";
import * as d3 from 'd3'
import {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from 'framer-motion'

const MuriBasics = () => {

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

  const xScale = d3.scaleBand()
    .domain(data.map(xAccessor))
    .range([0, dimensions.width])
    .padding(.2)

  const yAccessor = d => d.age

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, yAccessor) + 5])
    .rangeRound([dimensions.height, 0])

  const colorScale = d3.scaleThreshold()
    .domain([30, 40])
    .range(['lightgreen', 'green', 'darkgreen'])

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

  const [hoverIndex, setHoverIndex] = useState(null)

  return (
    <div className='container'>
      <HomeLink/>


      {/*<AnimatePresence>*/}
      <svg ref={svgRef} className={s.svg} preserveAspectRatio="xMidYMid meet" viewBox="0 0 700 500" >

        <g className={s.labelsGroup}>
          {
            data.map((d, i) => {
              const barY = yScale(yAccessor(d));

              return (
                <motion.g
                  key={d.name}
                  animate={{
                    opacity: hoverIndex === i ? 1 : 0,
                    y: hoverIndex === i ? 0 : 5
                  }}
                  transition={{
                    duration: 0.3, // Плавность анимации
                    ease: "easeOut",
                  }}
                >
                  <text
                    x={xScale(xAccessor(d)) + xScale.bandwidth() / 2}
                    width={xScale.bandwidth()}
                    className={s.text}
                    fill={colorScale(yAccessor(d))}
                    height={20}
                    y={barY - 10}
                  >
                    {d.age} лет
                  </text>
                </motion.g>
              )
            })
          }
        </g>

        <g>
          {
            data.map((d, i) => {
              const barHeight = dimensions.height - yScale(yAccessor(d));
              const barY = yScale(yAccessor(d));

              return (
                <motion.rect
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                  initial={false}  // первый раз не анимировать
                  key={d.name}
                  x={xScale(xAccessor(d))}
                  width={xScale.bandwidth()}
                  className={s.rect}
                  fill={colorScale(yAccessor(d))}
                  animate={{
                    height: barHeight, // Анимация высоты
                    y: barY, // Поддержка правильной позиции                                   
                  }}
                  transition={{
                    duration: 0.5, // Длительность анимации
                    ease: "easeOut", // Плавное завершение
                  }}
                />
              )
            })
          }
        </g>

        <g className='xAxis' transform={`translate(0, ${dimensions.height})`}></g>
        <g className='yAxis' transform='translate(0,0)'></g>

      </svg>
      {/*</AnimatePresence>*/}

      <button className={s.btn} onClick={clickHandler}>Click</button>

      <AnimatePresence>

        <div className={s.ghost}>
          {
            hoverIndex !== null && <motion.button
            initial={{
              y: 10,
              opacity: 0
            }}
            animate={{
              y: 0,
              opacity: 1
            }}
            
            transition={{
              ease: 'easeInOut',
              duration: .4              
            }}            
            >Призрак</motion.button>
          }
        </div>

      </AnimatePresence>
    </div>
  );
};

export default MuriBasics;
