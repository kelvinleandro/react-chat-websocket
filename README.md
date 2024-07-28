# SocketGram

SocketGram is a real-time chat application that allows users to join rooms by providing their username and room name. The project leverages modern web technologies to deliver a smooth and responsive chat experience.

## Preview

<image src="login.png" alt="login preview" width="45%" /> <image src="chat.png" alt="chat preview" width="45%" />

## Features

- **Real-time messaging**
- **Room-based chat**
- **User-friendly interface**

## Technologies Used

### Frontend

- **Framework**: Vite (React + TypeScript)
- **Styling**: Tailwind CSS

### Backend

- **Server**: Node.js
- **Framework**: Express
- **Real-time Communication**: Socket.IO
- **Cross-Origin Resource Sharing**: CORS

## Environment Configuration

### Server

In the `server` folder, there is a `.env` file where you can set the following variables:

- `PORT`: The port on which the server will run (default is `3001`).

- `CORS_ORIGIN`: The origin allowed by CORS (default is `http://localhost:5173`).

### Client

In the `client` folder, there is a `.env.local` file where you can set the following variables:

- `PORT`: The port where the server is running (default is `3001`).
- `VITE_SERVER_URL`: The URL of the server if it is deployed somewhere other than the local machine (default is `http://localhost:3001`).

## Setup and Installation

### Installation steps

1. Clone the repository
    ```bash
    git clone https://github.com/kelvinleandro/react-chat-websocket.git
    cd react-chat-websocket
    ```

2. Install dependencies for the frontend
    ```bash
    cd client
    npm install
    ```

2. Install dependencies for the backend
    ```bash
    cd ../server
    npm install
    ```

### Running the Application

1. Start the backend server
    ```bash
    cd server
    npm start
    ```
    The server will start on `http://localhost:3001`.

2. Start the frontend development server
    ```bash
    cd ../client
    npm run dev
    ```
    The frontend will start on `http://localhost:5173`.

## Usage

1. Open your browser and navigate to http://localhost:5173.
2. Enter a username and room name to join a chat room.
3. Start chatting in real-time!