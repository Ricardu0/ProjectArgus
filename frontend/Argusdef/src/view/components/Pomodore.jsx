import React, { useState, useEffect, useRef } from "react";

export default function Pomodoro() {
    const options = [
        { label: "25 min", value: 25 * 60, type: "focus" },
        { label: "50 min", value: 50 * 60, type: "deep" },
        { label: "1 hora", value: 60 * 60, type: "study" },
        { label: "1h 30min", value: 90 * 60, type: "project" },
    ];

    const [time, setTime] = useState(options[0].value);
    const [initialTime, setInitialTime] = useState(options[0].value);
    const [isRunning, setIsRunning] = useState(false);
    const [selectedOption, setSelectedOption] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    const audioRef = useRef(null);

    useEffect(() => {
        let timer;
        if (isRunning && time > 0) {
            timer = setInterval(() => {
                setTime((prev) => prev - 1);
            }, 1000);
        } else if (time === 0 && isRunning) {
            setIsRunning(false);
            setIsCompleted(true);
            if (audioRef.current) {
                audioRef.current.play().catch(() => {
                    // Fallback se não conseguir tocar o áudio
                    console.log("Pomodoro concluído!");
                });
            }
            // Reset após 3 segundos
            setTimeout(() => setIsCompleted(false), 3000);
        }
        return () => clearInterval(timer);
    }, [isRunning, time]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
            return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
        }
        return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const getProgress = () => {
        return ((initialTime - time) / initialTime) * 100;
    };

    const handleTimeSelect = (index) => {
        const option = options[index];
        setTime(option.value);
        setInitialTime(option.value);
        setIsRunning(false);
        setSelectedOption(index);
        setIsCompleted(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(initialTime);
        setIsCompleted(false);
    };

    const getStatusMessage = () => {
        if (isCompleted) return "🎉 Pomodoro concluído!";
        if (isRunning) return "⏱️ Focado e produtivo";
        return "🧘‍♀️ Pronto para começar";
    };

    const getMotivationalTip = () => {
        const tips = [
            "Mantenha o telefone longe da mesa",
            "Respire fundo e mantenha o foco",
            "Hidrate-se durante as pausas",
            "Um passo de cada vez",
            "Você consegue terminar isso!"
        ];
        return tips[Math.floor(Math.random() * tips.length)];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-green-100 flex items-center justify-center p-8 rounded-xl">
            <div className="w-full max-w-2xl">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-light text-slate-700 mb-4">
                        Pomodoro
                    </h1>
                    <p className="text-slate-500 font-light leading-relaxed">
                        Encontre seu ritmo ideal de produtividade
                    </p>
                    <div className="w-16 h-px bg-gradient-to-r from-emerald-400 to-green-500 mx-auto mt-4"></div>
                </div>

                {/* Timer Principal */}
                <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300 mb-8">

                    {/* Status */}
                    <div className="text-center mb-8">
                        <div className="text-lg text-slate-600 font-light mb-2">
                            {getStatusMessage()}
                        </div>
                        {!isRunning && !isCompleted && (
                            <div className="text-sm text-slate-400 italic">
                                {getMotivationalTip()}
                            </div>
                        )}
                    </div>

                    {/* Barra de Progresso */}
                    {initialTime > 0 && (
                        <div className="mb-8">
                            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${getProgress()}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-xs text-slate-400 mt-2">
                                <span>0:00</span>
                                <span>{formatTime(initialTime)}</span>
                            </div>
                        </div>
                    )}

                    {/* Display do Timer */}
                    <div className="text-center mb-8">
                        <div className={`text-6xl md:text-7xl font-light tabular-nums transition-all duration-300 ${
                            isRunning ? 'text-slate-700' : 'text-slate-500'
                        } ${isCompleted ? 'text-emerald-500' : ''}`}>
                            {formatTime(time)}
                        </div>
                    </div>

                    {/* Controles */}
                    <div className="flex gap-4 justify-center mb-8">
                        <button
                            onClick={() => setIsRunning(!isRunning)}
                            disabled={time === 0}
                            className={`px-8 py-4 rounded-full font-light transition-all duration-300 ${
                                isRunning
                                    ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                                    : 'bg-gradient-to-r from-emerald-400 to-green-500 text-white hover:from-emerald-500 hover:to-green-600'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {isRunning ? "Pausar" : "Iniciar"}
                        </button>

                        <button
                            onClick={handleReset}
                            className="px-8 py-4 bg-slate-100 text-slate-600 rounded-full font-light hover:bg-slate-200 transition-all duration-300"
                        >
                            Resetar
                        </button>
                    </div>
                </div>

                {/* Seleção de Tempo */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {options.map((option, index) => (
                        <button
                            key={option.value}
                            onClick={() => handleTimeSelect(index)}
                            className={`p-4 rounded-2xl font-light transition-all duration-300 ${
                                selectedOption === index
                                    ? 'bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-md'
                                    : 'bg-white/60 backdrop-blur-sm text-slate-600 hover:bg-white/80'
                            } border border-white/20`}
                        >
                            <div className="text-lg mb-1">{option.label}</div>
                            <div className="text-xs opacity-75 capitalize">
                                {option.type === 'focus' && 'Foco'}
                                {option.type === 'deep' && 'Concentração'}
                                {option.type === 'study' && 'Estudo'}
                                {option.type === 'project' && 'Projeto'}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Dicas */}
                <div className="mt-8 text-center">
                    <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <h3 className="text-sm text-slate-500 uppercase tracking-wider mb-3 font-medium">
                            Dicas para melhor produtividade
                        </h3>
                        <div className="text-sm text-slate-600 font-light space-y-1">
                            <p>• Elimine distrações do ambiente</p>
                            <p>• Mantenha água por perto</p>
                            <p>• Faça pausas regulares</p>
                        </div>
                    </div>
                </div>

                {/* Áudio */}
                <audio
                    ref={audioRef}
                    preload="auto"
                >
                    <source src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg" type="audio/ogg" />
                    <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTOQ2fS9diMFl2+J" type="audio/wav" />
                </audio>
            </div>
        </div>
    );
}