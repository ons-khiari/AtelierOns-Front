"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useCart } from "@/lib/cart-context";
import { CheckCircle, Home } from "lucide-react";

interface OrderData {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    street: string;
    building: string;
    city: string;
    region: string;
    notes: string;
  };
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  orderNumber: string;
  deliveryDate: string;
}

export default function ThankYouPage() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const data = sessionStorage.getItem("orderData");
    if (data) {
      const parsedData = JSON.parse(data);
      setOrderData(parsedData);
      clearCart();
      // Clear session storage so page can't be accessed again
      sessionStorage.removeItem("orderData");
    }
  }, [clearCart]);

  if (!mounted) {
    return null;
  }

  if (!orderData) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-4">
              No Order Found
            </h1>
            <p className="text-muted-foreground mb-8">
              There's no active order to display.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-serif font-bold rounded hover:bg-primary/90 transition"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Thank You Section */}
      <div className="flex-1 py-20 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-primary/10 rounded-full">
              <CheckCircle className="w-16 h-16 text-primary" />
            </div>
          </div>

          {/* Main Message */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4">
              Thank You!
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              Your order has been confirmed
            </p>
            <p className="text-accent font-semibold">
              Order #: {orderData.orderNumber}
            </p>
            <p className="text-muted-foreground mt-4">
              Atelier Ons appreciates your purchase!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Delivery Information */}
            <div className="border border-border rounded-lg p-6">
              <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                Delivery Details
              </h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Recipient</p>
                  <p className="text-foreground font-medium">
                    {orderData.formData.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="text-foreground font-medium">
                    {orderData.formData.email}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="text-foreground font-medium">
                    {orderData.formData.phone}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Address</p>
                  <p className="text-foreground font-medium">
                    {orderData.formData.street}
                    {orderData.formData.building &&
                      `, ${orderData.formData.building}`}
                  </p>
                  <p className="text-foreground font-medium">
                    {orderData.formData.city}, {orderData.formData.region}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Estimated Delivery</p>
                  <p className="text-foreground font-medium">
                    {orderData.deliveryDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border border-border rounded-lg p-6">
              <h2 className="font-serif text-xl font-bold text-foreground mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 pb-4 border-b border-border">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="text-foreground font-medium">{item.name}</p>
                      <p className="text-muted-foreground text-xs">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-foreground font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-lg font-bold mt-4">
                <span className="text-foreground">Total</span>
                <span className="text-primary">
                  ${orderData.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          {orderData.formData.notes && (
            <div className="border border-border rounded-lg p-6 mb-12 bg-muted/30">
              <h3 className="font-serif font-bold text-foreground mb-2">
                Special Instructions
              </h3>
              <p className="text-muted-foreground">
                {orderData.formData.notes}
              </p>
            </div>
          )}

          {/* Message */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center mb-12">
            <p className="text-foreground mb-2">
              A confirmation email has been sent to{" "}
              <span className="font-semibold">{orderData.formData.email}</span>.
            </p>
            <p className="text-muted-foreground text-sm">
              Your order will be carefully prepared and shipped within 2-3
              business days.
            </p>
          </div>

          {/* CTA */}
          <div className="flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-serif font-bold rounded hover:bg-primary/90 transition"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
