"use client";

import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { encodeMessage } from "@/utils/decoder";


export default function Component(mode) {
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [amount, setAmount] = useState();
  const [formData, setFormData] = useState({
    pickup: {
      cost:'',
      serviceType: mode.mode,
      name: "",
      passportNo: "",
      contactNo: "",
      email: "",
      address: "",
      address1: "",
      city: "",
      postalCode: "",
      pickupDate: null,
      province: "",
      packageLocation: "FrontDoor",
      pickupTime: "10:00-14:00",
    },
    dropoff: {
      service: "Passport Renewal",
      name: "",
      passportNo: "",
      contactNo: "",
      email: "",
      address: "",
      address1: "",
      city: "",
      postalCode: "",
      province: "",
    },
  });

  const router = useRouter()

  const specialPricingProvinces = ['Ontario', 'Quebec', 'British Columbia'];

// Improved priceLogic object
const priceLogic = {
  pickonly: (province) => specialPricingProvinces.includes(province) ? 40 : 60,
  pickanddrop: (province) => specialPricingProvinces.includes(province) ? 70 : 90,
  droponly: (province) => specialPricingProvinces.includes(province) ? 40 : 60,
};

  useEffect(() => {
    if (priceLogic[mode.mode]) {
      const newAmount = priceLogic[mode.mode](formData.pickup.province);
      setAmount(newAmount);
      console.log(amount)
    }
  }, [formData.pickup.province]);

  useEffect(() => {
    if (mode.mode == "droponly") {
      if (priceLogic[mode.mode]) {
        const newAmount = priceLogic[mode.mode](formData.dropoff.province);
        setAmount(newAmount);
      }
    }
  }, [formData.dropoff.province]);


  const validateForm = () => {
    const newErrors = {};

    // Validate pickup section
    if (mode.mode === "pickonly" || mode.mode === "pickanddrop") {
      if (!formData.pickup.name.trim()) {
        newErrors.pickup = { ...newErrors.pickup, name: "Name is required" };
      }
      if (!formData.pickup.passportNo.trim()) {
        newErrors.pickup = {
          ...newErrors.pickup,
          passportNo: "Passport number is required",
        };
      }
      if (!formData.pickup.contactNo.trim()) {
        newErrors.pickup = {
          ...newErrors.pickup,
          contactNo: "Contact number is required",
        };
      }
      if (!formData.pickup.email.trim()) {
        newErrors.pickup = { ...newErrors.pickup, email: "Email is required" };
      } else if (!/\S+@\S+\.\S+/.test(formData.pickup.email)) {
        newErrors.pickup = {
          ...newErrors.pickup,
          email: "Invalid email format",
        };
      }
      if (!formData.pickup.postalCode.trim()) {
        newErrors.pickup = {
          ...newErrors.pickup,
          postalCode: "Postal code is required",
        };
      }
      // Validate pickup date
      if (!formData.pickup.pickupDate) {
        newErrors.pickup = {
          ...newErrors.pickup,
          pickupDate: "Pickup date is required",
        };
      } else {
        const currentDate = new Date();
        const selectedDate = new Date(formData.pickup.pickupDate);
        if (selectedDate < currentDate) {
          newErrors.pickup = {
            ...newErrors.pickup,
            pickupDate: "Pickup date must be in the future",
          };
        }
      }
    }

    // Validate dropoff section
    if (mode.mode === "droponly" || mode.mode === "pickanddrop") {
      if (!formData.dropoff.name.trim()) {
        newErrors.dropoff = { ...newErrors.dropoff, name: "Name is required" };
      }
      if (!formData.dropoff.passportNo.trim()) {
        newErrors.dropoff = {
          ...newErrors.dropoff,
          passportNo: "Passport number is required",
        };
      }
      if (!formData.dropoff.email.trim()) {
        newErrors.dropoff = {
          ...newErrors.dropoff,
          email: "Email is required",
        };
      } else if (!/\S+@\S+\.\S+/.test(formData.dropoff.email)) {
        newErrors.dropoff = {
          ...newErrors.dropoff,
          email: "Invalid email format",
        };
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    if (!validateForm()) {
      setIsSubmitting(false);
      setSubmitMessage({
        type: "error",
        message: "Please fix the errors in the form",
      });
      return;
    }
    formData.pickup.cost = amount;


    console.log(formData,"formdata")

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/pdform`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data.data;
      
      const encryptedId = encodeMessage(String(data.id));
      router.push(`/checkout?formid=${encodeURIComponent(encryptedId)}`);

      setSubmitMessage({
        type: "success",
        message: "Form submitted successfully!",
      });
      setFormData({
        pickup: {
          name: "",
          passportNo: "",
          contactNo: "",
          email: "",
          address: "",
          address1: "",
          city: "",
          postalCode: "",
          pickupDate: "",
          province: "Quebec (QC)",
          packageLocation: "FrontDoor",
          pickupTime: "10:00-14:00",
        },
        dropoff: {
          service: "Passport Renewal",
          name: "",
          passportNo: "",
          contactNo: "",
          email: "",
          address: "",
          address1: "",
          city: "",
          postalCode: "",
          province: "Quebec (QC)",
        },
      });
    } catch (error) {
      console.log(error);
      setSubmitMessage({
        type: "error",
        message:
          error.response?.data?.error ||
          "Failed to submit form. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    // Clear error when user starts typing
    if (errors[section]?.[field]) {
      setErrors((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: undefined,
        },
      }));
    }
  };

  const renderInput = (
    section,
    field,
    label,
    type = "text",
    required = true
  ) => {
    const error = errors[section]?.[field];
    return (
      <div>
        <label
          htmlFor={`${section}-${field}`}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
        <input
          type={type}
          id={`${section}-${field}`}
          value={formData[section][field]}
          onChange={(e) => handleInputChange(section, field, e.target.value)}
          className={`w-full px-3 text-black py-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 ${
            error ? "focus:ring-red-500" : "focus:ring-blue-500"
          } transition-colors`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${section}-${field}-error` : undefined}
        />
        {error && (
          <p
            id={`${section}-${field}-error`}
            className="mt-1 text-sm text-red-500"
          >
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-[#F4E3B8]">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl p-6 mx-auto space-y-8 bg-white rounded-lg shadow-lg"
      >
        {(mode.mode == "pickonly" || mode.mode == "pickanddrop") && (
          <div>
            <h2 className="mb-4 text-xl font-semibold text-black">
              Pick Up Address
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {renderInput("pickup", "name", "Name")}
              {renderInput("pickup", "passportNo", "Passport No.")}
              {renderInput("pickup", "contactNo", "Contact No.", "tel")}
              {renderInput("pickup", "email", "Email", "email")}
              {renderInput("pickup", "address", "Address Line 1")}
              {renderInput("pickup", "address1", "Address Line 2", "text", false)}
              {renderInput("pickup", "city", "City")}
              {renderInput("pickup", "postalCode", "Postal Code")}

              <div>
                <label
                  htmlFor="pickup-date"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Pickup Date:
                </label>
                <input
                  type="date"
                  id="pickup-date"
                  value={formData.pickup.pickupDate}
                  onChange={(e) =>
                    handleInputChange("pickup", "pickupDate", e.target.value)
                  }
                  className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="pickup-province"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Province:
                </label>
                <select
                  id="pickup-province"
                  value={formData.pickup.province}
                  onChange={(e) =>
                    handleInputChange("pickup", "province", e.target.value)
                  }
                  className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Province</option>

                  <option value="Ontario">Ontario</option>
                  <option value="Alberta">Alberta</option>
                  <option value="British Columbia">British Columbia</option>
                  <option value="Manitoba">Manitoba</option>
                  <option value="New Brunswick">New Brunswick</option>
                  <option value="Newfoundland and Labrador">
                    Newfoundland and Labrador
                  </option>
                  <option value="Nova Scotia">Nova Scotia</option>
                  <option value="Prince Edward Island">
                    Prince Edward Island
                  </option>
                  <option value="Quebec">Quebec</option>
                  <option value="Saskatchewan">Saskatchewan</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="pickup-location"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Package Location:
                </label>
                <select
                  id="pickup-location"
                  value={formData.pickup.packageLocation}
                  onChange={(e) =>
                    handleInputChange(
                      "pickup",
                      "packageLocation",
                      e.target.value
                    )
                  }
                  className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>FrontDoor</option>
                  <option>BackDoor</option>
                  <option>Reception</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="pickup-time"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Pickup Time:
                </label>
                <select
                  id="pickup-time"
                  value={formData.pickup.pickupTime}
                  onChange={(e) =>
                    handleInputChange("pickup", "pickupTime", e.target.value)
                  }
                  className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>10:00-14:00</option>
                  <option>14:00-18:00</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div
          className="p-4 my-4 border-l-4 border-yellow-400 bg-yellow-50"
          role="alert"
        >
          <p className="text-sm text-yellow-700">
          For drop-off address please mention your own current residing address. As the drop-off address is where you would like to deliver your document from the BLS office once it is ready for dispatch.
          </p>
        </div>

        {/* Drop Off Address Section */}
        {(mode.mode == "droponly" || mode.mode == "pickanddrop") && (
          <div>
            <h2 className="mb-4 text-xl font-semibold text-black">
              Drop Off Address
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="service"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Service:
                </label>
                <select
                  id="service"
                  value={formData.dropoff.service}
                  onChange={(e) =>
                    handleInputChange("dropoff", "service", e.target.value)
                  }
                  className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Passport Renewal</option>
                  <option>Visa Application</option>
                  <option>Other Services</option>
                </select>
              </div>

              {renderInput("dropoff", "name", "Name")}
              {renderInput("dropoff", "passportNo", "Passport No.")}
              {renderInput("dropoff", "contactNo", "Contact No.", "tel")}
              {renderInput("dropoff", "email", "Email", "email")}
              {renderInput("dropoff", "address", "Address Line 1")}
              {renderInput("dropoff", "address1", "Address Line 2", "text", false)}
              {renderInput("dropoff", "city", "City")}
              {renderInput("dropoff", "postalCode", "Postal Code")}

              <div>
                <label
                  htmlFor="dropoff-province"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Province:
                </label>
                <select
                  id="dropoff-province"
                  value={formData.dropoff.province}
                  onChange={(e) =>
                    handleInputChange("dropoff", "province", e.target.value)
                  }
                  className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Province</option>

                  <option value="Ontario">Ontario</option>
                  <option value="Alberta">Alberta</option>
                  <option value="British Columbia">British Columbia</option>
                  <option value="Manitoba">Manitoba</option>
                  <option value="New Brunswick">New Brunswick</option>
                  <option value="Newfoundland and Labrador">
                    Newfoundland and Labrador
                  </option>
                  <option value="Nova Scotia">Nova Scotia</option>
                  <option value="Prince Edward Island">
                    Prince Edward Island
                  </option>
                  <option value="Quebec">Quebec</option>
                  <option value="Saskatchewan">Saskatchewan</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {submitMessage && (
          <div
            className={`p-4 rounded-md ${
              submitMessage.type === "success"
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
            role="alert"
          >
            {submitMessage.message}
          </div>
        )}

        <div className="p-4">
          <div class="flex flex-col gap-2 p-4  mx-auto  rounded-md max-w-xs md:max-w-md">
          
            <div class="flex justify-center items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? "Procceding..."
                  : `Procced`}
              </button>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
}
