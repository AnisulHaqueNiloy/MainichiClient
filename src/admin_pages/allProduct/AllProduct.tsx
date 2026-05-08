import { useState } from "react";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "@/redux/features/admin/products";

import { Edit, Trash2, Plus, Package } from "lucide-react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ProductList = () => {
  // ✅ PAGINATION STATE
  const [page, setPage] = useState(1);
  const limit = 10;

  // ✅ API CALL WITH PAGE + LIMIT
  const { data, isLoading, isError } = useGetProductsQuery({
    page,
    limit,
  });

  const [deleteProduct] = useDeleteProductMutation();

  // ✅ DATA
  const products = ((data as any)?.data as any[]) || [];

  const totalCount = (data as any)?.meta?.totalCount || 0;

  const totalPages = (data as any)?.meta?.totalPages || 1;

  // ✅ DELETE HANDLER
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1F5E3B",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "rounded-[32px]",
        confirmButton: "rounded-xl px-6 py-3",
        cancelButton: "rounded-xl px-6 py-3",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(id).unwrap();

          Swal.fire({
            title: "Deleted!",
            text: "Product has been removed.",
            icon: "success",
            confirmButtonColor: "#1F5E3B",
            customClass: {
              popup: "rounded-[32px]",
            },
          });
        } catch (err: any) {
          toast.error(err?.data?.message || "Failed to delete product");
        }
      }
    });
  };

  // ✅ LOADING
  if (isLoading)
    return (
      <div className="flex justify-center p-20">
        <span className="loading loading-spinner loading-lg text-[#1F5E3B]"></span>
      </div>
    );

  // ✅ ERROR
  if (isError)
    return (
      <div className="p-20 text-center text-red-500 font-bold">
        Error loading products!
      </div>
    );

  return (
    <div className="p-4 lg:p-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-[#1A2E1A] flex items-center gap-2">
            <Package className="text-[#1F5E3B]" />
            ALL PRODUCTS
          </h1>

          <p className="text-sm text-gray-500 font-medium tracking-tight">
            Inventory & Marketplace Control Center
          </p>
        </div>

        <Link
          to="/admin/add-product"
          className="btn bg-[#1F5E3B] hover:bg-[#164129] text-white border-none rounded-2xl px-6 shadow-lg shadow-green-100 transition-all active:scale-95"
        >
          <Plus size={20} />
          Add New Product
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-green-50 text-[#1F5E3B] rounded-2xl">
            <Package size={24} />
          </div>

          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Total Inventory
            </p>

            <p className="text-2xl font-black text-gray-800 tracking-tighter">
              {totalCount} Items
            </p>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full border-separate border-spacing-0">
            <thead className="bg-[#F8FAF8]">
              <tr className="border-none text-gray-400 font-black text-[10px] uppercase tracking-[0.15em]">
                <th className="py-6 pl-10">Product Details</th>
                <th>Category</th>
                <th>Pricing</th>
                <th>Availability</th>
                <th className="text-center pr-10">Management</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {products.map((product: any) => (
                <tr
                  key={product._id}
                  className="group hover:bg-green-50/40 transition-all duration-300"
                >
                  <td className="py-5 pl-10">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-14 h-14 bg-gray-50">
                          <img
                            src={`${import.meta.env.VITE_API_URL}${product.images?.[0]}`}
                            alt={product.title}
                            className="object-cover"
                            onError={(e) =>
                              (e.currentTarget.src =
                                "https://via.placeholder.com/150")
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <div className="font-black text-sm text-[#1A2E1A]">
                          {product.title}
                        </div>

                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                          ID: {product._id?.slice(-6)}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="badge bg-gray-50 border-none font-bold text-[10px] text-gray-500 py-3.5 px-4 rounded-xl uppercase tracking-wider">
                      {product.category?.title || "N/A"}
                    </span>
                  </td>

                  <td>
                    <div className="font-black text-[#1A2E1A]">
                      ¥{product.price?.toLocaleString()}
                    </div>
                  </td>

                  <td>
                    <div className="flex flex-col gap-1">
                      {product.stock === "available" ? (
                        <span className="text-[10px] font-black text-green-600 uppercase">
                          Instock
                        </span>
                      ) : (
                        <span className="text-[10px] font-black text-red-400 uppercase">
                          Sold Out
                        </span>
                      )}

                      <span className="text-[10px] font-bold text-gray-300 italic">
                        {product.stockQuantity || 0} units left
                      </span>
                    </div>
                  </td>

                  <td className="pr-10">
                    <div className="flex items-center justify-center gap-3">
                      <Link
                        to={`/admin/edit-product/${product._id}`}
                        className="p-2.5 bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-blue-500 rounded-2xl transition-all shadow-sm"
                      >
                        <Edit size={16} />
                      </Link>

                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2.5 bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all shadow-sm"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EMPTY */}
        {products.length === 0 && (
          <div className="p-24 text-center">
            <Package size={48} className="mx-auto text-gray-200 mb-4" />

            <h3 className="text-xl font-black text-gray-800 tracking-tight">
              No Products Found
            </h3>

            <p className="text-sm text-gray-400 mt-1 mb-8">
              Your inventory is currently empty.
            </p>
          </div>
        )}

        {/* PAGINATION */}
        <div className="p-8 bg-[#F8FAF8]/50 flex items-center justify-between border-t border-gray-50">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
            Page {page} of {totalPages}
          </p>

          <div className="flex items-center gap-2">
            {/* PREV */}
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className={`h-10 px-4 rounded-xl border transition-all ${
                page === 1
                  ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                  : "bg-white hover:bg-[#1F5E3B] hover:text-white"
              }`}
            >
              Prev
            </button>

            {/* PAGE NUMBERS */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`h-10 w-10 rounded-xl border text-sm font-bold transition-all ${
                  page === p
                    ? "bg-[#1F5E3B] text-white border-[#1F5E3B]"
                    : "bg-white hover:bg-[#1F5E3B] hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}

            {/* NEXT */}
            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className={`h-10 px-4 rounded-xl border transition-all ${
                page === totalPages
                  ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                  : "bg-white hover:bg-[#1F5E3B] hover:text-white"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
