// src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import {
    Home as HomeIcon,
    Target,
    Clock,
    MessageSquare,
    Settings,
    ArrowRight,
    Sparkles,
} from 'lucide-react';

// Configuração dos itens do menu
const MENU_ITEMS = [
    { name: 'Início', path: '/test2', icon: HomeIcon, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { name: 'Árvore de Conhecimento', path: '/', icon: Sparkles, color: 'text-blue-400', bgColor: 'bg-blue-50' },
    { name: 'Metas', path: '/goalsetter', icon: Target, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { name: 'Pomodoro', path: '/pomodoro', icon: Clock, color: 'text-red-600', bgColor: 'bg-red-50' },
    { name: 'Argus (Chatbot)', path: '/aibot', icon: MessageSquare, color: 'text-purple-600', bgColor: 'bg-purple-50' },
];

// Cabeçalho da sidebar
const SidebarHeader = () => (
    <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-green-50">
        <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-3">
                <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-gray-800">Argus</h2>
                <p className="text-sm text-gray-600">Seu auxílio quando precisar</p>
            </div>
        </div>
    </div>
);

// Item individual do menu
const SidebarItem = ({ name, path, icon: Icon, color, bgColor, isActive }) => (
    <Link
        to={path}
        className={`flex items-center p-4 mb-2 rounded-xl transition-all duration-200 group ${
            isActive
                ? `${bgColor} ${color} shadow-lg scale-[1.02]`
                : 'text-gray-600 hover:bg-gray-50 hover:shadow-md hover:scale-[1.01]'
        }`}
    >
        <div
            className={`p-2 rounded-lg mr-4 transition-all duration-200 ${
                isActive
                    ? 'bg-white shadow-sm'
                    : 'group-hover:bg-white group-hover:shadow-sm'
            }`}
        >
            <Icon className="w-5 h-5" />
        </div>
        <span className="font-semibold">{name}</span>
        {isActive && <ArrowRight className="w-4 h-4 ml-auto opacity-60" />}
    </Link>
);

// Rodapé da sidebar
const SidebarFooter = () => (
    <div className="p-4 border-t border-gray-100">
        <Link
            to="/configuracoes"
            className="flex items-center p-3 rounded-xl text-gray-600 hover:bg-gray-50 transition"
        >
            <div className="p-2 rounded-lg mr-4 group-hover:bg-white">
                <Settings className="w-5 h-5" />
            </div>
            <span className="font-semibold">Configurações</span>
        </Link>
    </div>
);

export default function Sidebar() {
    const location = useLocation();

    return (
        <aside className="w-72 bg-white shadow-xl border-r border-gray-100 flex flex-col">
            <SidebarHeader />
            <nav className="p-4 flex-1">
                {MENU_ITEMS.map((item) => (
                    <SidebarItem
                        key={item.name}
                        {...item}
                        isActive={location.pathname.startsWith(item.path)}
                    />
                ))}
            </nav>
            <SidebarFooter />
        </aside>
    );
}
