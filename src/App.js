import { BrowserRouter, Route, Switch } from "react-router-dom";
import TopNav from "./common/TopNav";
import Dashboard from "./components/deshboard/Dashboard";
import Home from "./components/home/Home";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CreateQuiz from "./components/quiz/createOrEditQuiz/CreateQuiz";
import EditQuiz from "./components/quiz/createOrEditQuiz/EditQuiz";
import { Container } from "reactstrap";
import UserContext from "./context/UserContext";
import { useState } from "react";

const loginUser = {
  id: 1,
  name: "Dorik",
  email: "user@dorik.com"
};

export default function App() {
  const [user, setUser] = useState(null);

  const login = () => setUser(loginUser);
  const logout = () => setUser(null);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, login, logout }}>
        <DndProvider backend={HTML5Backend}>
          <BrowserRouter>
            <TopNav />
            <Container>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/dashboard">
                  <Dashboard />
                </Route>
                <Route path={`/create`}>
                  <CreateQuiz />
                </Route>
                <Route path={`/edit/:id`} exact>
                  <EditQuiz />
                </Route>
              </Switch>
            </Container>
          </BrowserRouter>
        </DndProvider>
      </UserContext.Provider>
    </div>
  );
}
