import { PackageOpen, CreditCard, DollarSign } from "lucide-react";
import { useState } from "react";

type Props = {
  setMethod: React.Dispatch<React.SetStateAction<string>>;
  method: string;
  errors: { [key: string]: string };
};

export default function PaymentDetails({ method, setMethod, errors }: Props) {
  const [eMoneyNumber, setEMoneyNumber] = useState("");
  const [eMoneyPin, setEMoneyPin] = useState("");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Payment Method</h2>

      <div className="space-y-4">
        {errors.method && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">
            {errors.method}
          </div>
        )}

        <div
          onClick={() => setMethod("e-money")}
          className={`p-4 border rounded-lg flex items-center gap-4 cursor-pointer transition-all ${
            method === "e-money"
              ? "border-green-500 bg-green-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center ${
              method === "e-money"
                ? "border-4 border-green-500"
                : "border border-gray-400"
            }`}
          >
            {method === "e-money" && (
              <div className="bg-green-500 rounded-full w-1 h-1"></div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center text-green-500">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium">e-Money</p>
              <p className="text-sm text-gray-500">
                Pay using your e-Money account
              </p>
            </div>
          </div>
        </div>

        <div
          onClick={() => setMethod("cod")}
          className={`p-4 border rounded-lg flex items-center gap-4 cursor-pointer transition-all ${
            method === "cod"
              ? "border-green-500 bg-green-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center ${
              method === "cod"
                ? "border-4 border-green-500"
                : "border border-gray-400"
            }`}
          >
            {method === "cod" && (
              <div className="bg-green-500 rounded-full w-1 h-1"></div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center text-green-600">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium">Cash on Delivery</p>
              <p className="text-sm text-gray-500">
                Pay when your order arrives
              </p>
            </div>
          </div>
        </div>

        {method === "e-money" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                e-Money Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={eMoneyNumber}
                onChange={(e) => setEMoneyNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                e-Money PIN
              </label>
              <input
                type="password"
                placeholder="••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={eMoneyPin}
                onChange={(e) => setEMoneyPin(e.target.value)}
                maxLength={10}
              />
            </div>
          </div>
        )}

        {method === "cod" && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 mt-4 flex items-start gap-4">
            <div className="flex items-center justify-center w-10 h-10 bg-amber-100 rounded-full text-amber-600 flex-shrink-0">
              <PackageOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-gray-800 mb-1">Cash on Delivery</p>
              <p className="text-sm text-gray-600 leading-relaxed">
                The 'Cash on Delivery' option enables you to pay in cash when
                our delivery courier arrives at your residence. Please make sure
                your address is correct so your order will not be cancelled.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
