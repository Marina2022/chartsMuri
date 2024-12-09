import s from './Map.module.scss';
import * as d3 from 'd3'
import HomeLink from "@/components/common/HomeLink.jsx";
import {useRef, useState} from "react";
import {motion} from 'framer-motion'
import data from '@/data/GeoChart.world.geo.json'
//import data from '@/data/russia.json'
const Map = () => {
  const svgRef = useRef()

  const [name, setName] = useState('')
  const [currentCountry, setCurrentCountry] = useState(null)


  let pathGenerator


  const projection = d3.geoMercator()
    // .center([1005, 69]) // Adjust the center (longitude, latitude)
    //   .rotate([-20, 0])  // Optional: slight rotation if needed
    .fitSize([1440, 1000], currentCountry ? currentCountry : data)
    .precision(100)

  

  pathGenerator = d3.geoPath().projection(projection)

  return (
    <div className='container1'>
      <HomeLink/>

      <div className={s.name}>{name}</div>
      {/*<svg ref={svgRef} className={s.svg} preserveAspectRatio="xMidYMid meet" viewBox="-0 -200 960 800">*/}


      <svg ref={svgRef} className={s.svg} preserveAspectRatio="xMidYMid meet" viewBox="0 0 1440 1000">

        {
          data.features.map((country, i) => {
            return <motion.path
              
              animate = {{
                d: pathGenerator(country)  
              }}
              
              className={s.path}
              key={i}
              onMouseEnter={() => setName(country.properties.name)}
              onMouseLeave={() => setName('')}
              onClick={() => setCurrentCountry(prev => {
                return prev ? null : country
              })}
            />
          })
        }
      </svg>


      {/*<h1 className={s.title}>Наша карта, и ничего страшного!</h1>*/}
      {/*<p className={s.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum, ipsum quo! Architecto deserunt doloribus earum exercitationem incidunt, laudantium magni maiores minus nulla pariatur rerum sunt suscipit vel? Alias earum est expedita in laudantium mollitia natus odit officia praesentium qui recusandae, reiciendis sit soluta, ullam ut velit vero voluptatem. Aliquid asperiores assumenda eum iure, magni molestias nemo nulla optio perferendis perspiciatis possimus, quae quaerat qui quos saepe unde voluptatem. Architecto debitis dicta, ea eaque earum esse excepturi neque nesciunt nulla possimus quae quo sequi voluptatem? Blanditiis cupiditate delectus doloribus facilis laborum libero nam neque nesciunt rem voluptatum? Blanditiis dicta in ipsum qui suscipit! Accusantium adipisci aperiam architecto dolore doloribus earum facere, inventore ipsa, minus nam porro quas sunt veniam! Esse magni minus vitae. Amet autem est molestiae molestias repellat. Ad, architecto aspernatur atque deleniti dolores, eaque eveniet illo in iste numquam possimus, quia quidem recusandae rem repellendus. Animi aspernatur aut autem beatae corporis culpa cumque dolore est fuga fugiat hic impedit itaque iure laborum magni minima molestias necessitatibus neque, nobis odio odit omnis provident quae quo, quos rerum, tenetur! Accusamus cumque debitis, delectus deleniti dicta dolor enim excepturi fuga illum maiores molestiae mollitia obcaecati odit recusandae rerum soluta tempora temporibus! At explicabo fugiat hic laborum perferendis! A alias aliquid autem beatae consequuntur corporis delectus, dolorum eaque earum eos expedita fugit maiores mollitia natus nihil nisi officiis omnis optio perspiciatis possimus quidem, quo quos recusandae repellendus reprehenderit sapiente sequi similique sint tempore totam veritatis voluptatem voluptates voluptatum! Amet assumenda deleniti nisi quas quos repudiandae. Asperiores beatae consequuntur deserunt distinctio doloribus explicabo facilis illum magnam maxime natus nemo neque nobis nulla obcaecati odio optio quaerat quas quia quo ratione rem, repudiandae, tempora temporibus unde velit, voluptas voluptatum. Assumenda nemo quas recusandae. At aut blanditiis consectetur consequatur culpa delectus deserunt dolore dolorem doloremque dolores doloribus dolorum eaque eligendi eveniet, explicabo id in incidunt itaque laboriosam magni nemo nisi nostrum officiis perferendis possimus quaerat qui rerum suscipit temporibus vel veniam veritatis voluptas voluptatum. Accusantium assumenda deleniti ducimus error itaque maiores nisi nulla quia quis temporibus. Accusamus accusantium alias assumenda at commodi deleniti deserunt dolore, ducimus earum, eius eligendi est exercitationem hic ipsam laborum magnam, maiores necessitatibus quaerat quas qui soluta unde vero voluptatibus? Assumenda delectus doloribus ex quaerat quo. Nam quisquam sit tempora temporibus tenetur! Debitis harum iste minima nobis vel. Autem deleniti exercitationem id labore laborum nesciunt nisi provident quibusdam quod sunt. Consequuntur, nobis?</p>*/}

    </div>
  );
};

export default Map;