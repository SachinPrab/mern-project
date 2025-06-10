import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useProductStore } from "../store/product"; // Make sure this path is correct
import ProductCard from "../components/ProductCard"; // Import your ProductCard component

const HomePage = () => {
	const { fetchProducts, products } = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	return (
		<Container maxW={"container.sm"} p={4}>
			<VStack spacing={8}>
				<Text
					fontSize={"30px"}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
					textAlign={"center"}
				>
					Current Products 🚀
				</Text>

				{products.length > 0 ? (
					<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={10} w={"full"}>
						{products.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
					</SimpleGrid>
				) : (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No Products Found 😢{" "}
						<Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a product
							</Text>
						</Link>
					</Text>
				)}
			</VStack>
		</Container>
	);
};

export default HomePage;
