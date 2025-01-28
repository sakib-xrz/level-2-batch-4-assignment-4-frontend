import { Button } from "antd";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <main className="grid min-h-[calc(100vh-400px)] place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-green-600">Success</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
          Payment Successful
        </h1>
        <p className="mt-6 text-lg font-medium text-gray-500 sm:text-xl/8">
          Thank you! Your payment was completed successfully.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link to="/my-orders">
            <Button type="primary">Go to My Orders</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
