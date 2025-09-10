# gRPC Restaurant Management System with MongoDB

This project demonstrates a full-stack application using gRPC for communication between client and server, with MongoDB as the database.

## Project Structure

```
restaurant/
├── server/
│   └── server.js          # gRPC server with MongoDB connection
├── client/
│   ├── client.js          # gRPC client
│   ├── index.js           # Express web server
│   └── views/
│       └── menu.hbs       # Handlebars template
├── models/
│   └── Menu.js            # Mongoose model
├── restaurant.proto       # Protocol Buffer definition
├── package.json
├── .env                   # Environment variables
└── README.md
```

## Features

- **CRUD Operations**: Create, Read, Update, Delete menu items
- **gRPC Communication**: Client-server communication using gRPC
- **MongoDB Integration**: Data persistence using MongoDB
- **Web Interface**: User-friendly web interface using Bootstrap
- **Real-time Updates**: Changes reflected immediately in the database

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. MongoDB Setup

1. Create a MongoDB account at [mongodb.com](https://mongodb.com)
2. Create a new cluster
3. Get your connection string
4. Update the `.env` file with your MongoDB URI:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/restaurant?retryWrites=true&w=majority
PORT=30043
CLIENT_PORT=3000
```

### 3. Run the Application

#### Terminal 1 - Start gRPC Server:

```bash
npm start
```

#### Terminal 2 - Start Web Client:

```bash
npm run client
```

### 4. Access the Application

Open your web browser and go to: `http://localhost:3000`

## API Endpoints

### gRPC Service Methods

- `GetAllMenu()` - Retrieve all menu items
- `Get(MenuId)` - Get a specific menu item
- `Insert(MenuItem)` - Create a new menu item
- `Update(MenuItem)` - Update an existing menu item
- `Remove(MenuId)` - Delete a menu item

### REST API Endpoints (Web Client)

- `GET /` - Display all menu items
- `POST /save` - Create new menu item
- `POST /update` - Update menu item
- `POST /remove` - Delete menu item

## Database Schema

```javascript
{
  name: String (required),
  price: Number (required, minimum: 0),
  createdAt: Date,
  updatedAt: Date
}
```

## Technologies Used

- **Backend**: Node.js, gRPC, MongoDB, Mongoose
- **Frontend**: Express.js, Handlebars, Bootstrap
- **Communication**: Protocol Buffers (protobuf)
- **Database**: MongoDB Atlas

## Assignment Demonstration

For the assignment, you need to demonstrate:

1. **Add Operation**: Create a new menu item through the web interface
2. **Update Operation**: Edit an existing menu item
3. **Delete Operation**: Remove a menu item
4. **Database Verification**: Show the changes in your MongoDB database

### Recording Requirements

- Screen recording showing all CRUD operations
- Database changes visible in MongoDB Atlas/Compass
- Duration: Less than 5 minutes

### Alternative (Screenshots)

If screen recording isn't possible, capture:

- Adding data via web + database confirmation
- Updating data via web + database confirmation
- Deleting data via web + remaining database data
- Model code (`models/Menu.js`)
- Environment file (`.env`) with connection string
- Server code (`server/server.js`) with database integration

## Troubleshooting

1. **MongoDB Connection Issues**:

   - Check your connection string in `.env`
   - Ensure your IP is whitelisted in MongoDB Atlas
   - Verify username/password are correct

2. **gRPC Connection Issues**:

   - Ensure the server is running on port 30043
   - Check firewall settings
   - Verify proto file is correctly loaded

3. **Port Conflicts**:
   - Change ports in `.env` file if needed
   - Ensure no other services are using the same ports

## Notes

- The server uses async/await for MongoDB operations
- Error handling is implemented for all database operations
- The web interface provides real-time feedback for all operations
- MongoDB ObjectIds are converted to strings for gRPC compatibility
