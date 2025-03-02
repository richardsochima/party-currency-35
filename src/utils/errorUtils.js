
export const formatErrorMessage = (error) => {
  if (!error) return "";
  
  try {
    // If error is already a string, return it
    if (typeof error === "string") return error;
    
    // If error is an object (API response)
    if (typeof error === "object") {
      // Parse the error if it's a string representation of JSON
      const errorObj = typeof error === "string" ? JSON.parse(error) : error;
      
      // Return object as is to allow component-level error handling
      return errorObj;
    }
    
    return "An error occurred";
  } catch (e) {
    console.error("Error parsing error message:", e);
    return "An unexpected error occurred";
  }
};

// Helper function to check if we have field-specific errors
export const hasFieldErrors = (errors) => {
  if (!errors) return false;
  
  // Check if the error object has any specific field keys
  const fieldErrors = ['email', 'phone_number', 'password', 'first_name', 'last_name'];
  return fieldErrors.some(field => errors[field]);
};
