import { Home } from 'lucide-react'; // Import the Home icon

function Header() {
  return (
    <header className="fixed top-3 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-gray-900 bg-opacity-20 px-4 py-2 rounded-full shadow-lg backdrop-blur-sm flex items-center space-x-6">
        {/* Replaced "Home" text with the Home icon */}
        <a href="#hero" className="text-white text-sm font-bold tracking-wide">
          <Home className="w-6 h-6" /> {/* Home icon with appropriate sizing */}
        </a>
        <nav className="flex items-center space-x-4 text-sm">
          <a href="#about" className="text-white hover:text-blue-400 transition duration-200">About</a>
          <a href="#projects" className="text-white hover:text-blue-400 transition duration-200">Projects</a>
          <a href="#contact" className="text-white hover:text-blue-400 transition duration-200">Contact</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;