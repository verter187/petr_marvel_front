import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";

import "./comicsList.scss";

const ComicsList = (props) => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(10);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }

    setComicsList([...comicsList, ...newComicsList]);
    setNewItemLoading(false);
    setOffset(offset + 8);
    setComicsEnded(ended);
  };

  const onRequest = (offset, initial = false) => {
    setNewItemLoading(!initial);
    getAllComics(offset).then(onComicsListLoaded);
  };
  // Этот метод создан для оптимизации,
  // чтобы не помещать такую конструкцию в метод render
  const renderItems = (arr) => {
    const items = arr.map((item) => {
      return (
        <li className="comics__item" key={item.id}>
          <Link to={`/comics/${item.id}`}>
            <img
              className="comics__item-img"
              src={item.thumbnail}
              alt={item.name}
            />
            <div className="comics__item-name">{item.name}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      );
    });
    // А эта конструкция вынесена для центровки спиннера/ошибки
    return <ul className="comics__grid">{items}</ul>;
  };

  const items = renderItems(comicsList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: comicsEnded ? "none" : "block" }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
