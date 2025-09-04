
import { BookOpen, FileText, Layers, Database, Settings, Users } from 'lucide-react';
import {useNavigate} from "react-router-dom";

export default function InitialPageAdm() {

    const navigate = useNavigate();
    const managementItems = [
        {
            title: "Gerencie Matérias",
            description: "Adicione, edite e organize as matérias do sistema",
            icon: BookOpen,
            color: "from-blue-500 to-blue-600",
            hoverColor: "hover:from-blue-600 hover:to-blue-700",
            route: "/materiaAdm"
        },
        {
            title: "Gerencie Temas",
            description: "Configure e organize os temas principais",
            icon: Layers,
            color: "from-purple-500 to-purple-600",
            hoverColor: "hover:from-purple-600 hover:to-purple-700",
            route: "/TemaAdm"
        },
        {
            title: "Gerencie Subtemas",
            description: "Estruture os subtemas e suas relações",
            icon: FileText,
            color: "from-green-500 to-green-600",
            hoverColor: "hover:from-green-600 hover:to-green-700",
            route: "/SubtemaAdm"
        },
        {
            title: "Gerencie Conteúdos",
            description: "Administre todo o conteúdo do sistema",
            icon: Database,
            color: "from-orange-500 to-orange-600",
            hoverColor: "hover:from-orange-600 hover:to-orange-700",
            route: "/ConteudoAdm"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-gradient-to-r from-green-700 via-green-800 to-green-900 shadow-xl">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="flex items-center justify-center space-x-4">
                        <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                            <Settings className="h-8 w-8 text-white" />
                        </div>
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-white mb-2">
                                Sistema Administrativo Argus
                            </h1>
                            <p className="text-green-100 text-lg">
                                Seja bem-vindo! Gerencie seu sistema com cuidado e precisão.
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Status do Sistema</p>
                                <p className="text-xl font-semibold text-gray-900">Ativo</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Database className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Base de Dados</p>
                                <p className="text-xl font-semibold text-gray-900">Conectada</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Settings className="h-6 w-6 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Último Acesso</p>
                                <p className="text-xl font-semibold text-gray-900">Agora</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Management Cards */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Painel de Gerenciamento</h2>
                    <p className="text-gray-600 mb-8">Escolha uma área para gerenciar no sistema Argus</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {managementItems.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
                            >
                                <div className="p-8">
                                    <div className="flex items-center mb-6">
                                        <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} shadow-lg`}>
                                            <IconComponent className="h-8 w-8 text-white" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                                                {item.title}
                                            </h3>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {item.description}
                                    </p>

                                    <button
                                    onClick={() => {navigate(item.route)}}
                                        className={`w-full bg-gradient-to-r ${item.color} ${item.hoverColor} text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center space-x-2`}>
                                        <span>Acessar Gerenciamento</span>
                                        <IconComponent className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* Decorative gradient */}
                                <div className={`h-2 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer Info */}
                <div className="mt-12 text-center">
                    <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg border border-gray-100">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-600 font-medium">Sistema operando normalmente</span>
                    </div>
                </div>
            </main>
        </div>
    );
}