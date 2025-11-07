// Extract error message from API error response
export const getErrorMessage = (error) => {
  if (error.response) {
    // Server responded with error
    const data = error.response.data;
    
    if (typeof data === 'string') {
      return data;
    }
    
    if (data.message) {
      return data.message;
    }
    
    if (data.detail) {
      return data.detail;
    }
    
    if (data.error) {
      return data.error;
    }
    
    // Handle field-specific errors
    const fieldErrors = [];
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        fieldErrors.push(`${key}: ${data[key].join(', ')}`);
      } else if (typeof data[key] === 'string') {
        fieldErrors.push(`${key}: ${data[key]}`);
      }
    });
    
    if (fieldErrors.length > 0) {
      return fieldErrors.join('; ');
    }
    
    return `Error: ${error.response.status} ${error.response.statusText}`;
  } else if (error.request) {
    // Request was made but no response received
    return 'Network error. Please check your connection.';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred';
  }
};

// Handle async thunk errors
export const handleAsyncError = (error, rejectWithValue) => {
  const message = getErrorMessage(error);
  return rejectWithValue({ message });
};
