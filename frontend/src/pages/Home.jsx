import Navbar from "../components/layout/Navbar";
import Hero from "../components/landing/Hero";
import Wizard from "../components/prediction/Wizard";
import About from "../components/landing/About";

function Home({
  darkMode,
  setDarkMode,
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 transition-colors duration-500 dark:bg-slate-900 dark:text-white">
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Hero />
      <About />
      <Wizard />
    </div>
  );
}

export default Home;