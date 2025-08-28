I have done this project using local Postgres Database, the users table is initially created by the project itself, run the project once and make sure users table is created in the database, then come back and run all these queries below in the postgres database (to add columns). P.S: I haven't used styles yet, so, the project's UI may look basic and unstructured, but the working is perfect.

CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  assigned_to INT REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE token_blacklist (
    id SERIAL PRIMARY KEY,
    token TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL
);

CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    check_in TIMESTAMP,
    check_out TIMESTAMP,
    status VARCHAR(50) DEFAULT 'Present',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE leave_requests (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create a table for private messages
CREATE TABLE private_messages (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER NOT NULL,
  receiver_id INTEGER NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE group_chat_messages (
  id SERIAL PRIMARY KEY,
  department TEXT NOT NULL,
  sender_id INTEGER NOT NULL,
  sender_name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE users
ADD COLUMN department TEXT;

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);
store some random departments in department table

ALTER TABLE users
   ADD COLUMN access_rights JSONB DEFAULT '{"private_chat": true, "leave_request": true, "group_chat": true}';

ALTER TABLE tasks
ADD COLUMN department VARCHAR(50);

--------------------------------------------------------------
Do "npm install" in both frontend and backend, and the project should run without any issue. 

Optionally, use these commands to install required packages if any error occurs.
cd backend
npm init -y
npm install express cors dotenv pg bcryptjs jsonwebtoken
npm install --save-dev nodemon
npm install socket.io
npm install pdfkit

cd frontend
npm install vite@4.4
npm install socket.io-client
---------------------------------------------------------------
After all setup, run using the command, "npm run dev" in both frontend and backend.

If any error occurs regarding to the "dev keyword", then ensure your package.json has been setup with nodemon like this in the error occurring directory. 

package.json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "src/server.js",
  "type": "module",
  "scripts": {
    "start": "node src/server.js", // 
    "dev": "nodemon src/server.js" //
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "pg": "^8.11.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}

--------------------------------------------------------------
