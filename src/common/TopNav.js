import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Container,
} from "reactstrap";
import UserContext from "../context/UserContext";

const TopNav = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { user, login, logout } = useContext(UserContext);

	const toggle = () => setIsOpen(!isOpen);
	return (
		<Navbar color="light" light expand="md">
			<Container>
				<NavbarBrand href="/">QUIZ APP</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="ms-auto" navbar>
						<NavItem>
							<NavLink tag={Link} to={`/`}>
								Home
							</NavLink>
						</NavItem>
						{user && (
							<NavItem>
								<NavLink tag={Link} to={`/dashboard`}>
									Dashboard
								</NavLink>
							</NavItem>
						)}
						{!user && (
							<NavItem>
								<NavLink href="#" onClick={login}>
									Login
								</NavLink>
							</NavItem>
						)}
						{user && (
							<NavItem>
								<NavLink
									href="#"
									className="text-danger cursor-pointer"
									onClick={logout}
								>
									Logout
								</NavLink>
							</NavItem>
						)}
					</Nav>
				</Collapse>
			</Container>
		</Navbar>
	);
};

export default TopNav;
