import { useState } from "react";
import { Helmet } from "react-helmet";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import SearchForm from "../CharSearchForm/CharSearchForm";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from "../../resources/img/vision.png";

const MainPage = () => {
  const [showRandomChar, setShowRandomChar] = useState(true);
  const [selectedChar, setSelectedChar] = useState(null);

  const onCharSelected = (id) => {
    setSelectedChar((selectedChar) => id);
  };

  const toggleRandomChar = () => {
    setShowRandomChar((showRandomChar) => !showRandomChar);
  };
  return (
    <>
      <Helmet>
        <meta name="description" content="Marvel information portal" />
        <title>Marvel information portal</title>
      </Helmet>
      {showRandomChar ? (
        <ErrorBoundary>
          <RandomChar />
        </ErrorBoundary>
      ) : null}
      <button onClick={toggleRandomChar}>Click me</button>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <div className="charInfo__content">
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
            <SearchForm />
          </ErrorBoundary>
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
