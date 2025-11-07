# StudySync Frontend - Redux Toolkit Architecture

React frontend for StudySync with Redux Toolkit state management, JWT authentication, and Material UI components.

## Features

- 🔐 JWT Authentication with auto-refresh
- 📦 Redux Toolkit for state management
- 🎨 Material UI components
- 🔄 Persistent login across page refreshes
- 🛡️ Protected routes
- 🎯 Modular feature-based architecture
- 📡 Axios with request/response interceptors

## Tech Stack

- React 19.2.0
- Redux Toolkit 2.10.1
- React Redux 9.2.0
- Material UI 7.3.4
- Axios 1.13.2
- React Router DOM 7.9.5

## Project Structure

```
src/
├── api/
│   └── apiClient.js          # Axios instance with interceptors
├── app/
│   └── store.js              # Redux store configuration
├── features/
│   ├── auth/
│   │   ├── authSlice.js      # Auth state & async thunks
│   │   └── authService.js    # Auth API calls
│   ├── groups/
│   │   ├── groupsSlice.js    # Groups state & async thunks
│   │   └── groupsService.js  # Groups API calls
│   └── sessions/
│       ├── sessionsSlice.js  # Sessions state & async thunks
│       └── sessionsService.js # Sessions API calls
├── pages/
│   ├── Auth/
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── Groups/
│   │   └── GroupsPage.jsx
│   └── Sessions/
│       └── SessionsPage.jsx
├── components/              # Reusable UI components
├── utils/
│   ├── constants.js        # API endpoints & constants
│   ├── errorHandler.js     # Error handling utilities
│   └── storage.js          # LocalStorage helpers
├── App.js                  # Main app with routing
└── index.js                # App entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Django backend running at http://localhost:8000

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd study-sync-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and set your backend URL:
```
REACT_APP_API_BASE_URL=http://localhost:8000/api
```

4. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

## Backend API Integration

The frontend integrates with a Django backend at the configured `REACT_APP_API_BASE_URL`.

### Authentication Endpoints

- `POST /auth/register/` - Register new user
- `POST /auth/login/` - Login (returns access + refresh tokens)
- `POST /auth/refresh/` - Refresh access token
- `GET /profile/` - Get user profile
- `PUT /profile/` - Update user profile

### Groups Endpoints

- `GET /groups/` - Get all groups (explore/discover)
- `GET /groups/my-groups/` - Get user's joined groups
- `GET /groups/my-admin-groups/` - Get user's admin groups
- `POST /groups/` - Create a new group
- `POST /groups/{id}/join/` - Join a group
- `POST /groups/{id}/leave/` - Leave a group

### Sessions Endpoints

- `GET /sessions/` - Get all sessions (supports params: group, status)
- `GET /sessions/{id}/` - Get session details
- `POST /sessions/` - Create a new session
- `DELETE /sessions/{id}/` - Delete a session (admin only)

## Authentication Flow

1. **Login/Register**: User submits credentials
2. **Token Storage**: Access and refresh tokens stored in localStorage
3. **Auto-attach**: Request interceptor adds `Authorization: Bearer <token>` to all requests
4. **Silent Refresh**: On 401 error, automatically attempts to refresh access token
5. **Persistence**: Auth state rehydrated from localStorage on page load

## Key Features

### Protected Routes
Routes like `/groups` are protected and redirect to `/login` if user is not authenticated.

### Groups Page
- **Explore Groups**: Shows groups user hasn't joined
- **My Groups**: Shows groups user has joined
- **Instant Update**: Joining a group immediately moves it from Explore to My Groups

### Error Handling
Centralized error handling extracts meaningful messages from API responses and displays them to users.

## Development Guidelines

### Adding a New Feature

1. Create feature directory: `src/features/myFeature/`
2. Add service file: `myFeatureService.js` (API calls)
3. Add slice file: `myFeatureSlice.js` (state + async thunks)
4. Add to store: `src/app/store.js`
5. Create page component: `src/pages/MyFeature/MyFeaturePage.jsx`
6. Add route in `App.js`

### State Management Pattern

```javascript
// 1. Service (API calls)
export const fetchItems = async () => {
  const response = await apiClient.get('/items/');
  return response.data;
};

// 2. Async Thunk
export const fetchItemsAction = createAsyncThunk(
  'items/fetchItems',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchItems();
    } catch (error) {
      return handleAsyncError(error, rejectWithValue);
    }
  }
);

// 3. Slice
const itemsSlice = createSlice({
  name: 'items',
  initialState: { items: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItemsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItemsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
```

## Troubleshooting

### Login doesn't persist after refresh
- Check if localStorage has `access_token` and `refresh_token`
- Verify `authSlice` initialState loads from localStorage
- Check browser console for errors

### API requests fail with 401
- Ensure backend is running at the configured URL
- Check if tokens are being sent in Authorization header
- Verify refresh token endpoint is working

### Protected routes not working
- Check `isAuthenticated` state in Redux DevTools
- Verify `App.js` uses `isAuthenticated` from auth state
- Ensure tokens exist in localStorage

## License

This project is part of the StudySync platform.
