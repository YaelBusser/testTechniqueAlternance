import {Home} from "./components/Home/Home";
import {MesCitations} from "./components/MesCitations/MesCitations";
function App() {
    return (
        <div className="home">
            <Home></Home>
            <hr/>
            <MesCitations></MesCitations>
        </div>
    );
}

export default App;