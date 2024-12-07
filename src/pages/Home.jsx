import s from './Home.module.scss'
import {Link} from "react-router-dom";

const Home = () => {
  return (
    <>
      <header className={s.header}>
        <div className="container">

          <nav className={s.mainNav}>
            <ul className={s.navList}>
              <li>
                <Link to="/first">First</Link>
              </li>
              <li>
                <Link to="/pedro">Pedro</Link>
              </li>
              <li>
                <Link to="/muri-basics">MuriBasics</Link>
              </li>
              <li>
                <Link to="/line-chart">Line Chart</Link>
              </li>
            
            </ul>
          </nav>
        </div>
      </header>
      <main className={s.main}>
        <div className="container">
          <div>Hello</div>
        </div>

      </main>
    </>
  );
};

export default Home;