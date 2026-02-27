import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Home, Heart, Settings, LogOut, Flame } from "lucide-react";

export default function Sidebar() {
    const location = useLocation();

    const navItems = [
        { path: "/home", name: "Home", icon: <Home size={20} /> },
        { path: "/dashboard", name: "Dashboard", icon: <LayoutDashboard size={20} /> },
        { path: "/favorites", name: "Favorites", icon: <Heart size={20} /> },
    ];

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="brand-logo" style={{ fontSize: '2rem', marginBottom: 0 }}>✨</div>
                <h1>Inspiro</h1>
            </div>

            <nav className="sidebar-nav" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                {navItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    >
                        {item.icon}
                        {item.name}
                    </Link>
                ))}
            </nav>

            <div className="sidebar-footer" style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div className="streak-mini" style={{ background: 'rgba(255,107,107,0.1)', padding: '1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <Flame size={24} color="#ff6b6b" />
                    <div>
                        <div style={{ fontWeight: 'bold', color: 'white' }}>12 Day Streak!</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Keep it up 🔥</div>
                    </div>
                </div>

                <Link to="#" className="nav-link"><Settings size={20} /> Settings</Link>
                <Link to="/" className="nav-link" style={{ color: 'var(--accent-red)' }} onClick={() => console.log('logout')}><LogOut size={20} /> Logout</Link>
            </div>
        </div>
    );
}
