import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export default function CreateAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [images, setImages] = useState<string[]>([""]);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username !== "admin") {
      navigate("/about");
      return;
    }
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching products");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title,
        price,
        description,
        categoryId,
        images: images.filter((url) => url.trim() !== ""),
      };

      if (payload.images.length === 0) {
        alert("Please provide at least one image URL");
        return;
      }

      const url = editingProductId
        ? `https://api.escuelajs.co/api/v1/products/${editingProductId}`
        : "https://api.escuelajs.co/api/v1/products";

      const method = editingProductId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Operation failed");
      }

      alert(
        `Product ${editingProductId ? "updated" : "created"} successfully!`
      );
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const res = await fetch(
        `https://api.escuelajs.co/api/v1/products/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete product");
      alert("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProductId(product.id);
    setTitle(product.title);
    setPrice(product.price);
    setDescription(product.description);
    setCategoryId(product.categoryId);
    setImages(product.images);
  };

  const resetForm = () => {
    setTitle("");
    setPrice(0);
    setDescription("");
    setCategoryId(1);
    setImages([""]);
    setEditingProductId(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {editingProductId ? "Edit Product" : "Create New Product"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full p-2 border rounded"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded h-32"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category ID</label>
          <input
            type="number"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="w-full p-2 border rounded"
            min="1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image URLs</label>
          {images.map((url, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="url"
                value={url}
                onChange={(e) => {
                  const newImages = [...images];
                  newImages[index] = e.target.value;
                  setImages(newImages);
                }}
                className="flex-1 p-2 border rounded"
                placeholder={`Image URL ${index + 1}`}
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setImages(images.filter((_, i) => i !== index))
                  }
                  className="px-3 bg-red-500 text-white rounded"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => setImages([...images, ""])}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Image URL
          </button>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {editingProductId ? "Update Product" : "Create Product"}
          </button>
          {editingProductId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <h2 className="text-xl font-bold mt-10 mb-4">Existing Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow bg-white">
            <img
              src={product.images[0] || "https://via.placeholder.com/300"}
              alt={product.title}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h3 className="text-lg font-semibold truncate">{product.title}</h3>
            <p className="text-gray-600">${product.price}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(product)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
