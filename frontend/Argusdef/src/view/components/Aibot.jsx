import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Send } from 'lucide-react';

//Coloque aqui a chave da apii la do open router
const API_KEY = "sua-chave aqui";

const SYSTEM_PROMPT = {
    role: 'system',
    content:
        "Idioma: pt-BR. Persona: Argus, professor companheiro, didático, claro e resumido. " + +
            "Explique em passos simples, use listas quando ajudar. " +
        "Se faltar contexto, faça 1 pergunta objetiva. " +
        "Evite repetir a pergunta do usuário. " +
        "Seja conciso: 200-600 palavras máx, mas se for necessario, use mais."
};

const MODEL = 'deepseek/deepseek-r1-distill-llama-70b:free';
const MAX_HISTORY_TURNS = 6;
const MAX_TOKENS = 8000;

const Aibot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTo({ top: contentRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    const buildPayloadMessages = useMemo(() => {
        return (question) => {
            const asChat = messages.map(m => ({
                role: m.type === 'user' ? 'user' : 'assistant',
                content: m.content
            }));

            const compact = [];
            for (let i = asChat.length - 1; i >= 0 && compact.length < MAX_HISTORY_TURNS * 2; i--) {
                compact.unshift(asChat[i]);
            }

            compact.push({ role: 'user', content: question });
            return [SYSTEM_PROMPT, ...compact];
        };
    }, [messages]);

    const handleSendMessage = () => {
        const question = input.trim();
        if (!question || isLoading) return;

        setMessages(prev => [...prev, { type: 'user', content: question }]);
        setInput('');
        getAnswer(question);
    };

    const getAnswer = async (question) => {
        setIsLoading(true);
        const loadingId = crypto.randomUUID();
        setMessages(prev => [...prev, { type: 'assistant', content: '__loading__', id: loadingId }]);

        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: MODEL,
                    messages: buildPayloadMessages(question),
                    temperature: 0.5,
                    top_p: 0.9,
                    max_tokens: MAX_TOKENS
                })
            });

            const data = await response.json();
            const result = data?.choices?.[0]?.message?.content?.trim() || 'Desculpe, não consegui gerar uma resposta agora.';

            setMessages(prev =>
                prev.map(m => (m.id === loadingId ? { ...m, content: result } : m))
            );
        } catch (error) {
            setMessages(prev =>
                prev.map(m =>
                    m.content === '__loading__'
                        ? { ...m, content: 'Ops! Tive um problema para responder agora. Tente novamente em instantes.' }
                        : m
                )
            );
        } finally {
            setIsLoading(false);
        }
    };

    const Loader = () => (
        <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.2s]" />
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
        </div>
    );

    const onKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="mx-auto max-w-3xl h-[80vh] flex flex-col bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden">
            {/* Header verde com gradiente */}
            <header className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white p-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold">A</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold">Argus</h1>
                        <p className="text-sm opacity-90">Seu assistente educacional</p>
                    </div>
                </div>
            </header>

            {/* Messages */}
            <main
                ref={contentRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-emerald-50/30 to-white"
            >
                {messages.length === 0 && (
                    <div className="text-center py-8">
                        <div className="mb-6">
                            <h2 className="text-xl font-medium text-emerald-800 mb-2">
                                Como posso ajudar hoje?
                            </h2>
                            <p className="text-emerald-600">Faça uma pergunta para começar</p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-2">
                            {[
                                'Como funciona a recursão?',
                                'Explique o teorema de Pitágoras',
                                'Dicas de estudo eficaz'
                            ].map((suggestion, i) => (
                                <button
                                    key={i}
                                    onClick={() => setInput(suggestion)}
                                    className="px-4 py-2 bg-white border border-emerald-200 rounded-full text-sm text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {messages.map((msg, idx) => {
                    const isUser = msg.type === 'user';
                    const isLoadingMsg = msg.content === '__loading__';

                    return (
                        <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                                    isUser
                                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md'
                                        : 'bg-white border border-emerald-100 text-emerald-900 shadow-sm'
                                }`}
                            >
                                {isLoadingMsg ? <Loader /> : msg.content}
                            </div>
                        </div>
                    );
                })}
            </main>

            {/* Input */}
            <footer className="border-t border-emerald-100 bg-white p-4">
                <div className="flex gap-3 items-end">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={onKeyDown}
                        rows={1}
                        placeholder="Digite sua pergunta..."
                        className="flex-1 resize-none border border-emerald-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 bg-emerald-50/50"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={isLoading || !input.trim()}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-colors shadow-md ${
                            isLoading || !input.trim()
                                ? 'bg-emerald-600 cursor-not-allowed'
                                : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600'
                        }`}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default Aibot;