# Redux Toolkit Integration

This document describes the Redux Toolkit integration for state management in the StudySync frontend.

## Architecture

### State Management Structure

The application uses Redux Toolkit with the following slices:

1. **Auth Slice** (`src/store/slices/authSlice.js`)
   - Manages authentication state, user data, profile, and tokens
   - Handles login, register, logout, and profile operations
   - Persists tokens and user data to localStorage

2. **Groups Slice** (`src/store/slices/groupsSlice.js`)
   - Manages study groups data
   - Tracks joined groups and selected group

3. **Sessions Slice** (`src/store/slices/sessionsSlice.js`)
   - Manages study session data
   - Tracks selected session

### API Client

The application uses a centralized Axios client (`src/services/apiClient.js`) that:

- Automatically adds the Authorization header to all requests
- Handles token refresh on 401 responses
- Redirects to login when authentication fails

## Authentication Flow

### Registration (with Auto-Login)
1. User submits registration form
2. System calls `POST /api/auth/register/`
3. On success, automatically calls `POST /api/auth/login/`
4. Fetches user profile via `GET /api/profile/`
5. Stores tokens and user data in Redux store and localStorage
6. Redirects user to `/groups`

### Login
1. User submits login form
2. System calls `POST /api/auth/login/`
3. On success, fetches user profile via `GET /api/profile/`
4. Stores tokens and user data in Redux store and localStorage
5. Redirects user to `/groups`

### Token Refresh
1. When any API call returns 401 Unauthorized
2. Axios interceptor automatically attempts token refresh via `POST /api/auth/refresh/`
3. If successful, retries the original request with new token
4. If refresh fails, clears auth data and redirects to login

### Logout
1. User clicks logout button
2. Redux action clears all auth state
3. Removes tokens and user data from localStorage
4. Redirects user to home page

## LocalStorage Persistence

The following data is persisted in localStorage:

- `access_token`: JWT access token
- `refresh_token`: JWT refresh token
- `user`: User object (username, email)
- `profile`: User profile object

On app initialization, the auth state is automatically rehydrated from localStorage, allowing users to remain logged in across page refreshes.

## Usage Examples

### Using Auth State in Components

```javascript
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

function MyComponent() {
  const { user, profile, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>Welcome, {user.username}!</div>
      ) : (
        <div>Please log in</div>
      )}
    </div>
  );
}
```

### Making API Calls

```javascript
import apiClient from '../services/apiClient';

// GET request - Authorization header added automatically
const response = await apiClient.get('/api/groups/');

// POST request
const response = await apiClient.post('/api/groups/', data);
```

## Environment Variables

Set the following environment variable to configure the API base URL:

```
REACT_APP_API_URL=http://127.0.0.1:8000
```

If not set, defaults to `http://127.0.0.1:8000`.
