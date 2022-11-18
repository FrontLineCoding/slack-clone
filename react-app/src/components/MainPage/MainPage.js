import { Route, Switch } from "react-router-dom";
import NavBar from "../Nav/NavBar";
import "./MainPage.css";


const MainPage = () => {
    return (
        <div className="main-page">
            <Switch>
                <Route path="/">
                    <NavBar></NavBar>
                </Route>
                <Route path="/servers/:serverId/channels/:channelId">
                    <NavBar></NavBar>
                </Route>
            </Switch>
        </div>
    )

}

export default MainPage;
