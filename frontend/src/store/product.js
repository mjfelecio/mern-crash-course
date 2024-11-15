// imports a simple state management library that we can use to manage the state of our program
import { create } from "zustand";

/*
	The file that will communicate with the api endpoints from the backend.
	This will transport data from the backend to the frontend. 
*/

// "create" function transforms the functions inside into states that our application can use
// States are something that manages each component of our application
// In react, states are defined as const [count, setCount] = useState(0); 
// where count is the variable and setCount is the function used to update that variable
export const useProductStore = create((set) => ({
	// the state / variable that contains our products
	products: [],
	// these functions are what we use to update that state
	setProducts: (products) => set({ products }),
	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newProduct),
		});
		const data = await res.json();
		
		// copies the array and adds the new product to it; states are immutable
		set((state) => ({ products: [...state.products, data.data] }));
		return { success: true, message: "Product created successfully" };
	},
	fetchProducts: async () => {
		const res = await fetch("/api/products");
		const data = await res.json();
		set({ products: data.data });
	},
	deleteProduct: async (pid) => {
		const res = await fetch(`/api/products/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		// and delete the product that matches the product id that was given
		set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
		return { success: true, message: data.message };
	},
	updateProduct: async (pid, updatedProduct) => {
		const res = await fetch(`/api/products/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProduct),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		// and updates the information of the product that matches the product id
		set((state) => ({
			products: state.products.map((product) => (product._id === pid ? data.data : product)),
		}));

		return { success: true, message: data.message };
	},
}));