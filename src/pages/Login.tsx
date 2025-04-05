import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    if (username === "admin" && password === "admin") {
      navigate("/product");
    } else {
      navigate("/about");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative overflow-hidden">
      <section className="absolute w-screen h-screen flex flex-wrap gap-[2px] z-0">
        {[...Array(400)].map((_, i) => (
          <span
            key={i}
            className="relative block w-[calc(6.25vw-2px)] h-[calc(6.25vw-2px)] bg-[#181818] transition-all duration-[200ms] hover:bg-green-400"
          ></span>
        ))}
      </section>
      <div className="signin absolute w-[500px] min-h-[720px] bg-[#1e1e1e] z-10 flex justify-center items-center p-10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] backdrop-blur-sm">
        <div className="content w-full flex flex-col gap-12">
          <div className="absolute top-6 left-6 z-20">
            <h1 className="text-2xl font-bold text-gray-100">
              <span className="text-green-500">Toko</span>Happy
            </h1>
          </div>

          <h2 className="text-3xl text-green-500 font-bold tracking-wide text-center ">
            WELCOME BACK
          </h2>
          <form
            onSubmit={handleLogin}
            className="form w-full flex flex-col gap-5"
          >
            <div className="inputBox relative w-full">
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#2c2c2c] border-none outline-none py-4 px-4 rounded text-white font-light"
              />
            </div>
            <div className="inputBox relative w-full">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#2c2c2c] border-none outline-none py-4 px-4 rounded text-white font-light"
              />
            </div>
            <div className="links w-full flex justify-between text-white text-sm mt-1">
              <a href="#" className="hover:underline text-gray-300">
                Forgot Password?
              </a>
              <a
                href="#"
                className="text-green-500 font-semibold hover:underline"
              >
                Signup
              </a>
            </div>
            <div className="inputBox mt-4">
              <button
                onClick={() => {
                  if (username && password) navigate("/about");
                  else {
                    return false;
                  }
                }}
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-green-500 text-black font-bold text-lg rounded-md shadow-lg hover:scale-105 active:opacity-70 transition-all"
              >
                Login Now
              </button>
            </div>
          </form>
        </div>
      </div>
      yy
    </div>
  );
}
