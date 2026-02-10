import { useState, useEffect } from 'react';
import { Search, Bell, Menu, X, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface NavbarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', name: '首页' },
  { id: 'international', name: '国际' },
  { id: 'domestic', name: '国内' },
  { id: 'tech', name: '科技' },
  { id: 'finance', name: '财经' },
  { id: 'society', name: '社会' },
];

export function Navbar({ activeCategory, onCategoryChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-[#3d3d3d] shadow-lg'
          : 'bg-black border-b border-[#3d3d3d]'
      )}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white hidden sm:block">
              InsightHub
            </span>
            <span className="text-xs text-[#a1a1a1] hidden lg:block ml-1">
              洞察汇
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  activeCategory === category.id
                    ? 'bg-[#3b82f6] text-white'
                    : 'text-[#e2e2e2] hover:text-white hover:bg-[#2d2d2d]'
                )}
              >
                {category.name}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden sm:flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-200">
                  <Input
                    type="text"
                    placeholder="搜索新闻..."
                    className="w-48 h-9 bg-[#1d1d1d] border-[#3d3d3d] text-white placeholder:text-[#a1a1a1] focus:border-[#3b82f6]"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-[#a1a1a1] hover:text-white hover:bg-[#2d2d2d]"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-[#a1a1a1] hover:text-white hover:bg-[#2d2d2d]"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-[#a1a1a1] hover:text-white hover:bg-[#2d2d2d] relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-80 bg-[#1d1d1d] border-[#3d3d3d]"
              >
                <div className="p-3 border-b border-[#3d3d3d]">
                  <span className="text-white font-medium">通知</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  <DropdownMenuItem className="p-3 cursor-pointer hover:bg-[#2d2d2d] focus:bg-[#2d2d2d]">
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0" />
                      <div>
                        <p className="text-white text-sm">美联储利率决议发布</p>
                        <p className="text-[#a1a1a1] text-xs mt-1">2小时前</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 cursor-pointer hover:bg-[#2d2d2d] focus:bg-[#2d2d2d]">
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 shrink-0" />
                      <div>
                        <p className="text-white text-sm">GPT-5正式发布</p>
                        <p className="text-[#a1a1a1] text-xs mt-1">12小时前</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-[#3b82f6] transition-all">
              <span className="text-white text-sm font-medium">用</span>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9 text-[#a1a1a1] hover:text-white hover:bg-[#2d2d2d]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[#3d3d3d] animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    onCategoryChange(category.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    'px-4 py-3 rounded-lg text-sm font-medium text-left transition-all duration-200',
                    activeCategory === category.id
                      ? 'bg-[#3b82f6] text-white'
                      : 'text-[#e2e2e2] hover:text-white hover:bg-[#2d2d2d]'
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
