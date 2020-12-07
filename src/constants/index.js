export const LocalStorage = {
  Token: "",
  Device: "",
  Firebase: "",
};

export const endpoint = "https://5e89a6bbb4252f0016a62002.mockapi.io/";
export const endpointlocal = "http://localhost:4000";

export const config = {
  host: process.env.HOST || "localhost",
};

export const userRole = [
  {
    role: "USER",
    id: 0,
  },
  {
    role: "MANAGERMENT",
    id: 1,
  },
  {
    role: "ADMIN",
    id: 2,
  },
];
