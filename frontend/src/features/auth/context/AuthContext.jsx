import { createContext, useContext, useEffect, useState } from "react";

import {
  INITIAL_DOCTORS,
  INITIAL_APPOINTMENTS,
  INITIAL_USERS,
} from "../../../data/initialData";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [doctors, setDoctors] = useState(() => {
    const savedDoctors = localStorage.getItem("doctors");
    return savedDoctors ? JSON.parse(savedDoctors) : INITIAL_DOCTORS;
  });

  const [appointments, setAppointments] = useState(() => {
    const savedAppointments = localStorage.getItem("appointments");
    return savedAppointments
      ? JSON.parse(savedAppointments)
      : INITIAL_APPOINTMENTS;
  });

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : INITIAL_USERS;
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("doctors", JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const login = (email, password) => {
    const existingUser = users.find(
      (currentUser) => currentUser.email === email
    );

    if (existingUser) {
      setUser(existingUser);
      showToast("Login successful");
      return existingUser;
    }

    let role = "patient";

    if (email.toLowerCase().includes("admin")) {
      role = "admin";
    } else if (email.toLowerCase().includes("doctor")) {
      role = "doctor";
    }

    const newUser = {
      id: Date.now(),
      name: email.split("@")[0],
      email,
      role,
    };

    setUsers((previousUsers) => [...previousUsers, newUser]);
    setUser(newUser);
    showToast("Login successful");

    return newUser;
  };

  const register = (name, email, password) => {
    const existingUser = users.find(
      (currentUser) => currentUser.email === email
    );

    if (existingUser) {
      showToast("User already exists", "error");
      return null;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      role: "patient",
    };

    setUsers((previousUsers) => [...previousUsers, newUser]);
    setUser(newUser);

    showToast("Registration successful");

    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    showToast("Logged out successfully");
  };

  const bookAppointment = (appointmentData) => {
    const newAppointment = {
      id: Date.now(),
      status: "pending",
      ...appointmentData,
    };

    setAppointments((previousAppointments) => [
      ...previousAppointments,
      newAppointment,
    ]);

    showToast("Appointment booked successfully");

    return newAppointment;
  };

  const updateAppointmentStatus = (appointmentId, status) => {
    setAppointments((previousAppointments) =>
      previousAppointments.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status }
          : appointment
      )
    );

    showToast("Appointment status updated");
  };

  const cancelAppointment = (appointmentId) => {
    setAppointments((previousAppointments) =>
      previousAppointments.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status: "cancelled" }
          : appointment
      )
    );

    showToast("Appointment cancelled");
  };

  const addDoctor = (doctorData) => {
    const newDoctor = {
      id: Date.now(),
      ...doctorData,
    };

    setDoctors((previousDoctors) => [...previousDoctors, newDoctor]);

    showToast("Doctor added successfully");

    return newDoctor;
  };

  const updateDoctor = (doctorId, updatedData) => {
    setDoctors((previousDoctors) =>
      previousDoctors.map((doctor) =>
        doctor.id === doctorId
          ? { ...doctor, ...updatedData }
          : doctor
      )
    );

    showToast("Doctor updated successfully");
  };

  const deleteDoctor = (doctorId) => {
    setDoctors((previousDoctors) =>
      previousDoctors.filter((doctor) => doctor.id !== doctorId)
    );

    showToast("Doctor deleted successfully");
  };

  const value = {
    user,
    doctors,
    appointments,
    users,
    toast,

    login,
    register,
    logout,

    bookAppointment,
    updateAppointmentStatus,
    cancelAppointment,

    addDoctor,
    updateDoctor,
    deleteDoctor,

    showToast,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}