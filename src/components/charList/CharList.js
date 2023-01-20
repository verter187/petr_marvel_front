import { Component } from "react";
import "./charList.scss";
// import abyss from "../../resources/img/abyss.jpg";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {
  // constructor(props) {
  //   super(props);
  //   this.onCharsLoaded = props.onCharsLoaded;
  // }

  componentDidMount() {
    console.log("componentDidMount");
    this.updateChars();
    // this.timerId = setInterval(this.updateChar, 3000);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.offset !== prevState.offset) {
      this.updateChars(this.state.offset);
    }
  }

  state = {
    chars: [],
    offset: 210,
    loading: true,
    error: false,
    newItemLoading: false,
    charEnded: false,
  };
  marvelService = new MarvelService();

  onLoadMore = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        offset: prevState.offset + 9,
      };
    });
  };

  onCharsLoading = () => {
    this.setState({ newItemLoading: true });
  };

  onCharsLoaded = (newChars) => {
    let ended = newChars.length < 9;
    this.setState(({ chars }) => ({
      chars: [...chars, ...newChars],
      loading: false,
      error: false,
      newItemLoading: false,
      charEnded: ended,
    }));
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  updateChars = (offset) => {
    this.onCharsLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharsLoaded)
      .catch(this.onError);
  };

  render() {
    let { chars, loading, error, newItemLoading, charEnded } = this.state;
    let contents = error ? (
      <ErrorMessage />
    ) : (
      <ViewChars chars={chars} props={this.props} />
    );
    contents = loading ? <Spinner /> : contents;
    console.log("render");

    return (
      <div className="char__list">
        <ul className="char__grid">{contents}</ul>
        <button
          className="button button__main button__long"
          onClick={() => this.onLoadMore()}
          disabled={newItemLoading}
          style={{ display: charEnded ? "none" : "block" }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

const ViewChars = ({ chars, props }) => {
  return chars.map((item) => {
    let notImage = item.thumbnail.includes("image_not_available"),
      objectFit = notImage ? "contain" : "cover";
    return (
      <li
        key={item.id}
        onClick={() => props.onCharSelected(item.id)}
        className="char__item"
      >
        <img
          style={{ objectFit: objectFit }}
          src={item.thumbnail}
          alt={item.name}
        />
        <div className="char__name">{item.name}</div>
      </li>
    );
  });
};

export default CharList;
