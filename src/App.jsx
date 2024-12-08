import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "@/pages/Home.jsx";
import First from "@/components/1-First/First.jsx";
import Pedro from "@/components/2-Pedro/Pedro.jsx";
import {createGlobalStyle} from "styled-components";
import MuriBasics from "@/components/3-Muri-basics/MuriBasics.jsx";
import LineChart from "@/components/4-Linechart/Linechart.jsx";
import Gauge from "@/components/5-Gauge/Gauge.jsx";
import Map from "@/components/6-Map/Map.jsx";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 0;
        height: 100%;
        background: aliceblue;
    }
`

function App() {

  return (
    <>
      <GlobalStyle />

      <Router>
        <Routes>
          <Route path='/' index element={<Home/>}/>
          <Route path='/first' element={<First/>}/>
          <Route path='/pedro' element={<Pedro/>}/>
          <Route path='/muri-basics' element={<MuriBasics/>}/>
          <Route path='/line-chart' element={<LineChart/>}/>
          <Route path='/gauge' element={<Gauge/>}/>
          <Route path='/map' element={<Map/>}/>

        </Routes>
      </Router>
    </>
  )
}

export default App
