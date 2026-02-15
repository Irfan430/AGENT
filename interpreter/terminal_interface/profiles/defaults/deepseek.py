from interpreter import interpreter

# ===============================
# DeepSeek API Configuration
# ===============================

# Model (DeepSeek OpenAI-compatible)
interpreter.llm.model = "openai/deepseek-chat"

# Your API Key (sk-xxxx works fine)
interpreter.llm.api_key = "sk-15b0ddf886024792901ccc7123501623"

# DeepSeek API Base
interpreter.llm.api_base = "https://api.deepseek.com/v1"

# ===============================
# LLM Settings
# ===============================

interpreter.llm.supports_functions = False
interpreter.llm.execution_instructions = False

interpreter.llm.max_tokens = 800
interpreter.llm.context_window = 8000
interpreter.llm.temperature = 0.4

# Safe mode (avoid streaming issues)
interpreter.llm.stream = False

# ===============================
# Interpreter Settings
# ===============================

interpreter.auto_run = True
interpreter.offline = False

interpreter.display_message("> DeepSeek API profile loaded successfully.\n")