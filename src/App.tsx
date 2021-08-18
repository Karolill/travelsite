import Header from "./components/header";
import { ReactComponent as Blob1 } from "./resources/blob1.svg";
import { ReactComponent as Blob2 } from "./resources/blob2.svg";
import { ReactComponent as Blob3 } from "./resources/blob3.svg";
import "./styling/app.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <div id="blobs">
        <div className="blob">
          <Blob1 />
        </div>
        <div className="blob">
          <Blob2 />
        </div>
        <div className="blob">
          <Blob3 />
        </div>
      </div>
    </div>
  );
};

export default App;
