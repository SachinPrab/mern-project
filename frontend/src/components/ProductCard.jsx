import {
	Box,
	Heading,
	Image,
	Text,
	HStack,
	IconButton,
	useColorModeValue,
	useToast,
	Button,
	Input,
	VStack,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalCloseButton,
	useDisclosure,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const deleteProduct = useProductStore((state) => state.deleteProduct);
	const updateProduct = useProductStore((state) => state.updateProduct); // Add this if needed

	const [updatedProduct, setUpdatedProduct] = useState({
		name: product.name,
		price: product.price,
		image: product.image,
	});

	const handleDelete = async (pid) => {
		const { success, message } = await deleteProduct(pid);

		toast({
			title: success ? "Success" : "Error",
			description: message,
			status: success ? "success" : "error",
			duration: 3000,
			isClosable: true,
		});
	};

	const handleUpdateProduct = async (pid, data) => {
		const { success, message } = await updateProduct(pid, data);

		toast({
			title: success ? "Updated" : "Error",
			description: message,
			status: success ? "success" : "error",
			duration: 3000,
			isClosable: true,
		});

		if (success) {
			onClose();
		}
	};

	return (
		<Box
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{
				transform: "translateY(-5px)",
				shadow: "xl",
			}}
			bg={bg}
		>
			<Image src={product.image} alt={product.name} objectFit='cover' w='full' h={48} />
			<Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					{product.name}
				</Heading>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					${product.price}
				</Text>

				<HStack spacing={2}>
					<IconButton
						icon={<EditIcon />}
						aria-label='Edit Product'
						onClick={onOpen}
						colorScheme='blue'
					/>
					<IconButton
						icon={<DeleteIcon />}
						aria-label='Delete Product'
						onClick={() => handleDelete(product._id)}
						colorScheme='red'
					/>
				</HStack>
			</Box>

			{/* Modal */}
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Update Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Product Name'
								value={updatedProduct.name}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							/>
							<Input
								placeholder='Price'
								type='number'
								value={updatedProduct.price}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
							/>
							<Input
								placeholder='Image URL'
								value={updatedProduct.image}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateProduct(product._id, updatedProduct)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default ProductCard;
