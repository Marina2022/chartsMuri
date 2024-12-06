import s from './MuriBasics.module.scss'
import HomeLink from "@/components/common/HomeLink.jsx";
import * as d3 from 'd3'
import {useEffect, useRef, useState} from "react";
import {motion} from 'framer-motion'

const MuriBasics = () => {


  const [data,setData] = useState([
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

  const xAccessor = d=>d.name


  const xScale = d3.scaleBand()
    .domain(data.map(xAccessor))
    .range([0, dimensions.width])
    .padding(.2)

  const yAccessor = d=>d.age

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, yAccessor)])
    .rangeRound([dimensions.height, 0])


  console.log('yScale', yScale(10))


  const svgRef = useRef()



  useEffect(() => {
    console.log(data)

    const xAxis = d3.axisBottom(xScale)
    d3.select('.xAxis')      
      .call(xAxis)

    const yAxis = d3.axisLeft(yScale)
    d3.select('.yAxis')
      .call(yAxis)


  }, [xScale, yScale]);

  const clickHandler = ()=>{
    const newArr = data.map((d)=> {
      d.age = Math.round(Math.random()*50) + 10
      return d
    })
     setData(newArr)
  }


  return (
    <div className='container'>
      <HomeLink/>

      <svg ref={svgRef} className={s.svg} width="700" height="500">                
        <g>
          {
            data.map((d, i) => {

              const barHeight = yScale(yAccessor(d));
              const barY = dimensions.height - barHeight;

              
              
              console.log('y', yScale(yAccessor(d)))

              return <motion.rect
                key={xScale(yAccessor(d))}
                x={xScale(xAccessor(d))}                
                y={yScale(yAccessor(d))}
                height={dimensions.height - yScale(yAccessor(d))}
                width={xScale.bandwidth()}
                className={s.rect}

                // animate={{
                //   height: barHeight, // Анимация высоты
                //   y: barY, // Поддержка правильной позиции                                   
                // }}
                
                
                
                transition={{
                  duration: 0.5, // Длительность анимации
                  ease: "easeOut", // Избегаем bounce, плавно заканчиваем
                }}
              />
            })
          }
        </g>


        <g className='xAxis'></g>
        <g className='yAxis' transform='translate(30,0)'></g>

      </svg>

      <button onClick={clickHandler}>Click</button>
    </div>
  );
};

export default MuriBasics;

