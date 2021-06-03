import React, { Fragment, useState } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import TopNav from "./common/TopNav";
import Dashboard from "./components/deshboard/Dashboard";
import Home from "./components/home/Home";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CreateQuiz from "./components/quiz/createOrEditQuiz/CreateQuiz";
import EditQuiz from "./components/quiz/createOrEditQuiz/EditQuiz";
import { Button, Card, CardBody, Container } from "reactstrap";
import UserContext from "./context/UserContext";
import ViewQuiz from "./components/quiz/ViewQuiz";
import { ToastContainer } from "react-toastify";
import QuizVisitors from "./components/quiz/QuizVisitors";

const loginUser = {
	id: 1,
	name: "Dorik",
	email: "user@dorik.com",
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
						<Container className="pt-4">
							<Switch>
								<Route exact path="/">
									<Home />
								</Route>
								<Route path={`/view/:id`} exact>
									<ViewQuiz />
								</Route>
								{user && (
									<Fragment>
										<Route path="/dashboard">
											<Dashboard />
										</Route>
										<Route path={`/create`}>
											<CreateQuiz />
										</Route>
										<Route path={`/edit/:id`} exact>
											<EditQuiz />
										</Route>
										<Route path={`/visitors/:id`} exact>
											<QuizVisitors />
										</Route>
									</Fragment>
								)}
								<Route>
									<Card className="shadow">
										<CardBody className="text-center py-5">
											<h1 className="mb-3">No Page Found</h1>
											<Button tag={Link} to={`/`} color="link">
												Back To Home
											</Button>
										</CardBody>
									</Card>
								</Route>
							</Switch>
						</Container>
					</BrowserRouter>
					<ToastContainer
						closeButton={false}
						position="top-right"
						hideProgressBar={true}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						draggable
						pauseOnHover
					/>
				</DndProvider>
			</UserContext.Provider>
		</div>
	);
}
