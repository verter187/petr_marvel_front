import { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
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
        <ErrorBoundary>
          <CharInfo charId={selectedChar} />
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
