import google.generativeai as genai
import csv
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Дозволяємо запити з вашого Vercel домену
CORS(app, resources={
    r"/*": {
        "origins": [
            "http://localhost:5173",
            "https://*.vercel.app",  # Дозволяє всі Vercel домени
            "https://your-project.vercel.app"  # Ваш конкретний домен
        ]
    }
})

# ============ СЕКЦІЯ 1: Функції ============

def load_knowledge_base(file_path: str) -> str:
    """Завантажує базу знань з CSV-файлу"""
    knowledge_base = []
    try:
        with open(file_path, mode='r', encoding='utf-8') as csvfile:
            reader = csv.reader(csvfile)
            next(reader)
            for row in reader:
                if len(row) == 2:
                    question, answer = row
                    knowledge_base.append(f"П: {question.strip()}\nВ: {answer.strip()}")
        if not knowledge_base:
            return "Помилка: База знань порожня."
        return "\n\n".join(knowledge_base)
    except FileNotFoundError:
        return f"Помилка: Файл '{file_path}' не знайдено."
    except Exception as e:
        return f"Помилка при читанні файлу: {e}"

def get_gemini_response(user_question: str, knowledge_base: str, business_name: str) -> str:
    """Отримує відповідь від Gemini API"""
    prompt_template = f"""### ПЕРСОНА ###
Ти — експертний AI-асистент компанії {business_name}, яка спеціалізується на впровадженні штучного інтелекту та автоматизації бізнес-процесів. 
Ти доброзичливий, професійний, та завжди готовий допомогти.

### ТВОЯ РОЛЬ ###
1. **Пріоритет базі знань**: Спочатку завжди перевіряй базу знань нижче. Якщо там є релевантна інформація - використовуй її як основу відповіді.

2. **Додавай цінність**: Можеш розширювати відповіді додатковим контекстом, прикладами, порадами щодо:
   - AI-технологій та автоматизації
   - Переваг впровадження AI в бізнес
   - Кращих практик у сфері
   - Трендів у галузі
   - Загальних порад про оптимізацію процесів

3. **Природна розмова**: Веди діалог природно. Можеш:
   - Ставити уточнюючі питання
   - Пропонувати додаткові рішення
   - Давати рекомендації на основі контексту розмови
   - Пояснювати технічні терміни простою мовою

4. **Обмеження**: 
   - НЕ вигадуй конкретні ціни, дати або технічні деталі про послуги компанії, якщо їх немає в базі знань
   - Якщо питання стосується специфічної інформації про компанію (контакти, конкретні умови, терміни проектів), якої немає в базі - запропонуй звернутися до менеджера
   - Не видавай себе за іншу компанію чи сервіс

5. **Стиль спілкування**:
   - Будь лаконічним, але інформативним
   - Використовуй емодзі помірно (1-2 на повідомлення) для дружнього тону
   - Структуруй великі відповіді для легкого читання
   - Завершуй пропозицією допомогти далі

### БАЗА ЗНАНЬ КОМПАНІЇ ###
{knowledge_base}

### ЗАПИТАННЯ КОРИСТУВАЧА ###
{user_question}

### ТВОЯ ВІДПОВІДЬ ###
(Дай корисну, професійну відповідь, спираючись на базу знань та свої знання про AI та автоматизацію)"""

    try:
        # Використовуємо найновішу модель Gemini 2.0 Flash
        model = genai.GenerativeModel(
            'gemini-2.5-flash',
            generation_config={
                'temperature': 0.7,  # Баланс між креативністю та точністю
                'top_p': 0.95,
                'top_k': 40,
                'max_output_tokens': 1024,
            }
        )
        response = model.generate_content(prompt_template)
        return response.text
    except Exception as e:
        return f"Вибачте, виникла технічна помилка. Спробуйте ще раз або зв'яжіться з нами напряму. Помилка: {e}"

# ============ СЕКЦІЯ 2: Налаштування ============

# Завантажте API ключ зі змінної середовища
API_KEY = os.getenv('GEMINI_API_KEY')
if not API_KEY:
    print("❌ ПОМИЛКА: Змінна середовища GEMINI_API_KEY не встановлена!")
    print("Встановіть її командою: set GEMINI_API_KEY=ваш_ключ")
    exit()

CSV_FILE_PATH = 'faq.csv'
BUSINESS_NAME = "RSIVE INTELLIGENCE"

# Налаштувати Gemini API
try:
    genai.configure(api_key=API_KEY)
    print("✅ Gemini API налаштовано успішно")
except Exception as e:
    print(f"❌ Помилка конфігурації API: {e}")
    exit()

# Завантажити базу знань ОДИН РАЗ при старті
knowledge_base = load_knowledge_base(CSV_FILE_PATH)
if "Помилка:" in knowledge_base:
    print(knowledge_base)
    exit()
else:
    print(f"✅ База знань завантажена ({len(knowledge_base.split('П:')) - 1} записів)")

# ============ СЕКЦІЯ 3: Flask додаток ============

app = Flask(__name__)
CORS(app)  # Дозволяє запити з React

@app.route('/chat', methods=['POST'])
def chat():
    """Endpoint для отримання повідомлень з сайту"""
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'Повідомлення порожнє'}), 400
        
        print(f"📨 Отримано запит: {user_message[:50]}...")
        
        # Отримати відповідь від Gemini
        response = get_gemini_response(user_message, knowledge_base, BUSINESS_NAME)
        
        print(f"✅ Відповідь згенеровано ({len(response)} символів)")
        
        return jsonify({'response': response})
    
    except Exception as e:
        print(f"❌ Помилка: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    """Перевірка, чи працює сервер"""
    return jsonify({
        'status': 'ok', 
        'business': BUSINESS_NAME,
        'model': 'gemini-2.0-flash-exp'
    })

# ============ СЕКЦІЯ 4: Запуск сервера ============

if __name__ == "__main__":
    print("\n" + "="*60)
    print(f"🤖 AI-Чатбот '{BUSINESS_NAME}' запущено!")
    print(f"📡 API: http://localhost:5000/chat")
    print(f"🏥 Health check: http://localhost:5000/health")
    print(f"🧠 Модель: Gemini 2.0 Flash (Experimental)")
    print(f"📚 База знань: {CSV_FILE_PATH}")
    print("="*60 + "\n")
    app.run(host='0.0.0.0', port=5000, debug=True)