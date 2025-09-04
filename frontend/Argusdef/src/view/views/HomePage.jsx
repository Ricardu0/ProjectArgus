import React from 'react';
import { Users, Award, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';


// eslint-disable-next-line react-hooks/rules-of-hooks
// Componente para logo customizado - substitua pelo seu SVG
const CustomLogo = ({ className = "w-16 h-16", color = "text-green-600" }) => {
    return (
        <div className={`${className} ${color} bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300`}>
            <span className="text-xs text-gray-500 text-center">Seu Logo</span>
        </div>
    );
};


export default function SimpleLanding() {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-green-50/30 to-blue-50/30 relative overflow-hidden">
            {/* Efeitos de fundo suaves */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-200/20 to-green-200/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-100/10 to-blue-100/10 rounded-full blur-3xl"></div>
            </div>
            {/* Primeira seção - Split verde e branco */}
            <div className="h-screen flex p-8 gap-8 relative z-10">
                {/* Metade verde com logo */}
                <div className="w-1/2 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-xl relative overflow-hidden">
                    {/* Efeito de brilho sutil */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>
                    <div className="text-center relative z-10">
                        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-full mb-6 inline-block shadow-lg border border-white/20">
                            <CustomLogo />
                        </div>
                        <h1 className="text-4xl font-bold text-white drop-shadow-lg">Argus</h1>
                    </div>
                </div>

                {/* Metade branca com frase e botões */}
                <div className="w-1/2 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center p-12 shadow-xl border border-gray-100/50 relative overflow-hidden">
                    {/* Efeito de brilho sutil */}
                    <div className="absolute inset-0 bg-gradient-to-bl from-blue-50/30 via-transparent to-green-50/30"></div>
                    <div className="text-center space-y-8 max-w-md relative z-10">
                        <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                            Comece hoje os seus estudos de maneira guiada
                        </h2>

                        <div className="space-y-4">
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                Fazer Login
                            </button>
                            <button
                                onClick={() => navigate('/register')}
                                className="w-full border-2 border-green-500 text-green-600 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 hover:text-white py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 bg-white/80 backdrop-blur-sm">
                                Registrar-se
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Segunda seção - Benefícios */}
            <div className="py-16 bg-white/70 backdrop-blur-sm relative z-10">
                <div className="max-w-6xl mx-auto px-8">
                    <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Benefícios do Sistema
                    </h3>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                            <h4 className="text-xl font-semibold text-gray-900 mb-3">
                                Aprendizado Colaborativo
                            </h4>
                            <p className="text-gray-600">
                                Estude em grupo e compartilhe conhecimento com outros alunos da plataforma.
                            </p>
                        </div>

                        <div className="text-center bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h4 className="text-xl font-semibold text-gray-900 mb-3">
                                Flexibilidade de Horário
                            </h4>
                            <p className="text-gray-600">
                                Acesse o conteúdo quando quiser, no seu próprio ritmo de aprendizado.
                            </p>
                        </div>

                        <div className="text-center bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                            <h4 className="text-xl font-semibold text-gray-900 mb-3">
                                Certificados Válidos
                            </h4>
                            <p className="text-gray-600">
                                Receba certificados reconhecidos ao completar os cursos disponíveis.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Terceira seção - Informações aleatórias */}
            <div className="py-16 bg-gradient-to-r from-white/80 to-blue-50/50 backdrop-blur-sm relative z-10">
                <div className="max-w-6xl mx-auto px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Informações sobre a plataforma */}
                        <div className="md:col-span-2">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                Sobre Nossa Plataforma
                            </h3>

                            <div className="space-y-4 text-gray-600 text-center max-w-4xl mx-auto">
                                <p>
                                    Fundada em 2020, nossa plataforma educacional já transformou
                                    a vida de milhares de estudantes em todo o Brasil.
                                </p>
                                <p>
                                    Utilizamos tecnologia de ponta para oferecer uma experiência
                                    de aprendizado única e personalizada para cada usuário.
                                </p>
                                <p>
                                    Nossa missão é democratizar o acesso à educação de qualidade,
                                    tornando o conhecimento acessível a todos.
                                </p>
                            </div>

                            <div className="mt-8 p-6 bg-gradient-to-r from-green-50/80 to-blue-50/80 backdrop-blur-sm rounded-lg max-w-2xl mx-auto shadow-lg border border-white/50">
                                <TrendingUp className="w-8 h-8 text-green-600 mb-2 mx-auto" />
                                <p className="text-sm text-gray-700 text-center">
                                    <strong>Crescimento contínuo:</strong> Nossa base de usuários
                                    cresce 30% a cada mês, comprovando a qualidade do nosso serviço.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer simples */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="max-w-6xl mx-auto px-8 text-center">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <CustomLogo className="w-8 h-8" color="text-green-400" />
                        <span className="text-xl font-bold">Argus</span>
                    </div>
                    <p className="text-gray-400">
                        © 2025 Argus. Transformando vidas através da educação.
                    </p>
                </div>
            </footer>
        </div>
    );
}