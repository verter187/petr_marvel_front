import { useEffect, useState } from "react";
import "./randomChar.scss";
import MarvelService from "../../services/MarvelService";
import mjolnir from "../../resources/img/mjolnir.png";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const RandomChar = () => {
  const [char, setChar] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const marvelService = new MarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
    setLoading((loading) => false);
    setError((error) => false);
  };

  const onCharLoading = () => {
    setLoading(true);
  };

  const onError = () => {
    setLoading(false);
    setError(false);
  };

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    onCharLoading();
    marvelService.getCharacter(id).then(onCharLoaded).catch(onError);
  };

  useEffect(() => {
    updateChar();
    const timerId = setInterval(updateChar, 3000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  let contents = error ? <ErrorMessage /> : <View char={char} />;
  contents = loading ? <Spinner /> : contents;

  return (
    <div className="randomchar">
      {contents}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button onClick={updateChar} className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};
// class RandomChar extends Component {
// componentDidMount() {
//   // console.log("componentDidMount");
//   this.updateChar();
//   // this.timerId = setInterval(this.updateChar, 3000);
// }

// componentDidUpdate() {
//   // console.log("componentDidUpdate");
// }
// componentWillUnmount() {
//   // console.log("componentWillUnmount");
//   clearInterval(this.timerId);
// }
// state = {
//   char: {},
//   loading: true,
//   error: false,
// };

// marvelService = new MarvelService();

// onCharLoaded = (char) => {
//   this.setState({ char, loading: false, error: false });
// };

// onCharLoading = (char) => {
//   this.setState({ loading: true });
// };

// onError = () => {
//   this.setState({ loading: false, error: true });
// };
// updateChar = () => {
//   // console.log("updateChar");
//   const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
//   this.onCharLoading();
//   this.marvelService
//     .getCharacter(id)
//     .then(this.onCharLoaded)
//     .catch(this.onError);
// };

//   render() {
//     let { char, loading, error } = this.state;
//     let contents = error ? <ErrorMessage /> : <View char={char} />;
//     contents = loading ? <Spinner /> : contents;
//     // console.log("render");
//     return (
//       <div className="randomchar">
//         {contents}
//         <div className="randomchar__static">
//           <p className="randomchar__title">
//             Random character for today!
//             <br />
//             Do you want to get to know him better?
//           </p>
//           <p className="randomchar__title">Or choose another one</p>
//           <button onClick={this.updateChar} className="button button__main">
//             <div className="inner">try it</div>
//           </button>
//           <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
//         </div>
//       </div>
//     );
//   }
// }

const View = ({ char }) => {
  let descrLen = 120,
    {
      thumbnail,
      name,
      description = "description is missing",
      homepage,
      wiki,
    } = char;

  let notImage = thumbnail.includes("image_not_available"),
    objectFit = notImage ? "contain" : "cover";

  description =
    description.length > descrLen
      ? description.slice(0, descrLen) + "..."
      : description;
  return (
    <div className="randomchar__block">
      <img
        style={{ objectFit: objectFit }}
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};
export default RandomChar;
