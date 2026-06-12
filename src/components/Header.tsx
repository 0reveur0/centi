import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="WenZi Logo" className="h-8 w-auto" />
            <span className="font-bold text-xl text-primary">WenZi</span>
          </Link>
          <nav>
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
              <Home className="h-6 w-6" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
