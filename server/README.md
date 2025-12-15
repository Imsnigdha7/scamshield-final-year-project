# ScamShield Backend

This folder contains the backend implementation of the **ScamShield** final year project.
The backend is responsible for handling server-side logic, data storage, and API services
used by the frontend application.

---

## Purpose of Backend

The backend provides:
- API endpoints for managing user data
- API endpoints for storing and retrieving scam reports
- Data handling using JSON files
- Communication support for the frontend

---

## Technologies Used

- Node.js
- Express.js
- REST API
- JSON (for data storage)

---

## Folder Contents

| File Name       | Description |
|-----------------|------------|
| `server.js`     | Main server file that defines API routes and server logic |
| `users.json`    | Stores user-related data |
| `stories.json`  | Stores scam reports and user-submitted experiences |
| `package.json`  | Backend dependencies and configuration |
| `package-lock.json` | Dependency lock file |

---

## How It Works

1. The server runs on Node.js using Express.
2. API routes are defined in `server.js`.
3. Data is read from and written to JSON files.
4. The frontend sends HTTP requests to the backend APIs.
5. The backend processes requests and sends responses back to the frontend.

---

## Future Enhancements

- Replace JSON file storage with a database (MongoDB / MySQL)
- Add authentication and authorization
- Implement advanced scam detection using NLP
- Improve error handling and security

---

## Academic Note

This backend is developed as part of a **Final Year B.Tech Computer Science project**.
The implementation focuses on clarity, simplicity, and understanding of full-stack
development concepts.

