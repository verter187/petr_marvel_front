import { Component } from "react";
import "./charInfo.scss";
import thor from "../../resources/img/thor.jpeg";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharInfo extends Component {
  constructor(props) {
    super(props);
    console.log("sfdfdsfds");
  }
  state = {
    char: {},
    loading: false,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }
  onCharLoaded = (char) => {
    this.setState({ char, loading: false, error: false });
  };

  onCharLoading = (char) => {
    this.setState({ loading: true });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  updateChar = () => {
    console.log("где я!");
    const { charId } = this.props;
    if (!charId) {
      return;
    }

    this.onCharLoading();

    this.marvelService
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    let { char, loading, error } = this.state;
    console.log(char);
    let contents = error ? <ErrorMessage /> : <View char={char} />;
    contents = loading ? <Spinner /> : contents;

    return <div className="char__info">{contents}</div>;
  }
}
const View = ({ char }) => {
  let {
    thumbnail,
    name,
    description = "description is missing",
    homepage,
    wiki,
  } = char;

  // let notImage = thumbnail.includes("image_not_available"),
  //   objectFit = notImage ? "contain" : "cover";

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} />
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
      <ul className="char__comics-list">
        <li className="char__comics-item">Alpha Flight (1983) #50</li>
      </ul>
    </>
  );
};

export default CharInfo;
