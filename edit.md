<h1 align="center">● Open Interpreter</h1>

<p align="center">
  <img src="https://img.shields.io/badge/DeepSeek-API-00C853?style=for-the-badge&logo=openai&logoColor=white"/>
  <img src="https://img.shields.io/badge/OpenAI-Compatible-Yes-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/License-AGPL-white?style=for-the-badge"/>
</p>

<br>

**Open Interpreter** lets LLMs run code (Python, Javascript, Shell, and more) locally.

This fork is configured to work with **DeepSeek API** (OpenAI-compatible).

---

## Install

```bash
git clone https://github.com/Irfan430/open-interpreter.git
cd open-interpreter

python3 -m venv venv
source venv/bin/activate
pip install -e .
```

---

## DeepSeek Setup

Create profile file:

```
interpreter/terminal_interface/profiles/defaults/deepseek.py
```

Add:

```python
from interpreter import interpreter

interpreter.llm.model = "openai/deepseek-chat"
interpreter.llm.api_key = "YOUR_API_KEY"
interpreter.llm.api_base = "https://api.deepseek.com/v1"

interpreter.llm.supports_functions = False
interpreter.llm.execution_instructions = False
interpreter.llm.stream = False

interpreter.auto_run = True
interpreter.offline = False
```

---

## Run

```bash
interpreter --profile deepseek
```

---

⚠️ Do not commit your API key to GitHub.