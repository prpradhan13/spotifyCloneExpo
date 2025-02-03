# Welcome to Spotify Clone App 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Introduction

The Spotify Clone is a feature-rich mobile application that replicates the core functionalities of the popular music streaming platform, Spotify. This project leverages the Spotify Web API to fetch music data, integrates a custom backend for efficient data management, and delivers a seamless user experience through a visually appealing frontend built with Expo. The app not only allows users to explore and play songs but also enhances the listening experience with short video backgrounds synchronized to the music.

## Features
- **Music Streaming**
- **Multimedia Backgrounds**
- **Custom Backend Integration**
- **Interactive User Interface**
- **Seamless Playback**


## Get started

Let's start with the server of this application.

1. Clonning the server repository:

   ```bash
   git clone https://github.com/prpradhan13/spotifyCloneServer.git
   ```

2. Go to the server directory

   ```bash
   cd spotifyCloneServer
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

- [Get API informations](https://developer.spotify.com/documentation/web-api): Follow the documentation and get your own API details

4. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the following variables:
   ```

   PORT=8080
   CLIENT_ID=your_spotify_web_api_client_id
   CLIENT_SECRET=your_spotify_web_api_client_secret
   ```

5. Start the development server:

   ```bash
   npm run server
   ```

Now Let's set up our frontend part.

6. Clonning the frontend repository:

   ```bash
   git clone https://github.com/prpradhan13/spotifyCloneExpo.git
   ```

7. Go to the frontend directory

   ```bash
   cd spotifyCloneExpo
   ```

8. Install dependencies:

   ```bash
   npm install
   ```

9. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the following variables:
   ```

   EXPO_PUBLIC_API_URL:your_spotify_server_url
   ```

10. Start the development server:

   ```bash
   npm run start
   ```