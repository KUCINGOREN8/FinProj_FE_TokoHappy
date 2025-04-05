import { useState } from "react";
import BillingDetails from "./BillingDetails";
import PaymentDetails from "./PaymentDetails";
import { CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  email: string;
  phone: string;
  address: string;
  username: string;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
  setAddress: (value: string) => void;
  setUsername: (value: string) => void;
  setMethod: React.Dispatch<React.SetStateAction<string>>;
  method: string;
  onSubmit: () => void;
  isSubmitting: boolean;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function Form({
  name,
  phone,
  email,
  address,
  username,
  method,
  setName,
  setPhone,
  setEmail,
  setAddress,
  setUsername,
  setMethod,
  onSubmit,
  isSubmitting,
  step,
  setStep,
}: Props) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const validateBillingDetails = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    if (!address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setStep(2);
    }
  };

  const validatePaymentDetails = () => {
    const newErrors: { [key: string]: string } = {};

    if (!method) {
      newErrors.method = "Please select a payment method";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      handleSubmitAndRedirect();
    }
  };

  const handleSubmitAndRedirect = async () => {
    await onSubmit();
    navigate("/checkout/success");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      validateBillingDetails();
    } else {
      validatePaymentDetails();
    }
  };
  const expectedUsername = username;

  return (
    <form
      className="bg-white rounded-lg shadow-sm overflow-hidden"
      onSubmit={handleSubmit}
    >
      <div className="w-full bg-gray-100 h-2">
        <div
          className="bg-green-500 h-2 transition-all duration-300"
          style={{ width: step === 1 ? "50%" : "100%" }}
        ></div>
      </div>

      <div className="flex border-b border-gray-100">
        <button
          type="button"
          className={`flex-1 py-4 text-center font-medium ${
            step === 1
              ? "text-green-500 border-b-2 border-green-500"
              : "text-gray-500"
          }`}
          onClick={() => setStep(1)}
        >
          1. Billing Details
        </button>
        <button
          type="button"
          className={`flex-1 py-4 text-center font-medium ${
            step === 2
              ? "text-green-500 border-b-2 border-green-500"
              : "text-gray-500"
          }`}
          onClick={() => {
            if (!name || !email || !phone || !address) {
              validateBillingDetails();
            } else {
              setStep(2);
            }
          }}
        >
          2. Payment
        </button>
      </div>

      <div className="p-6 md:p-8">
        {step === 1 ? (
          <BillingDetails
            name={name}
            phone={phone}
            email={email}
            address={address}
            username={username}
            setName={setName}
            setPhone={setPhone}
            setEmail={setEmail}
            setAddress={setAddress}
            setUsername={setUsername}
            errors={errors}
            setErrors={setErrors}
            expectedUsername={expectedUsername}
          />
        ) : (
          <PaymentDetails
            setMethod={setMethod}
            method={method}
            errors={errors}
          />
        )}

        <div className="mt-8 flex justify-between">
          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-3 rounded-lg border border-gray-300 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`${
              step === 1 ? "ml-auto" : ""
            } px-6 py-3 rounded-lg bg-green-500 text-white font-medium hover:bg-green-800 transition-colors flex items-center gap-2 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : step === 1 ? (
              "Continue to Payment"
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                Complete Purchase
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
