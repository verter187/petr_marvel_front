import { Component } from "react";
import "./charList.scss";
// import abyss from "../../resources/img/abyss.jpg";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {
  componentDidMount() {
    console.log("componentDidMount");
    this.updateChars();
    // this.timerId = setInterval(this.updateChar, 3000);
  }

  state = {
    chars: [],
    loading: true,
    error: false,
  };
  marvelService = new MarvelService();
  onCharsLoaded = (chars) => {
    this.setState({ chars, loading: false, error: false });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  updateChars = () => {
    console.log("updateChars");
    this.marvelService
      .getAllCharacters()
      .then(this.onCharsLoaded)
      .catch(this.onError);
  };

  render() {
    let { chars, loading, error } = this.state;
    let contents = error ? <ErrorMessage /> : <ViewChars chars={chars} />;
    contents = loading ? <Spinner /> : contents;
    console.log("render");

    return (
      <div className="char__list">
        <ul className="char__grid">{contents}</ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

const ViewChars = ({ chars }) => {
  return chars.map((item) => (
    <li key={item.id} className="char__item">
      <img src={item.thumbnail} alt="abyss" />
      <div className="char__name">Abyss</div>
    </li>
  ));
};

export default CharList;
