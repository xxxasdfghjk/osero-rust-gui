import "./App.css";
import OseroPage from "./component/organisms/OseroPage";
import { RecoilRoot } from "recoil";

function App() {
    return (
        <div className="container">
            <RecoilRoot>
                <OseroPage></OseroPage>
            </RecoilRoot>
        </div>
    );
}

export default App;
