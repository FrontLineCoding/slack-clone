import { Route, Switch } from "react-router-dom";
import NavBar from "../Nav/NavBar";
import Messages from "../Messages/Messages";
import "./MainPage.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getJoinedWorkspaces, getOwnedWorkspaces, getWorkspaces } from "../../store/workspace";


const MainPage = () => {
    const dispatch = useDispatch();

//   useEffect(async () => {
//     await dispatch(getWorkspaces());
//     await dispatch(getJoinedWorkspaces());
//     await dispatch(getOwnedWorkspaces());
//   }, [dispatch]);


    return (
        <div className="main-page">
            <Switch>
                <Route path="/:workspaceId/:channelId">
                    <NavBar></NavBar>
                    <Messages></Messages>
                </Route>
                <Route path="/">
                    <NavBar></NavBar>
                </Route>
            </Switch>
        </div>
    )

}

export default MainPage;
