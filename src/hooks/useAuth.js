import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = "your-secret-key"; // Replace with a strong secret key

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
};

const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("authToken") || null);
  const [user, setUser] = useState(null);

  const login = (token) => {
    setToken(token);
    Cookies.set("authToken", token, { expires: 7 });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    Cookies.remove("authToken");
    localStorage.removeItem("user");
  };

  const fetchUser = async () => {
    if (token && !user) {
      try {
        const response = await fetch("https://backend.ptwpi.co.id/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.status}`);
        }

        const userData = await response.json();
        setUser(userData);
        const encryptedUserData = encryptData(userData);
        localStorage.setItem("user", encryptedUserData);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUser();
    };

    fetchData();
  }, [token]); // Only fetch user data when the token changes

  return (
    <AuthContext.Provider value={{ token, user, login, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
