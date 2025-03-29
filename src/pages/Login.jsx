import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const baseURL = import.meta.env.VITE_APP_BASE_URL;
  const navigate = useNavigate();

  const token = localStorage.token;

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Both email and password are required!");
      return;
    }

    try {
      setIsLoading(true);
      if (email === "eve.holt@reqres.in" && password === "cityslicka") {
        const response = await fetch(`${baseURL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          setIsLoading(false);
          toast.error("Invalid credentials");
        }

        setIsLoading(false);
        const data = await response.json();
        localStorage.setItem("token", data.token);
        toast.success("Login Successful!");
        navigate("/");
      } else {
        setIsLoading(false);
        toast.error("Invalid credentials");
      }
    } catch (err) {
      setIsLoading(false);
      toast.error("Error with API endpoint");
      console.error(err.message);
    }
  };

  return (
    <section className="bg-gray-50 h-screen w-full flex flex-col items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white border-2 border-gray-600 rounded-lg shadow sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold font-serif text-center text-gray-900 md:text-2xl">
              Sign In
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                />
                Use: eve.holt@reqres.in
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="••••••••"
                />
                Use: cityslicka
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {isLoading ? "Loading.." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
