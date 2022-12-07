import { Route, Switch } from "react-router-dom";
import NavBar from "../Nav/NavBar";
import Messages from "../Messages/Messages";
import "./MainPage.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getJoinedWorkspaces, getOwnedWorkspaces, getWorkspaces } from "../../store/workspace";
import CreateChannel from "../Channels/CreateChannel";
import EditChannel from "../Channels/EditChannel";
import CreateChannelModal from "../Channels/CreateChannelModal";

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
                <Route path='/add-channel'>
                    {/* <CreateChannel></CreateChannel> */}
                    <CreateChannelModal />
                </Route>
                <Route path='/edit-channel/:channelId'>
                    <EditChannel></EditChannel>
                </Route>
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
