import React, { useState, useEffect } from "react";

export default function GoalSetter() {
    const today = new Date().toISOString().split("T")[0]; // formato YYYY-MM-DD
    const [goals, setGoals] = useState({});
    const [studyTime, setStudyTime] = useState(60); // tempo default: 1h
    const [streak, setStreak] = useState(0);

    // Opções pré-definidas de tempo
    const timeOptions = [
        { label: "30 min", value: 30, type: "quick" },
        { label: "1 hora", value: 60, type: "standard" },
        { label: "1h 30min", value: 90, type: "focused" },
        { label: "2 horas", value: 120, type: "intensive" },
    ];

    // Carregar metas do localStorage
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("dailyGoals")) || {};
        setGoals(saved);
    }, []);

    // Calcular streak (sequência de dias confirmados)
    useEffect(() => {
        const sortedDates = Object.entries(goals)
            .sort(([a], [b]) => (a > b ? -1 : 1));

        let currentStreak = 0;
        for (const [date, { confirmed }] of sortedDates) {
            if (confirmed) {
                currentStreak++;
            } else {
                break;
            }
        }
        setStreak(currentStreak);
    }, [goals]);

    // Salvar metas no localStorage
    useEffect(() => {
        if (Object.keys(goals).length > 0) {
            localStorage.setItem("dailyGoals", JSON.stringify(goals));
        }
    }, [goals]);

    // Confirmar estudo de hoje
    const confirmToday = () => {
        setGoals({
            ...goals,
            [today]: { studyTime, confirmed: true },
        });
    };

    // Formatação de data em português
    const formatDate = (dateString) => {
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString("pt-BR", {
            day: "numeric",
            month: "short",
            year: "numeric",
            weekday: "short"
        });
    };

    // Obter estatísticas
    const getStats = () => {
        const totalDays = Object.keys(goals).length;
        const completedDays = Object.values(goals).filter(g => g.confirmed).length;
        const totalMinutes = Object.values(goals)
            .filter(g => g.confirmed)
            .reduce((sum, g) => sum + g.studyTime, 0);

        return { totalDays, completedDays, totalMinutes };
    };

    const stats = getStats();
    const isConfirmedToday = goals[today]?.confirmed;

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-green-100 flex items-center justify-center p-8">
            <div className="w-full max-w-4xl">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-light text-slate-700 mb-4">
                        Metas Diárias
                    </h1>
                    <p className="text-slate-500 font-light leading-relaxed">
                        Defina e acompanhe seus objetivos de estudo
                    </p>
                    <div className="w-16 h-px bg-gradient-to-r from-emerald-400 to-green-500 mx-auto mt-4"></div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="text-center">
                            <div className="text-3xl mb-2">🔥</div>
                            <div className="text-2xl font-light text-slate-700">{streak}</div>
                            <div className="text-sm text-slate-500 font-medium">Sequência</div>
                        </div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="text-center">
                            <div className="text-3xl mb-2">📚</div>
                            <div className="text-2xl font-light text-slate-700">{Math.round(stats.totalMinutes / 60)}h</div>
                            <div className="text-sm text-slate-500 font-medium">Total Estudado</div>
                        </div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="text-center">
                            <div className="text-3xl mb-2">📊</div>
                            <div className="text-2xl font-light text-slate-700">
                                {stats.totalDays > 0 ? Math.round((stats.completedDays / stats.totalDays) * 100) : 0}%
                            </div>
                            <div className="text-sm text-slate-500 font-medium">Taxa de Sucesso</div>
                        </div>
                    </div>
                </div>

                {/* Configuração de Meta de Hoje */}
                <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300 mb-8">

                    {isConfirmedToday ? (
                        /* Meta já confirmada */
                        <div className="text-center">
                            <div className="text-6xl mb-4">🎉</div>
                            <h2 className="text-2xl font-light text-slate-700 mb-2">
                                Meta de hoje cumprida!
                            </h2>
                            <p className="text-slate-500 mb-4">
                                Você estudou <span className="font-medium">{goals[today].studyTime} minutos</span> hoje
                            </p>
                            <div className="inline-block bg-gradient-to-r from-emerald-400 to-green-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                                ✅ Confirmado
                            </div>
                        </div>
                    ) : (
                        /* Definir meta de hoje */
                        <>
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-light text-slate-700 mb-2">
                                    Defina sua meta para hoje
                                </h2>
                                <p className="text-slate-500 font-light">
                                    Quanto tempo você pretende estudar hoje?
                                </p>
                            </div>

                            {/* Seleção de tempo */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                {timeOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setStudyTime(option.value)}
                                        className={`p-4 rounded-2xl font-light transition-all duration-300 ${
                                            studyTime === option.value
                                                ? 'bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-md'
                                                : 'bg-white/60 backdrop-blur-sm text-slate-600 hover:bg-white/80'
                                        } border border-white/20`}
                                    >
                                        <div className="text-lg mb-1">{option.label}</div>
                                        <div className="text-xs opacity-75 capitalize">
                                            {option.type === 'quick' && 'Rápido'}
                                            {option.type === 'standard' && 'Padrão'}
                                            {option.type === 'focused' && 'Focado'}
                                            {option.type === 'intensive' && 'Intensivo'}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Input customizado */}
                            <div className="text-center mb-8">
                                <div className="inline-block">
                                    <label className="block text-sm text-slate-500 font-medium mb-2">
                                        Ou defina um tempo personalizado
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            value={studyTime}
                                            onChange={(e) => setStudyTime(Number(e.target.value))}
                                            className="w-24 px-4 py-2 bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl text-center text-slate-700 font-light focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                                            min="5"
                                            max="480"
                                        />
                                        <span className="text-slate-500 font-light">minutos</span>
                                    </div>
                                </div>
                            </div>

                            {/* Botão confirmar */}
                            <div className="text-center">
                                <button
                                    onClick={confirmToday}
                                    className="px-8 py-4 bg-gradient-to-r from-emerald-400 to-green-500 text-white rounded-full font-light hover:from-emerald-500 hover:to-green-600 transition-all duration-300 shadow-sm hover:shadow-md"
                                >
                                    Confirmar Meta de Hoje
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Histórico */}
                <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                    <h2 className="text-xl font-light text-slate-700 mb-6 text-center">
                        Histórico de Estudos
                    </h2>

                    {Object.keys(goals).length === 0 ? (
                        <div className="text-center py-8 text-slate-400">
                            <div className="text-4xl mb-2">📝</div>
                            <p className="font-light">Nenhuma meta registrada ainda</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {Object.entries(goals)
                                .sort(([a], [b]) => (a > b ? -1 : 1)) // ordena decrescente (mais recente primeiro)
                                .slice(0, 7) // mostrar apenas os últimos 7 dias
                                .map(([date, { studyTime, confirmed }]) => (
                                    <div
                                        key={date}
                                        className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                                            confirmed
                                                ? 'bg-emerald-100/80 border-emerald-200 text-emerald-800'
                                                : 'bg-red-50/80 border-red-200 text-red-700'
                                        } border backdrop-blur-sm`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="text-xl">
                                                {confirmed ? '✅' : '❌'}
                                            </div>
                                            <div>
                                                <div className="font-medium">
                                                    {date === today ? 'Hoje' : formatDate(date)}
                                                </div>
                                                <div className="text-sm opacity-75">
                                                    {studyTime} minutos
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            confirmed
                                                ? 'bg-emerald-200 text-emerald-800'
                                                : 'bg-red-200 text-red-700'
                                        }`}>
                                            {confirmed ? 'Cumprido' : 'Não cumprido'}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}