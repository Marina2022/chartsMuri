import s from './First.module.scss'
import * as d3 from 'd3'
import {useEffect, useRef} from "react";
import HomeLink from "@/components/common/HomeLink.jsx";

const data = [10, 24, 35, 23, 55]
const First = () => {

  const svgRef = useRef()

  useEffect(() => {

    const rectScale = d3.scaleBand()
      .domain(data)
      .range([0, 500])

    const mySvg = d3.select(svgRef.current)

    mySvg
      .selectAll('rect')
      .data(data)
      .join((enter) => {        
        const sel =  enter.append('rect')
          .attr('width', 50)
          .attr('height', 0)
          .attr('fill', 'green')
          .attr('x', d => rectScale(d))        
        return sel
      },
        (update)=>update,
        (exit)=>exit.remove()      
      )
      .transition()
      .attr('width', 50)
      .attr('height', 100)
      .attr('fill', 'green')
      .attr('x', d => rectScale(d))

    mySvg.append('circle')
      .attr('r', 100)
 
    
  }, []);


  return (
    <div className='container'>
      <HomeLink/>

      <svg className={s.svg} width="500" height="300" ref={svgRef}></svg>
    </div>
  );
};

export default First;