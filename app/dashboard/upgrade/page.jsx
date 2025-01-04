"use client";
import React, { useEffect, useState } from "react";
import { Check } from "lucide-react";
import axios from "axios";
import { db } from "@/configs/db";
import { USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";

export default function PricingPlans() {
  const user = useUser();
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    GetUserDetail();
  }, [user]);
  const GetUserDetail = async () => {
    const result = await db
      .select()
      .from(USER_TABLE)
      .where(eq(USER_TABLE.email, user.user.primaryEmailAddress?.emailAddress));
    setUserDetail(result[0]);
  };
  const OnCheckoutClick = async () => {
    try {
      const result = await axios.post("/api/payment/checkout", {
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
      });

      if (result.data.session?.url) {
        window.location.assign(result.data.session.url);
      } else {
        console.error("No checkout URL received from Stripe");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const OnPaymentManage = async () => {
    const result = await axios.post("/api/payment/manage-payment", {
      customerId: userDetail?.customerId,
    });

    console.log(result.data);
    window.location.assign(result.data.portalSession.url);
  };
  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="text-center mb-16">
        <h1 className="text-2xl font-semibold mb-2">Plans</h1>
        <p className="text-sm text-gray-600">
          Update your plan to generate unlimited courses for your exam
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Free Plan */}
        <div className="border rounded-lg p-6 flex flex-col items-center text-center shadow-sm bg-white">
          <div className="mb-6">
            <p className="text-base font-medium mb-2">Free</p>
            <div className="flex items-baseline justify-center">
              <span className="text-3xl font-semibold">0$</span>
              <span className="text-sm text-gray-600 ml-1">/month</span>
            </div>
          </div>

          <div className="space-y-4 flex-grow w-full max-w-xs">
            <div className="flex items-center gap-2 justify-center">
              <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>5 PDF Upload</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>Unlimited Notes Taking</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>Email support</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>Help center access</span>
            </div>
          </div>

          <button className="mt-6 w-full max-w-xs py-2 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
            Current Plan
          </button>
        </div>

        {/* Monthly Plan */}
        <div className="border rounded-lg p-6 flex flex-col items-center text-center shadow-sm bg-white">
          <div className="mb-6">
            <p className="text-base font-medium mb-2">Monthly</p>
            <div className="flex items-baseline justify-center">
              <span className="text-3xl font-semibold">9.99$</span>
              <span className="text-sm text-gray-600 ml-1">/Monthly</span>
            </div>
          </div>

          <div className="space-y-4 flex-grow w-full max-w-xs">
            <div className="flex items-center gap-2 justify-center">
              <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>Unlimited PDF Upload</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>Unlimited Notes Taking</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>Email support</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>Help center access</span>
            </div>
          </div>

          {userDetail?.member == false ? (
            <button
              className="mt-6 w-full max-w-xs py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={OnCheckoutClick}
            >
              Get Started
            </button>
          ) : (
            <button
              className="mt-6 w-full max-w-xs py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={OnPaymentManage}
            >
              Manage Payment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
