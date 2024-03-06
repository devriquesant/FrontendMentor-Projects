import { ReactElement } from 'react';
import './css/App.css';

import data from './data/json/data.json';

type CardInfo = {
  carType: string,
  description: string
};

const dataInfo = data as CardInfo[];

const GithubLink = "https://devriquesant.github.io/FrontendMentor-Projects/";
const SourceLink = "https://github.com/devriquesant/FrontendMentor-Projects/tree/main/Projects/Nft-preview-card-component-main";

function CardComponent( { carType, description }: CardInfo ) {
  const cardID = carType.toLowerCase();
  const imagePath = `icon-${cardID}.svg`;
  const title = carType[0].toUpperCase() + cardID.slice(1);
  
  return (
      <div className="card-component" id={"card-" + cardID}>
        <div className="card-component-content">
          <div className="card-image-section">
            <img src={imagePath}/>
          </div>
          <div className="card-text-section">
            <h1 className="text-title">
              {title}
            </h1>
            <p className="text-paragraph">
              {description}
            </p>
          </div>
          <div className="card-button-section">
            <button className="card-button" id={"button-" + cardID}>
              Learn More
            </button>
          </div>
        </div>
      </div>
    )
}

function preloadImages( images: string[] ){
  var LinkPreload: JSX.Element[] = [];
  for ( var image of images ){
    LinkPreload.push( <link rel="preload" href={image}></link> )
  }
}


export default function App() {
  var cardComponents: ReactElement[] = [];

  for ( var cardInfo of dataInfo ){ 
    cardComponents.push( 
      ( <CardComponent carType={cardInfo.carType} description={cardInfo.description} key={cardInfo.carType} /> )
    );
  }
  
  return (
    <>
      <main>
        <section id="content">
          {cardComponents}
        </section>
      </main>
      <footer>
        <nav className="attribution">
          <ul id="nav-items">
            <li id="user">
              <a href={GithubLink}>@devriquesant</a>
            </li>
            <li id="source">
              <a href={SourceLink}>Source</a>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  )
}