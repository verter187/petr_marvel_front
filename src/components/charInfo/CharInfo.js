import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import MarvelService from "../../services/MarvelService";
import Skeleton from "../skeleton/Skeleton";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charInfo.scss";

const CharInfo = ({ charId }) => {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const marvelService = new MarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
  };

  const onCharLoading = () => {
    setLoading(true);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const updateChar = (charId) => {
    if (!charId) {
      return;
    }

    onCharLoading();

    marvelService.getCharacter(charId).then(onCharLoaded).catch(onError);
  };

  useEffect(() => {
    if (charId) updateChar(charId);
  }, [charId]);

  // useEffect(() => {
  //   updateChar(charId);
  // }, []);

  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = loading || error || !char ? null : <View char={char} />;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  let {
    thumbnail,
    name,
    description = "description is missing",
    homepage,
    wiki,
    comics,
  } = char;

  const limit = 10;

  let notImage = thumbnail.includes("image_not_available"),
    objectFit = notImage ? "contain" : "cover";

  comics =
    comics.length === 0
      ? "Comics not found"
      : comics
          .filter((_, i) => i < limit)
          .map((item, i) => (
            <li key={i} className="char__comics-item">
              {item.name}
            </li>
          ));

  return (
    <>
      <div className="char__basics">
        <img style={{ objectFit: objectFit }} src={thumbnail} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">{comics}</ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};
export default CharInfo;
