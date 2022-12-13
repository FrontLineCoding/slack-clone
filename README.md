# Taut - A Slack Clone

Taut is a clone of the application Slack. "Slack is an instant messaging program designed by Slack Technologies and owned by Salesforce. Although Slack was developed for professional and organizational communications, it has been adopted as a community platform" - Slack

## Live Site
[Taut](https://taut-v2.onrender.com/)

## Technologies Used
 ###Front-End
 -Javascrapit
 -React
 -Redux
 
### Back-End
-Python
-Flask
-SQLAlchemy
-PostgreSQL

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

##Features

###Workspaces
-User can create Workspaces
-User can edit a Workspace name if proper credentials
-User can delete a Workspace if proper credentials
-User can see Workspaces they are a member of
![Workspace View](https://github.com/FrontLineCoding/slack-clone/blob/main/taut/WorkspaceView.JPG?raw=true)
![Workspace Edit](https://github.com/FrontLineCoding/slack-clone/blob/main/taut/WorkspaceEdit.JPG?raw=true)
![Workspace Delete](https://github.com/FrontLineCoding/slack-clone/blob/main/taut/WorkspaceDelete.JPG?raw=true)
![Workspace Create](https://github.com/FrontLineCoding/slack-clone/blob/main/taut/WorkspaceCreate.JPG?raw=true)

###Channels
-User can see channels in a workspace
-User can create channel in a workspace
-User can edit a channel's name if proper credentials
-User can delete a channel if proper credentials
![Channel Edit](https://github.com/FrontLineCoding/slack-clone/blob/main/taut/ChannelEdit.JPG?raw=true)
![Channel Add](https://github.com/FrontLineCoding/slack-clone/blob/main/taut/ChannelAdd.JPG?raw=true)

###ChannelMessages
-User can see messages in a channel
-User can create messages in a channel
-User can edit message in a channel if proper credentials
-User can delete message in a channel if proper credentials
![Message Create](https://github.com/FrontLineCoding/slack-clone/blob/main/taut/MessageCreate.JPG?raw=true)
![Message Edit](https://github.com/FrontLineCoding/slack-clone/blob/main/taut/MessageEdit.JPG?raw=true)
![Messsage View](https://github.com/FrontLineCoding/slack-clone/blob/main/taut/MessageGet.JPG?raw=true)
