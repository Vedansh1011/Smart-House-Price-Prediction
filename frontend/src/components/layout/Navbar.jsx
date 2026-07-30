import { FaHome, FaInfoCircle, FaMoon } from "react-icons/fa";

function Navbar({
  darkMode,
  setDarkMode,
}) {
  return (
    <nav className="bg-linear-to-r from-white via-blue-50 to-white shadow-md transition-colors duration-500 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-3xl">🏡</span>

          <div>
            <h1 className="text-xl font-bold text-blue-700 dark:text-blue-400">
              Smart House Price Prediction
            </h1>

            <p className="text-sm text-gray-500 dark:text-gray-300">
              Machine Learning Powered
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-8 text-gray-700 dark:text-white">

          <button
            onClick={() =>
              document
                .getElementById("home")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
            className="flex items-center gap-2 hover:text-blue-600 transition"
          >
            <FaHome />
            <span>Home</span>
          </button>

          <button
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
            className="flex items-center gap-2 hover:text-blue-600 transition"
          >
            <FaInfoCircle />
            <span>About</span>
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="hover:text-blue-600 transition text-xl"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;