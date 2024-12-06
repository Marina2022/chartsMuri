import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "@/pages/Home.jsx";
import First from "@/components/1-First/First.jsx";
import Pedro from "@/components/2-Pedro/Pedro.jsx";
import {createGlobalStyle} from "styled-components";
import MuriBasics from "@/components/3-Muri-basics/MuriBasics.jsx";

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

        </Routes>
      </Router>
    </>
  )
}

export default App
