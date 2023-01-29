import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from "../../resources/img/vision.png";

const App = () => {
  const [showRandomChar, setShowRandomChar] = useState(true);
  const [selectedChar, setSelectedChar] = useState(null);

  const onCharSelected = (id) => {
    setSelectedChar((selectedChar) => id);
  };

  const toggleRandomChar = () => {
    setShowRandomChar((showRandomChar) => !showRandomChar);
  };

  return (
    <div className="app">
      <AppHeader />
      <main>
        {showRandomChar ? (
          <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>
        ) : null}

        <button onClick={toggleRandomChar}>Click me</button>
        <div className="char__content">
          <CharList onCharSelected={onCharSelected} />
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision" />
      </main>
    </div>
  );
};
// class App extends Component {
//   state = {
//     showRandomChar: true,
//     selectedChar: null,
//   };

//   onCharSelected = (id) => {
//     this.setState({ selectedChar: id });
//   };
//   toggleRandomChar = () => {
//     this.setState((state) => {
//       return { showRandomChar: !state.showRandomChar };
//     });
//   };

//   render() {
//     return (
//       <div className="app">
//         <AppHeader />
//         <main>
//           {this.state.showRandomChar ? (
//             <ErrorBoundary>
//               <RandomChar />
//             </ErrorBoundary>
//           ) : null}

//           <button onClick={this.toggleRandomChar}>Click me</button>
//           <div className="char__content">
//             <CharList onCharSelected={this.onCharSelected} />
//             <ErrorBoundary>
//               <CharInfo charId={this.state.selectedChar} />
//             </ErrorBoundary>
//           </div>
//           <img className="bg-decoration" src={decoration} alt="vision" />
//         </main>
//       </div>
//     );
//   }
// }

export default App;
