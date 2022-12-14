import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../api/ProductsAPI";
import useAuth from "../../context/auth";
import ProductForm from "../components/ProductForm/ProductForm";

export default function EditProduct() {
  const [product, setProduct] = useState([]);
  const params = useParams();

  const {
    state: { user },
  } = useAuth();

  useEffect(() => {
    (async () => {
      setProduct(await fetchProduct(params?.id));
    })();
  }, [params?.id, user]);

  return (
    <div className="edit-product">
      <p className="text-xl font-semibold">Edit {product?.name}</p>
      {product ? (
        <ProductForm productInfo={product} isEdit={true} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
