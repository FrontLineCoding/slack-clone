import { Route, Switch, useHistory, useParams } from 'react-router-dom';
import NavBar from '../Nav/NavBar';
import Messages from '../Messages/Messages';
import './MainPage.css';
import { useEffect } from 'react';
import EditChannel from '../Channels/EditChannel';
import CreateChannelModal from '../Channels/CreateChannelModal';
import AuthNav from '../auth/AuthNav';
import Comments from '../Comments/Comments';

const MainPage = ({ user }) => {
  const history = useHistory();
  const { workspaceId } = useParams();
  useEffect(() => {
    if (!workspaceId) {
      history.push(
        `/${user.joined_workspaces[0].workspace.id}/${user.joined_workspaces[0].workspace.channels[0].id}`
      );
    }
  }, []);

  return (
    <>
      <AuthNav />
      <div className="main-page">
        <Switch>
          <Route path="/add-channel">
            <CreateChannelModal />
          </Route>
          <Route path="/edit-channel/:channelId">
            <EditChannel></EditChannel>
          </Route>
          <Route path="/:workspaceId/:channelId/:messageId">
            <NavBar
              joinedWorkspaces={user.joined_workspaces}
              ownedWorkspaces={user.owned_workspaces}
            ></NavBar>
            <Messages></Messages>
            <Comments></Comments>
          </Route>
          <Route path="/:workspaceId/:channelId">
            <NavBar
              joinedWorkspaces={user.joined_workspaces}
              ownedWorkspaces={user.owned_workspaces}
            >
              {' '}
            </NavBar>
            <Messages></Messages>
          </Route>
          <Route path="/">
            <NavBar
              joinedWorkspaces={user.joined_workspaces}
              ownedWorkspaces={user.owned_workspaces}
            ></NavBar>
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default MainPage;
