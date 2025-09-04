import { useEffect, useState } from "react";

export default function Homecomponent() {
    const [currentDate, setCurrentDate] = useState("");
    const [currentTime, setCurrentTime] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    const latitude = -23.6025;
    const longitude = -46.9192;

    const fetchWeather = async () => {
        setLoading(true);
        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`;
            const res = await fetch(url);
            const data = await res.json();

            const temp = Math.round(data.current.temperature_2m);
            const code = data.current.weather_code;

            const mapped = mapWeatherCode(code);
            setWeather({ temp, ...mapped });
        } catch (error) {
            console.error("Erro ao buscar clima:", error);
        } finally {
            setLoading(false);
        }
    };

    const mapWeatherCode = (code) => {
        const mapping = {
            0: { desc: "Céu limpo", icon: "☀️" },
            1: { desc: "Principalmente limpo", icon: "🌤️" },
            2: { desc: "Parcialmente nublado", icon: "⛅" },
            3: { desc: "Nublado", icon: "☁️" },
            45: { desc: "Neblina", icon: "🌫️" },
            48: { desc: "Neblina congelante", icon: "🌫️❄️" },
            51: { desc: "Chuvisco leve", icon: "🌦️" },
            61: { desc: "Chuva leve", icon: "🌧️" },
            71: { desc: "Neve leve", icon: "❄️" },
            95: { desc: "Tempestade", icon: "⛈️" },
        };
        return mapping[code] || { desc: "Clima desconhecido", icon: "❓" };
    };

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const dateOptions = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            };
            const timeOptions = {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            };
            setCurrentDate(now.toLocaleDateString("pt-BR", dateOptions));
            setCurrentTime(now.toLocaleTimeString("pt-BR", timeOptions));
        };

        updateDateTime();
        const timeInterval = setInterval(updateDateTime, 1000);
        fetchWeather();

        return () => clearInterval(timeInterval);
    }, []);

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center p-6 font-sans">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-200 max-w-xl w-full text-center">
                <h1 className="text-4xl text-green-700 font-semibold mb-2">Bem-vindo!</h1>
                <h2 className="mb-2"> Acompanhe abaixo os dados diários. </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-100 rounded-xl p-6 border border-green-300 shadow-sm">
                        <div className="text-green-700 uppercase text-sm font-medium mb-2">Data</div>
                        <div className="text-2xl text-green-900 font-bold">{currentDate || "Carregando..."}</div>
                    </div>

                    <div className="bg-green-100 rounded-xl p-6 border border-green-300 shadow-sm">
                        <div className="text-green-700 uppercase text-sm font-medium mb-2">Horário</div>
                        <div className="text-2xl text-green-900 font-bold">{currentTime || "Carregando..."}</div>
                    </div>

                    <div className="bg-green-200 rounded-xl p-6 border border-green-300 shadow-sm col-span-1 md:col-span-2 flex flex-col md:flex-row items-center justify-center gap-4">
                        {weather ? (
                            <>
                                <div className="text-4xl">{weather.icon}</div>
                                <div className="text-left">
                                    <div className="text-3xl text-green-800 font-bold">{weather.temp}°C</div>
                                    <div className="text-green-700 font-medium">{weather.desc}</div>
                                    <div className="text-green-600 text-sm">Cotia, SP</div>
                                </div>
                            </>
                        ) : (
                            <div className="text-green-700">Carregando clima...</div>
                        )}
                    </div>
                </div>

                <button
                    className={`bg-green-100 border-2 border-green-300 text-green-800 font-semibold py-2 px-6 rounded-full transition-all duration-300 hover:bg-green-200 hover:border-green-400 ${
                        loading ? "opacity-60 pointer-events-none" : ""
                    }`}
                    onClick={fetchWeather}
                >
                    {loading ? "🔄 Atualizando..." : "🔄 Atualizar Clima"}
                </button>
            </div>
        </div>
    );
}
