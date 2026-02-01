import { createUser, getUserById, deleteUser } from '../services/userService.js';
import { validateUserCreate } from '../utils/validation.js';

export async function handleUsersRoutes(req, res) {
  const { method, url } = req;

  // Helper to send JSON response
  const sendJSON = (statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  // Helper to parse JSON body
  const parseBody = () => {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          resolve(body ? JSON.parse(body) : {});
        } catch (error) {
          reject(error);
        }
      });
      req.on('error', (err) => reject(err));
    });
  };

  try {
    // POST /users
    if (method === 'POST' && url === '/users') {
      try {
        const body = await parseBody();
        validateUserCreate(body);
        const user = createUser(body);
        sendJSON(201, user);
      } catch (error) {
        if (error.message.includes('required') || error.message.includes('Invalid') || error.message.includes('missing')) {
          sendJSON(400, { error: error.message });
        } else {
            console.error(error);
          sendJSON(500, { error: 'Internal Server Error' });
        }
      }
      return;
    }

    // GET /users/:id
    const getUserRegex = /^\/users\/([a-zA-Z0-9-]+)$/;
    const match = url.match(getUserRegex);

    if (method === 'GET' && match) {
      const id = match[1];
      const user = getUserById(id);
      
      if (user) {
        sendJSON(200, user);
      } else {
        sendJSON(404, { error: 'User not found' });
      }
      return;
    }

    // DELETE /users/:id
    if (method === 'DELETE' && match) {
      const id = match[1];
      const deleted = deleteUser(id);
      
      if (deleted) {
        sendJSON(204, null);
      } else {
        sendJSON(404, { error: 'User not found' });
      }
      return;
    }

    // Route not handled here
    return false; // Signal that this handler didn't handle the request

  } catch (err) {
    console.error(err);
    sendJSON(500, { error: 'Internal Server Error' });
    return true; // We handled the error response
  }
}
