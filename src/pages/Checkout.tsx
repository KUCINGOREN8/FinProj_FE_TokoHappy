import { useState } from "react";
import Form from "../components/Form";
import { ShoppingBag } from "lucide-react";

export default function Checkout() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [method, setMethod] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const onSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log({
        name,
        phone,
        email,
        address,
        username,
        method,
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center gap-2">
          <ShoppingBag className="text-green-500 w-6 h-6" />
          <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
        </div>

        <Form
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          address={address}
          setAddress={setAddress}
          username={username}
          setUsername={setUsername}
          method={method}
          setMethod={setMethod}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          step={step}
          setStep={setStep}
        />
      </div>
    </div>
  );
}
