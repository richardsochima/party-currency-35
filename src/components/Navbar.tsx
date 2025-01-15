import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-playfair font-bold text-primary">Party</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="font-montserrat text-gray-700 hover:text-primary">Home</a>
            <a href="#about" className="font-montserrat text-gray-700 hover:text-primary">About</a>
            <a href="#features" className="font-montserrat text-gray-700 hover:text-primary">Features</a>
            <a href="#contact" className="font-montserrat text-gray-700 hover:text-primary">Contact</a>
            <button className="font-montserrat bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark">
              Sign Up
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 font-montserrat text-gray-700 hover:text-primary">Home</a>
              <a href="#about" className="block px-3 py-2 font-montserrat text-gray-700 hover:text-primary">About</a>
              <a href="#features" className="block px-3 py-2 font-montserrat text-gray-700 hover:text-primary">Features</a>
              <a href="#contact" className="block px-3 py-2 font-montserrat text-gray-700 hover:text-primary">Contact</a>
              <button className="w-full text-left px-3 py-2 font-montserrat bg-primary text-white rounded-md hover:bg-primary-dark">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};