import { createContext } from "react";

export default createContext({
  user: null,
  login: () => {},
  logout: () => {}
});
