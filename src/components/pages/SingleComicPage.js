import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./singleComicPage.scss";

const SingleComicPage = () => {
  const { comicId } = useParams();

  const [comic, setComic] = useState(null);

  const { loading, error, getComic, clearError } = useMarvelService();

  const onComicLoaded = (comic) => {
    setComic(comic);
  };

  const updateComic = (comicId) => {
    if (!comicId) {
      return;
    }

    clearError();
    getComic(comicId).then(onComicLoaded);
  };

  useEffect(() => {
    if (comicId) updateComic(comicId);
  }, [comicId]);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = loading || error || !comic ? null : <View comic={comic} />;

  return (
    <div className="single-comic">
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ comic }) => {
  let {
    name,
    description = "description is missing",
    pageCount,
    thumbnail,
    language,
    price,
  } = comic;

  return (
    <>
      <img src={thumbnail} alt="x-men" className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{"page count: " + pageCount}</p>
        <p className="single-comic__descr">
          {"language: " + (language ? language : "en - us")}
        </p>
        <div className="single-comic__price"> {"price: " + price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </>
  );
};
export default SingleComicPage;
