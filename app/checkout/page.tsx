"use client";
// import { useCart } from "@/store/useCart";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../store/useCart";

export default function CheckoutPage() {
  const { cart } = useCart();
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 15; // Static for now
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="pt-40 text-center">
        <h2 className="text-2xl font-display uppercase">Your bag is empty</h2>
        <Link href="/shop" className="mt-4 inline-block underline uppercase text-sm">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
      <h1 className="text-4xl font-display font-bold uppercase mb-12">Checkout</h1>
      
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Left Side: Shipping Form */}
        <div className="space-y-8">
          <section>
            <h2 className="text-sm uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Shipping Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="bg-zinc-900 border border-white/10 p-3 outline-none focus:border-white transition" />
              <input type="text" placeholder="Last Name" className="bg-zinc-900 border border-white/10 p-3 outline-none focus:border-white transition" />
              <input type="email" placeholder="Email" className="col-span-2 bg-zinc-900 border border-white/10 p-3 outline-none focus:border-white transition" />
              <input type="text" placeholder="Address" className="col-span-2 bg-zinc-900 border border-white/10 p-3 outline-none focus:border-white transition" />
              <input type="text" placeholder="City" className="bg-zinc-900 border border-white/10 p-3 outline-none focus:border-white transition" />
              <input type="text" placeholder="Postcode" className="bg-zinc-900 border border-white/10 p-3 outline-none focus:border-white transition" />
            </div>
          </section>

          <button className="w-full bg-white text-black py-4 uppercase font-bold hover:bg-brand-accent hover:text-white transition">
            Continue to Payment
          </button>
        </div>

        {/* Right Side: Order Summary */}
        <div className="bg-zinc-900/50 p-8 h-fit border border-white/5">
          <h2 className="text-sm uppercase tracking-widest mb-6 font-bold">Order Summary</h2>
          <div className="space-y-6 mb-8">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="relative w-16 h-20 bg-zinc-800">
                    <Image src="/sample-product.jpg" alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase">{item.name}</h3>
                    <p className="text-[10px] text-zinc-500 uppercase">Size: {item.size} / Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-sm">${item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t border-white/10 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-400">Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Shipping</span>
              <span>${shipping}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t border-white/10 mt-4 pt-4">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}