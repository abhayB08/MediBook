import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

const DEMO_USERS = [
  {
    id: "patient-001",
    name: "Abhay Bhadka",
    email: "patient@medibook.demo",
    password: "patient123",
    role: "patient",
    phone: "+91 98765 43210",
    age: 20,
  },
  {
    id: "doctor-001",
    name: "Dr. Amit Patel",
    email: "amit@medibook.demo",
    password: "doctor123",
    role: "doctor",
    phone: "+91 98765 10001",
  },
  {
    id: "doctor-002",
    name: "Dr. Neha Shah",
    email: "neha@medibook.demo",
    password: "doctor123",
    role: "doctor",
    phone: "+91 98765 10002",
  },
  {
    id: "doctor-003",
    name: "Dr. Rahul Mehta",
    email: "rahul@medibook.demo",
    password: "doctor123",
    role: "doctor",
    phone: "+91 98765 10003",
  },
  {
    id: "doctor-004",
    name: "Dr. Priya Desai",
    email: "priya@medibook.demo",
    password: "doctor123",
    role: "doctor",
    phone: "+91 98765 10004",
  },
  {
    id: "doctor-005",
    name: "Dr. Karan Joshi",
    email: "karan@medibook.demo",
    password: "doctor123",
    role: "doctor",
    phone: "+91 98765 10005",
  },
  {
    id: "doctor-006",
    name: "Dr. Riya Mehta",
    email: "riya@medibook.demo",
    password: "doctor123",
    role: "doctor",
    phone: "+91 98765 10006",
  },
];

function getStoredUsers() {
  try {
    return JSON.parse(localStorage.getItem("medibook_users") || "[]");
  } catch {
    return [];
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("medibook_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("medibook_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("medibook_user");
    }
  }, [user]);

  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();

    const allUsers = [...DEMO_USERS, ...getStoredUsers()];

    const foundUser = allUsers.find(
      (item) =>
        item.email.toLowerCase() === normalizedEmail &&
        item.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        ok: false,
        message: "Invalid email or password.",
      };
    }

    const loggedInUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
      phone: foundUser.phone || "",
      age: foundUser.age || "",
    };

    setUser(loggedInUser);

    return {
      success: true,
      ok: true,
      user: loggedInUser,
    };
  };

  const register = (userData) => {
    const name = userData.name.trim();
    const email = userData.email.trim().toLowerCase();
    const phone = userData.phone.trim();
    const age = userData.age;
    const password = userData.password;

    if (!name || !email || !phone || !age || !password) {
      return {
        success: false,
        ok: false,
        message: "Please fill in all fields.",
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        ok: false,
        message: "Password must contain at least 6 characters.",
      };
    }

    const storedUsers = getStoredUsers();
    const emailExists = [...DEMO_USERS, ...storedUsers].some(
      (item) => item.email.toLowerCase() === email
    );

    if (emailExists) {
      return {
        success: false,
        ok: false,
        message: "An account with this email already exists.",
      };
    }

    const newUser = {
      id: `patient-${Date.now()}`,
      name,
      email,
      password,
      role: "patient",
      phone,
      age: Number(age),
    };

    localStorage.setItem(
      "medibook_users",
      JSON.stringify([...storedUsers, newUser])
    );

    const loggedInUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      phone: newUser.phone,
      age: newUser.age,
    };

    setUser(loggedInUser);

    return {
      success: true,
      ok: true,
      user: loggedInUser,
    };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}
