from interpreter import interpreter
import os

# ===============================
# DeepSeek API Configuration
# ===============================

# Model (DeepSeek OpenAI-compatible)
interpreter.llm.model = "deepseek/deepseek-chat"

# API Key - Try to get from environment variable first
interpreter.llm.api_key = os.environ.get("DEEPSEEK_API_KEY", "YOUR_DEEPSEEK_API_KEY_HERE")

# DeepSeek API Base
interpreter.llm.api_base = "https://api.deepseek.com/v1"

# ===============================
# LLM Settings
# ===============================

interpreter.llm.supports_functions = True
interpreter.llm.context_window = 64000
interpreter.llm.max_tokens = 4096
interpreter.llm.temperature = 0.7

# ===============================
# Interpreter Settings
# ===============================

interpreter.auto_run = True
interpreter.display_message("> DeepSeek API profile (AGENT version) loaded successfully.\n")
