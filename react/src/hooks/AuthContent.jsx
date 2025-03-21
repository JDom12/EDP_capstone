import React, { createContext, useContext, useState, useEffect } from "react";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    // call backend API
    const login = async (emp_id, password) => {
        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ emp_id, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setUser({
                    emp_id: data.emp_id,
                    role: data.role,
                    manages: data.manages,
                });
            console.log("User ID:", data.emp_id);
            console.log("Role:", data.role);
            console.log("Manages:", data.manages.length > 0 ? data.manages : "No direct reports");
            } else {
                throw new Error(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
