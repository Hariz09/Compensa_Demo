"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

interface Employee {
  id: number;
  name: string;
  department: string;
  totalSalary: number;
  status: string;
}

interface CheckoutData {
  [month: string]: Employee[];
}

const CheckoutPage = () => {
  const router = useRouter();
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("checkoutData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setCheckoutData(parsedData);
      }
      // Clear the data from localStorage after reading it (optional)
      // localStorage.removeItem('checkoutData');
    } catch (error) {
      console.error("Error parsing checkout data:", error);
    }
    setIsLoading(false);
  }, []);

  const calculateTotalAmount = () => {
    return Object.values(checkoutData).reduce((total, employees) => {
      return (
        total +
        employees.reduce((monthTotal, emp) => monthTotal + emp.totalSalary, 0)
      );
    }, 0);
  };

  const handleProcessPayment = () => {
    // Implement your payment processing logic here
    alert("Processing payment...");
    // After successful payment, you might want to:
    // 1. Clear the localStorage
    localStorage.removeItem("checkoutData");
    // 2. Redirect back to dashboard or confirmation page
    // router.push('/admin/dashboard/unpaid');
  };

  if (isLoading) {
    return (
      <div className="bg-gray-900">
        <div className="container mx-auto p-6 bg-gray-900 text-gray-200 min-h-screen">
          <div className="flex items-center justify-center">
            <p className="text-lg">Loading checkout data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!checkoutData || Object.keys(checkoutData).length === 0) {
    return (
      <div className="bg-gray-900">
        <div className="container mx-auto p-6 bg-gray-900 text-gray-200 min-h-screen">
          <div className="text-center space-y-4">
            <p className="text-xl">No items selected for checkout</p>
            <button
              onClick={() => router.push("/admin/dashboard/unpaid")}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900">
    <div className="container mx-auto p-6 bg-gray-900 text-gray-200 min-h-screen">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Summary</span>
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-white">Checkout Summary</h1>

      <div className="space-y-6">
        {Object.entries(checkoutData).map(([month, employees]) => (
          <Card
            key={month}
            className="bg-gray-800 text-gray-200 border border-gray-700"
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{month}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employees.map((employee) => (
                  <div
                    key={employee.id}
                    className="flex justify-between items-center p-3 bg-gray-700 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-white">{employee.name}</p>
                      <p className="text-sm text-gray-400">
                        {employee.department}
                      </p>
                    </div>
                    <p className="font-medium text-gray-200">
                      ${employee.totalSalary.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="bg-gray-800 text-gray-200 border border-gray-700">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-medium text-gray-300">
                  Total Amount to Pay
                </p>
                <p className="text-2xl font-bold text-white">
                  ${calculateTotalAmount().toLocaleString()}
                </p>
              </div>
              <button
                onClick={handleProcessPayment}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
              >
                Process Payment
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
};

export default CheckoutPage;
