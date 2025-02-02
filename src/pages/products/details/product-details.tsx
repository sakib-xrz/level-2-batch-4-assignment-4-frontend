import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();

  console.log(id);

  return <div>ProductDetails</div>;
}
