import React, { useState, useEffect, useRef } from 'react';
import { Bot, Zap, TrendingUp, Clock, Shield, Sparkles, ArrowRight, CheckCircle2, Users, BarChart3, MessageSquare, X, Send } from 'lucide-react';

export default function AIAutomationLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
  if (!userInput.trim()) return;

  const newMessage = { type: 'user', text: userInput };
  setMessages(prev => [...prev, newMessage]);
  setUserInput('');
  setIsLoading(true);

  try {
    const response = await fetch(import.meta.env.VITE_API_URL || 'http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userInput })
    });

    const data = await response.json();
    setMessages(prev => [...prev, { type: 'assistant', text: data.response }]);
  } catch (error) {
    setMessages(prev => [...prev, { 
      type: 'assistant', 
      text: 'Вибачте, виникла помилка. Переконайтесь, що сервер запущено на localhost:5000' 
    }]);
  } finally {
    setIsLoading(false);
  }
};

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const services = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "AI-Чат-боти",
      description: "Автоматизуйте обслуговування клієнтів 24/7. Миттєві відповіді, обробка запитів, підвищення задоволеності."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Аналітика даних",
      description: "Перетворюйте дані в рішення. Прогнозування попиту, аналіз трендів, автоматичні звіти."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Автоматизація робочих процесів",
      description: "Звільніть команду від рутини. Обробка документів, планування, інтеграція систем."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "CRM оптимізація",
      description: "Розумне управління клієнтами. Сегментація, персоналізація, прогнозування відтоку."
    }
  ];

  const benefits = [
    { icon: <Clock className="w-6 h-6" />, title: "Економія часу до 70%", desc: "Автоматизуйте рутинні завдання" },
    { icon: <TrendingUp className="w-6 h-6" />, title: "Зростання продажів на 40%", desc: "Покращте обслуговування клієнтів" },
    { icon: <Shield className="w-6 h-6" />, title: "Зменшення помилок на 95%", desc: "Точність AI-рішень" },
    { icon: <Sparkles className="w-6 h-6" />, title: "ROI за 3-6 місяців", desc: "Швидка окупність інвестицій" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/30 mb-8">
              <Bot className="w-5 h-5 mr-2 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Нове покоління бізнес-автоматизації</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 leading-tight">
              AI-Автоматизація<br />для вашого бізнесу
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Впроваджуємо штучний інтелект у робочі процеси МСБ. Збільшуйте продуктивність, скорочуйте витрати, зростайте швидше.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                Отримати консультацію
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                Дивитись демо
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
            Результати, які відчутні з першого місяця
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">Наші послуги</h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Комплексні рішення для автоматизації будь-яких бізнес-процесів
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                onMouseEnter={() => setActiveService(index)}
                className={`p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl border transition-all duration-500 cursor-pointer ${
                  activeService === index 
                    ? 'border-purple-500 shadow-2xl shadow-purple-500/30 scale-105' 
                    : 'border-white/10 hover:border-purple-500/50'
                }`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 ${
                  activeService === index ? 'scale-110 rotate-6' : ''
                }`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed">{service.description}</p>
                
                <div className="mt-6 flex items-center text-purple-400 font-semibold group">
                  <span>Детальніше</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/30">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">150+</div>
                <div className="text-gray-300">Успішних проектів</div>
              </div>
              <div>
                <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">98%</div>
                <div className="text-gray-300">Задоволених клієнтів</div>
              </div>
              <div>
                <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 mb-2">2.5x</div>
                <div className="text-gray-300">Середнє зростання ефективності</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Як ми працюємо</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Аналіз", desc: "Вивчаємо ваші процеси та знаходимо точки оптимізації" },
              { num: "02", title: "Розробка", desc: "Створюємо індивідуальне AI-рішення під ваш бізнес" },
              { num: "03", title: "Впровадження", desc: "Інтегруємо систему з мінімальними змінами в роботі" },
              { num: "04", title: "Підтримка", desc: "Навчаємо команду та забезпечуємо технічну підтримку" }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg shadow-purple-500/50">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/30">
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-purple-400" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Готові автоматизувати свій бізнес?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Отримайте безкоштовну консультацію та дізнайтесь, як AI може трансформувати ваші процеси
            </p>
            <button className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 inline-flex items-center">
              Замовити консультацію
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
            <div className="flex items-center mb-4 md:mb-0">
              <Bot className="w-8 h-8 text-purple-400 mr-2" />
              <span className="font-bold text-xl text-white">AI Automation</span>
            </div>
            <div className="text-sm">
              © 2025 AI Automation. Всі права захищені.
            </div>
          </div>
        </div>
      </div>

      {/* Chatbox */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Window */}
        {isChatOpen && (
          <div className="mb-4 w-96 h-[500px] bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-500/30 flex flex-col overflow-hidden animate-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">AI Асистент</h3>
                  <p className="text-xs text-white/80">Завжди онлайн</p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="hover:bg-white/20 rounded-lg p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-400 mt-8">
                  <Bot className="w-12 h-12 mx-auto mb-3 text-purple-400" />
                  <p className="text-sm">Привіт! Я AI-асистент. Задайте мені будь-яке питання про автоматизацію бізнесу.</p>
                </div>
              )}
              
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.type === 'user' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'bg-white/10 text-gray-100'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-2xl px-4 py-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Введіть запитання..."
                  className="flex-1 bg-white/10 text-white placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !userInput.trim()}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chat Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl hover:shadow-purple-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        >
          {isChatOpen ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <MessageSquare className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>
    </div>
  );
}