import { useState } from "react";
const WithAuthentication = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return isAuthenticated;
};

export default WithAuthentication;
