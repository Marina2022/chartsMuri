import s from './Gauge.module.scss';
import HomeLink from "@/components/common/HomeLink.jsx";
import * as d3 from 'd3'
import {useEffect, useRef, useState} from "react";
import {motion} from 'framer-motion'

const Gauge = () => {

  const data = [1, 1]
  // переформатирует данные в нужный массивчег  
  const myPie = d3.pie()
    .value(d => d)


  // получаем отформатированные данные с углами и всем необходимым для построения Pie chart (спец. формат для передачи в data и потом в arc 
  const slices = myPie(data)


  const myArc = d3.arc()
    .outerRadius(200)
    .innerRadius(100)
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2)
    .cornerRadius(20)


  const angleScale = d3.scaleLinear()
    .domain([0, 1])
    .range([-Math.PI / 2, Math.PI / 2])

  const [range, setRange] = useState(0)

  const svgRef = useRef()

  const angleStartForInterpolation = useRef(-Math.PI / 2)

  useEffect(() => {
    const myArcInner = d3.arc()
      .outerRadius(200)
      .innerRadius(100)
      .startAngle(-Math.PI / 2)
      .cornerRadius(20); // Уголок дуги


    // Выбираем группу и добавляем пути с данными
    d3.select(svgRef.current)
      .select('.orangeGaugeGroup')
      .selectAll('.gauge')
      .data([{startAngle: -Math.PI, endAngle: angleScale(range)}]) // Привязываем данные с конечным углом
      .join('path')
      .classed('gauge', true)
      .attr('fill', 'orange')
      .transition()
      .duration(500)
      .attrTween('d', function (d) {
        const interpolate = d3.interpolate(angleStartForInterpolation.current, angleScale(range));
        angleStartForInterpolation.current = angleScale(range)
        return function (t) {
          // d.endAngle = interpolate(t); // Обновляем промежуточное значение
          const currentEndAngle = interpolate(t)
          // return myArcInner({endAngle: d.endAngle}); // Рисуем дугу
          return myArcInner({endAngle: currentEndAngle}); // Рисуем дугу
        };
      });
  }, [range]);


  return (
    <div className='container'>
      <HomeLink/>

      <input type="range" min={0} max={1} step={.01} onInput={(e) => setRange(+e.target.value)} value={range}/>

      <svg ref={svgRef} className={s.svg} preserveAspectRatio="xMidYMid meet" viewBox="0 0 700 500">
        <g transform={`translate(350, 250)`}>
          <path
            d={myArc(slices[0])}
            fill="white"
          />
        </g>
        <g className="orangeGaugeGroup" transform={`translate(350, 250)`}></g>
      </svg>
      <div>
        <button onClick={() => setRange(.5)}>click</button>
      </div>
    </div>
  );
};

export default Gauge;

