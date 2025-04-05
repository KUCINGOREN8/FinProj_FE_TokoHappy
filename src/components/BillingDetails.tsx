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
  errors: { [key: string]: string };
  setErrors: (errors: { [key: string]: string }) => void;
  expectedUsername: string;
}

export default function BillingDetails({
  name,
  email,
  phone,
  address,
  username,
  setName,
  setEmail,
  setPhone,
  setAddress,
  setUsername,
  expectedUsername,
  errors,
  setErrors,
}: Props) {
  const handleUsernameChange = (value: string) => {
    setUsername(value);
    if (value !== expectedUsername) {
      setErrors({
        ...errors,
        username: "Username tidak sesuai!",
      });
    } else {
      const newErrors = { ...errors };
      delete newErrors.username;
      setErrors(newErrors);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Billing Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder={username}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.username
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border-gray-300"
              } bg-gray-50 text-gray-500 focus:outline-none`}
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              readOnly
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
            </div>
          </div>
          {errors.username && (
            <p className="mt-1 text-sm text-red-500">{errors.username}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Joseph"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.name
                ? "border-red-500 ring-1 ring-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            } transition-all`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="joseph@gmail.com"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email
                ? "border-red-500 ring-1 ring-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            } transition-all`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            placeholder="0812-1233-4567"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.phone
                ? "border-red-500 ring-1 ring-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            } transition-all`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Delivery Address <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Jalan Kebon Jeruk No.32A"
            rows={3}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.address
                ? "border-red-500 ring-1 ring-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            } transition-all`}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-500">{errors.address}</p>
          )}
        </div>
      </div>

      <div className="text-sm text-gray-500 mt-4">
        Fields marked with <span className="text-red-500">*</span> are required
      </div>
    </div>
  );
}
