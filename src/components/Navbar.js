import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 

  Home, PlusCircle, ListChecks, ShoppingBag, Users, 
  Bell, Menu, X, MessageSquare,
  Settings, LogOut, ChevronDown, UserCircle
} from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (window.innerWidth > 768) {
                setIsMenuOpen(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    // Control body scrolling based on menu state
    useEffect(() => {
        if (isMenuOpen) {
            // Save current scroll position
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
        } else {
            // Restore scroll position
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
        
        return () => {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
        };
    }, [isMenuOpen]);

    const isActive = (path) => {
        return location.pathname === path;
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        // Close dropdowns when toggling menu
        setIsNotificationOpen(false);
        setIsProfileOpen(false);
    };

    const toggleNotifications = (e) => {
        e.stopPropagation();
        setIsNotificationOpen(!isNotificationOpen);
        setIsProfileOpen(false);
    };

    const toggleProfile = (e) => {
        e.stopPropagation();
        setIsProfileOpen(!isProfileOpen);
        setIsNotificationOpen(false);
    };

    const handleLogout = () => {
        // Clear all sessionStorage items instead of just localStorage
        sessionStorage.clear();
        
        // Option to also clear any persistent login info
        localStorage.removeItem('ksp_username');
        
        // Navigate to login page with replace to prevent going back
        navigate('/login', { replace: true });
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const closeDropdowns = (e) => {
            // Only close if clicking outside the dropdown containers
            if (!e.target.closest('.notification-container') && 
                !e.target.closest('.profile-container')) {
                setIsNotificationOpen(false);
                setIsProfileOpen(false);
            }
        };
        
        document.addEventListener('click', closeDropdowns);
        return () => document.removeEventListener('click', closeDropdowns);
    }, []);

    // Close mobile menu when clicking a link
    const closeMenuOnClick = () => {
        if (windowWidth <= 768) {
            setIsMenuOpen(false);
        }
    };

    // Improve dropdown positioning for mobile
    const getDropdownPosition = () => {
        return windowWidth <= 640 ? { top: isProfileOpen ? '50px' : '40px', right: '0' } : {};
    };

    return (
        <>
            {/* Backdrop overlay for mobile menu */}
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                    onClick={toggleMenu}
                    aria-hidden="true"
                />
            )}
            
            <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-800/95 backdrop-blur-sm shadow-lg transition-all duration-300 ${
                scrolled ? 'py-2' : 'py-3'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <Link to="/" className="flex items-center space-x-2 group">
                            <div className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 text-white group-hover:shadow-md transition-all duration-200 transform group-hover:scale-110">
                                <ShoppingBag className="w-5 h-5" />
                            </div>
                            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">KSP Admin</span>
                        </Link>
                        
                        <button 
                            className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors duration-200" 
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                        
                        {/* Fixed mobile menu implementation */}
                        <div 
                            className={`fixed md:relative top-0 left-0 bottom-0 w-full md:w-auto md:flex-1 bg-white dark:bg-gray-800 md:bg-transparent z-50 md:z-auto flex flex-col md:flex-row md:items-center transition-transform duration-300 ease-out ${
                                isMenuOpen 
                                    ? 'translate-x-0' 
                                    : '-translate-x-full md:translate-x-0'
                            } md:visible md:opacity-100 overflow-y-auto md:overflow-visible h-full md:h-auto shadow-xl md:shadow-none`}
                            style={{
                                width: isMenuOpen ? '280px' : windowWidth > 768 ? 'auto' : '0',
                                visibility: windowWidth <= 768 && !isMenuOpen ? 'hidden' : 'visible',
                            }}
                        >
                            <div className="flex items-center justify-between p-4 md:hidden border-b border-gray-200 dark:border-gray-700">
                                <Link to="/" className="flex items-center space-x-2 group" onClick={closeMenuOnClick}>
                                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                                        <ShoppingBag className="w-5 h-5" />
                                    </div>
                                    <span className="text-lg font-bold text-gray-900 dark:text-white">KSP Admin</span>
                                </Link>
                                <button 
                                    className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none"
                                    onClick={toggleMenu}
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            
                            <ul className="flex flex-col md:flex-row md:space-x-1 lg:space-x-2 px-4 md:px-0 space-y-1 md:space-y-0 mt-4 md:mt-0">
                                {/* Larger touch targets for mobile */}
                                <li className="mb-1 md:mb-0">
                                    <Link 
                                        to="/" 
                                        onClick={closeMenuOnClick}
                                        className={`flex items-center py-3 md:py-2 px-4 md:px-3 rounded-lg transition-all duration-200 ${
                                            isActive('/') 
                                                ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 dark:from-indigo-900/40 dark:to-purple-900/40 dark:text-indigo-300 font-medium shadow-sm'
                                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700/50 hover:shadow-sm transform hover:translate-y-[-1px]'
                                        }`}
                                    >
                                        <Home className={`w-5 h-5 mr-2 ${isActive('/') ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`} />
                                        <span>Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/add-product" 
                                        onClick={closeMenuOnClick}
                                        className={`flex items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                                            isActive('/add-product') 
                                                ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 dark:from-indigo-900/40 dark:to-purple-900/40 dark:text-indigo-300 font-medium shadow-sm'
                                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700/50 hover:shadow-sm transform hover:translate-y-[-1px]'
                                        }`}
                                    >
                                        <PlusCircle className={`w-5 h-5 mr-2 ${isActive('/add-product') ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`} />
                                        <span>Add Product</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/manage-products" 
                                        onClick={closeMenuOnClick}
                                        className={`flex items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                                            isActive('/manage-products') 
                                                ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 dark:from-indigo-900/40 dark:to-purple-900/40 dark:text-indigo-300 font-medium shadow-sm'
                                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700/50 hover:shadow-sm transform hover:translate-y-[-1px]'
                                        }`}
                                    >
                                        <ListChecks className={`w-5 h-5 mr-2 ${isActive('/manage-products') ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`} />
                                        <span>Products</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/orders" 
                                        onClick={closeMenuOnClick}
                                        className={`flex items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                                            isActive('/orders') 
                                                ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 dark:from-indigo-900/40 dark:to-purple-900/40 dark:text-indigo-300 font-medium shadow-sm'
                                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700/50 hover:shadow-sm transform hover:translate-y-[-1px]'
                                        }`}
                                    >
                                        <ShoppingBag className={`w-5 h-5 mr-2 ${isActive('/orders') ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`} />
                                        <span>Orders</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/users" 
                                        onClick={closeMenuOnClick}
                                        className={`flex items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                                            isActive('/users') 
                                                ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 dark:from-indigo-900/40 dark:to-purple-900/40 dark:text-indigo-300 font-medium shadow-sm'
                                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700/50 hover:shadow-sm transform hover:translate-y-[-1px]'
                                        }`}
                                    >
                                        <Users className={`w-5 h-5 mr-2 ${isActive('/users') ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`} />
                                        <span>Users</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/contacts" 
                                        onClick={closeMenuOnClick}
                                        className={`flex items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                                            isActive('/contacts') 
                                                ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 dark:from-indigo-900/40 dark:to-purple-900/40 dark:text-indigo-300 font-medium shadow-sm'
                                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700/50 hover:shadow-sm transform hover:translate-y-[-1px]'
                                        }`}
                                    >
                                        <MessageSquare className={`w-5 h-5 mr-2 ${isActive('/contacts') ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`} />
                                        <span>Messages</span>
                                        <span className="ml-2 px-1.5 py-0.5 text-xs font-medium rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm">3</span>
                                    </Link>
                                </li>
                            </ul>
                            
                            {/* Improved mobile layout for toolbar */}
                            <div className="mt-auto md:mt-0 md:ml-auto flex flex-row md:flex-row items-center space-x-2 md:space-x-4 px-4 md:px-0 py-4 md:py-0 border-t md:border-0 border-gray-200 dark:border-gray-700">
                                <div className="relative notification-container">
                                    <button 
                                        className="p-3 md:p-2 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-indigo-900/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                                        onClick={toggleNotifications}
                                        aria-label="Notifications"
                                    >
                                        <Bell className="w-6 h-6 md:w-5 md:h-5" />
                                        <span className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 md:h-4 md:w-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-xs font-bold text-white shadow-sm animate-pulse">2</span>
                                    </button>
                                    
                                    {isNotificationOpen && (
                                        <div 
                                            className="absolute right-0 mt-2 w-screen max-w-[320px] sm:max-w-[360px] bg-white dark:bg-gray-800 rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 transform origin-top-right transition-all duration-200 scale-100"
                                            style={windowWidth <= 640 ? {right: '-8px'} : {}}
                                        >
                                            <div className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Notifications</h3>
                                            </div>
                                            <ul className="py-1 max-h-60 overflow-y-auto">
                                                <li className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 rounded-lg p-2 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-600 dark:text-blue-400">
                                                            <ShoppingBag className="w-4 h-4" />
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium text-gray-900 dark:text-white">New order received</p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">5 minutes ago</p>
                                                        </div>
                                                        <div className="ml-auto">
                                                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 rounded-lg p-2 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-purple-400">
                                                            <MessageSquare className="w-4 h-4" />
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium text-gray-900 dark:text-white">New message from customer</p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</p>
                                                        </div>
                                                        <div className="ml-auto">
                                                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 rounded-lg p-2 bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 text-green-600 dark:text-green-400">
                                                            <Users className="w-4 h-4" />
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-sm font-medium text-gray-900 dark:text-white">5 new users registered</p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">3 hours ago</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div className="py-2 px-4 border-t border-gray-200 dark:border-gray-700">
                                                <a href="#" className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">View all notifications</a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="relative profile-container">
                                    <button 
                                        className="flex items-center text-sm rounded-lg p-2 px-3 md:p-1 md:px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                                        onClick={toggleProfile}
                                    >
                                        <img 
                                            src="https://i.pravatar.cc/150?img=12" 
                                            alt="Profile" 
                                            className="h-8 w-8 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-sm"
                                        />
                                        <span className="hidden md:block ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Admin</span>
                                        <ChevronDown className="hidden md:block ml-1 w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    </button>
                                    
                                    {isProfileOpen && (
                                        <div 
                                            className="absolute right-0 mt-2 w-64 sm:w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 transform origin-top-right transition-all duration-200 scale-100"
                                            style={getDropdownPosition()}
                                        >
                                            <div className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-t-lg">
                                                <div className="flex items-center">
                                                    <img 
                                                        src="https://i.pravatar.cc/150?img=12" 
                                                        alt="Profile" 
                                                        className="h-10 w-10 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-md"
                                                    />
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">admin@ksp.com</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="py-1">
                                                <a 
                                                    href="#" 
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-150"
                                                >
                                                    <UserCircle className="mr-3 w-4 h-4 text-gray-500 dark:text-gray-400" />
                                                    <span>My Profile</span>
                                                </a>
                                                <a 
                                                    href="#" 
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-150"
                                                >
                                                    <Settings className="mr-3 w-4 h-4 text-gray-500 dark:text-gray-400" />
                                                    <span>Settings</span>
                                                </a>
                                                <button 
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150"
                                                >
                                                    <LogOut className="mr-3 w-4 h-4" />
                                                    <span>Logout</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {/* Enhanced close button for mobile */}
                            <button 
                                className="md:hidden mb-6 mx-4 mt-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center justify-center shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                                onClick={toggleMenu}
                            >
                                <X className="w-5 h-5 mr-2" />
                                <span>Close Menu</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            
            {/* Increased spacer height to prevent content being cut off */}
            <div className="h-16 sm:h-18 md:h-20"></div>
        </>
    );
};

export default Navbar;