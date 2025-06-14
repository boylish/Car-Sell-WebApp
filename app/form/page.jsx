"use client";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { carData } from "../data/carData";
import axios from "axios";
import emailjs from "emailjs-com";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";

const kmsOptions = [
  "Below 20,000",
  "20,000 - 50,000",
  "50,000 - 1L",
  "1L - 2L",
  "2L+ km",
];
const sellTimings = ["Immediately", "Within a month", "After a month"];
const fuelTypes = ["Petrol", "Diesel", "CNG", "EV"];
const transmissions = ["Manual", "Auto"];

export default function MultiStepForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const brand = searchParams.get("brand") || "";
  const models = carData[brand]?.models || [];
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    city: "",
    year: "",
    model: "",
    customModel: "",
    fuelType: "",
    transmission: "",
    kms: "",
    sellTiming: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      brand,
      model: formData.model,
      year: formData.year,
      kms: formData.kms,
      city: formData.city,
      sellTime: formData.sellTiming,
      phone: formData.phone,
      email: formData.email,
      variant: {
        fuel: formData.fuelType,
        transmission: formData.transmission,
      },
    };

    try {
      await axios.post("/api/cars", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          user_email: formData.email,
          brand,
          model: formData.model,
          year: formData.year,
          kms: formData.kms,
          city: formData.city,
          sell_time: formData.sellTiming,
          phone: formData.phone,
          fuel_type: formData.fuelType,
          transmission: formData.transmission,
        },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      );

      alert("Form submitted and email sent successfully!");
    } catch (error) {
      console.error("Error submitting form or sending email:", error.message);
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen bg-[url('/bgs/meterbg.jpg')] bg-cover bg-center flex items-center justify-center px-2 sm:px-4">
      <div className="bg-white/80 backdrop-blur-md p-4 sm:p-8 rounded shadow-md w-full max-w-md overflow-y-auto max-h-screen">
        <h2 className="text-2xl font-bold text-center mb-4">
          Selling {brand} Car
        </h2>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <label className="block mb-2 font-semibold">Choose City</label>
              <div className="flex flex-wrap  gap-2 mb-4">
                {["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai"].map(
                  (city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setFormData({ ...formData, city })}
                      className={`px-3 py-2 border-pink-600 rounded border ${
                        formData.city === city
                          ? "bg-pink-600 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {city}
                    </button>
                  )
                )}
              </div>
              <label className="block mb-2">Or type your city</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded mb-4 border-pink-600 bg-white "
                placeholder="Enter your city"
              />
              <button
                type="button"
                onClick={nextStep}
                disabled={!formData.city}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <label className="block mb-2 font-semibold">
                Manufacturing Year
              </label>
              <input
                type="number"
                name="year"
                min="2000"
                max={new Date().getFullYear()}
                value={formData.year}
                onChange={handleChange}
                className="w-full px-3 py-2 border-pink-600 border rounded mb-4 bg-white"
              />
              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="bg-gray-300 px-4 py-2 rounded "
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!formData.year}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <label className="block mb-2 font-semibold">Car Model</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {models.map((model) => (
                  <button
                    key={model}
                    type="button"
                    onClick={() => setFormData({ ...formData, model })}
                    className={`px-3 py-2 border-pink-600 rounded border ${
                      formData.model === model
                        ? "bg-pink-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {model}
                  </button>
                ))}
              </div>
              <label className="block mb-2">Or type your model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="w-full px-3 py-2 border-pink-600 border rounded mb-4 bg-white"
                placeholder="Enter custom model"
              />
              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!formData.model}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <label className="block mb-2">Fuel Type</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {fuelTypes.map((fuel) => (
                  <button
                    key={fuel}
                    type="button"
                    onClick={() => setFormData({ ...formData, fuelType: fuel })}
                    className={`px-3 py-2 border-pink-600 border rounded ${
                      formData.fuelType === fuel
                        ? "bg-pink-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {fuel}
                  </button>
                ))}
              </div>
              <label className="block mb-2">Transmission</label>
              <div className="flex gap-2 mb-4">
                {transmissions.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, transmission: t })
                    }
                    className={`px-3 py-2 border-pink-600 border rounded ${
                      formData.transmission === t
                        ? "bg-pink-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 5 && (
            <>
              <label className="block mb-2">Kilometers Driven</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {kmsOptions.map((kms) => (
                  <button
                    key={kms}
                    type="button"
                    onClick={() => setFormData({ ...formData, kms })}
                    className={`px-3 py-2 border-pink-600 border rounded ${
                      formData.kms === kms
                        ? "bg-pink-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {kms}
                  </button>
                ))}
              </div>
              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 6 && (
            <>
              <label className="block mb-2">When do you want to sell?</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {sellTimings.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFormData({ ...formData, sellTiming: t })}
                    className={`px-3 py-2 border-pink-600 border rounded ${
                      formData.sellTiming === t
                        ? "bg-pink-600 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 7 && (
            <>
              <label className="block mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border-pink-600 border rounded mb-4 bg-white"
              />
              <label className="block mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-pink-600 rounded mb-4 bg-white"
              />
              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? <ClipLoader size={20} color="#fff" /> : "Submit"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </main>
  );
}
