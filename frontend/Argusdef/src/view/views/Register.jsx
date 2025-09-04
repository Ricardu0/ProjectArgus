import Cadastro from "../components/Cadastro";

export default function Register() {
    return (
        <div className="min-h-screen flex">
            {/* Painel esquerdo - Boas-vindas */}
            <div className="w-1/2 bg-gradient-to-br from-green-800 to-green-900 flex items-center justify-center p-8">
                <div className="text-center text-white">
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Argus</h1>
                    <p className="text-green-100 text-lg">Seja bem-vindo ao argus! </p>
                </div>
            </div>

            {/* Painel direito - Formulário */}
            <div className="w-1/2 bg-gray-50 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Criar Conta</h2>
                            <p className="text-gray-600">Preencha suas informações para começar</p>
                        </div>

                        <Cadastro />

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <p className="text-center text-gray-600">
                                Já possui uma conta?{" "}
                                <a
                                    href="/Login"
                                    className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
                                >
                                    Faça login aqui
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}