"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

export default function CheckOut({ mode, amount, formData }) {
  console.log(formData.cost);
  console.log(amount);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handlePayment = async () => {
    if (!termsAccepted) {
      setError("Please accept the terms and conditions");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const paymentResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formId: formData.id,
            amount: formData.cost,
            serviceId: formData.serviceType,
            // phonenumber: formData.,
            email:
              formData.serviceType == "pickonly" || mode.mode == "pickanddrop"
                ? formData.pickupEmail
                :formData.dropoffEmail,
          }),
        }
      );

      const { id: sessionId } = await paymentResponse.json();

      const stripe = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`);

      (await stripe).redirectToCheckout({ sessionId });
    } catch (err) {
      console.log(err);

      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 mx-auto bg-white rounded-lg shadow-lg lg:min-w-[950px] max-w-7xl sm:p-6">
      <h1 className="mb-4 text-xl font-bold text-black sm:text-2xl sm:mb-6">
        CHECKOUT
      </h1>

      {/* Applicant Details */}
      <div className="mb-6 sm:mb-8">
        <h2 className="mb-2 text-lg font-semibold text-black sm:mb-4">
          Applicant Details
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse sm:text-base">
            <thead>
              <tr>
                <th className="p-2 text-left text-white bg-blue-600 sm:p-3">
                  Name
                </th>
                <th className="p-2 text-left text-white bg-blue-600 sm:p-3">
                  Email
                </th>
                <th className="p-2 text-left text-white bg-blue-600 sm:p-3">
                  Passport
                </th>
                {mode && mode.includes("drop") && (
                  <th className="hidden p-2 text-left text-white bg-blue-600 sm:p-3 sm:table-cell">
                    DropOff
                  </th>
                )}
                {mode && mode.includes("pick") && (
                  <th className="hidden p-2 text-left text-white bg-blue-600 sm:p-3 sm:table-cell">
                    PickUp
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-blue-50">
                <td className="p-2 text-black border sm:p-3">
                  {formData.pickupName || formData.dropoffName}
                </td>
                <td className="p-2 text-black border sm:p-3">
                  {formData.pickupEmail || formData.dropoffEmail}
                </td>
                <td className="p-2 text-black border sm:p-3">
                  {formData.pickupPassportNo || formData.dropoffPassportNo}
                </td>

                {mode && mode.includes("drop") && (
                  <>
                    <td className="hidden p-2 text-black border sm:p-3 sm:table-cell">
                      {formData.dropoffAddress &&
                        ` ${formData.dropoffProvince}`}
                    </td>
                  </>
                )}

                {mode && mode.includes("pick") && (
                  <>
                    <td className="hidden p-2 text-black border sm:p-3 sm:table-cell">
                      {`${formData.pickupProvince}`}
                    </td>
                  </>
                )}
              </tr>
            </tbody>
          </table>
        </div>
        {/* Mobile view for Delivery and Pickup */}
        <div className="mt-4 sm:hidden">
          {mode && mode.includes("drop") && (
            <>
              <p className="font-semibold text-black">DropOff:</p>
              <p className="mb-2 text-black">
                {formData.dropoffAddress && ` ${formData.dropoffProvince}`}
              </p>
            </>
          )}

          {mode && mode.includes("pick") && (
            <>
              <p className="font-semibold text-black">Pickup:</p>
              <p className="mb-2 text-black">
                {formData.pickupAddress && `${formData.pickupProvince}`}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Payment Details */}
      <div className="mb-6 sm:mb-8">
        <h2 className="mb-2 text-lg font-semibold text-black sm:mb-4">
          Payment Details
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse sm:text-base">
            <thead>
              <tr>
                <th className="p-2 text-left text-white bg-blue-600 sm:p-3">
                  SERVICE
                </th>
                <th className="p-2 text-left text-white bg-blue-600 sm:p-3">
                  NUMBER OF APPLICANTS
                </th>
                <th className="p-2 text-left text-white bg-blue-600 sm:p-3">
                  TOTAL CHARGES
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="p-2 text-black capitalize border sm:p-3">
                  {formData.serviceType}
                </td>
                <td className="p-2 text-black border sm:p-3">1</td>
                <td className="p-2 text-black border sm:p-3">
                  ${formData.cost}
                </td>
              </tr>
              <tr className="font-semibold bg-gray-50">
                <td className="p-2 text-black border sm:p-3" colSpan={2}>
                  TOTAL
                </td>
                <td className="p-2 text-black border sm:p-3">
                  ${formData.cost}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Terms and Payment */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-2 sm:items-center">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="w-4 h-4 mt-1 border-gray-300 rounded sm:mt-0"
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I have read and agree with the above mentioned terms and conditions.
          </label>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-end">
          <button
            onClick={handlePayment}
            disabled={isSubmitting || !termsAccepted}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded sm:px-6 sm:text-base hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "PROCEED TO PAYMENT"}
          </button>
        </div>
      </div>
    </div>
  );
}
