import { Button, Container, Flex, HStack, Text, useColorMode, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/api";

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const { isAuthenticated, setIsAuthenticated } = useAuth();
	const navigate = useNavigate();
	const toast = useToast();

	const handleLogout = async () => {
		try {
			await logoutUser();
			setIsAuthenticated(false);
			toast({
				title: "Logged out successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			navigate("/login");
		} catch (error) {
			toast({
				title: "Error logging out",
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Container maxW={"1140px"} px={4}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
				<Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
				>
					<Link to={"/"}>Product Store 🛒</Link>
				</Text>

				<HStack spacing={4} alignItems={"center"}>
					{isAuthenticated ? (
						<>
							<Link to={"/create"}>
								<Button>
									<PlusSquareIcon fontSize={20} />
								</Button>
							</Link>
							<Button onClick={handleLogout} colorScheme="red">
								Logout
							</Button>
						</>
					) : (
						<Link to={"/login"}>
							<Button colorScheme="blue">Login</Button>
						</Link>
					)}
					<Button onClick={toggleColorMode}>
						{colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
					</Button>
				</HStack>
			</Flex>
		</Container>
	);
};
export default Navbar;