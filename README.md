# Personal Autonomous AI Agent (Manus-like)

## Project Overview

This project aims to develop a personal autonomous AI agent, similar to Manus AI, capable of interacting with the operating system (OS), browsing the web, and executing commands. The agent will leverage the DeepSeek API for its intelligence and will be designed for smooth, efficient operation on a personal computer.

## Core Architecture: The "Manus-like" Setup

To achieve a "Manus-like" smooth and intelligent operation, the agent will be built upon a robust architecture focusing on modularity, tool-use, and self-correction. The key components are:

| Component | Role | Description |
| :-------- | :--- | :---------- |
| **Brain (LLM)** | **DeepSeek-V3 API** | This will be the core intelligence, responsible for understanding tasks, planning, and generating responses. DeepSeek-V3 is chosen for its efficiency, coding capabilities, and logical reasoning. |
| **Tools (Function Calling)** | **OS Interaction, Web Browsing** | The agent will be equipped with a set of tools to interact with the host system. These include executing terminal commands, reading/writing files, and browsing the internet. |
| **Planning & Orchestration** | **LangGraph / CrewAI** | A robust agent framework like LangGraph or CrewAI will be used to manage the agent's workflow, enabling it to break down complex tasks, plan steps, and execute them sequentially. This ensures a smooth, goal-oriented operation. |
| **Memory (Context Management)** | **Vector Database (e.g., ChromaDB)** | To maintain context and learn from past interactions, a memory system will be integrated. This allows the agent to remember previous conversations, executed commands, and learned information, leading to more coherent and efficient task execution. |

## Technical Stack

To build this autonomous agent, the following technologies and libraries will be utilized:

*   **Programming Language:** Python 3.11+ (for agent logic and tool development)
*   **Large Language Model (LLM):** DeepSeek-V3 (accessed via DeepSeek API)
*   **Agent Framework:** LangGraph (for building stateful, multi-step agent workflows)
*   **OS Interaction:** Python's `subprocess` module for terminal commands, `os` module for file system operations.
*   **Web Browsing:** Playwright (for headless or headed browser automation, enabling web navigation and data extraction).
*   **Code Execution Environment:** Docker (to provide a secure, sandboxed environment for executing generated code, protecting the host OS).
*   **Memory/Vector Database:** ChromaDB (for storing and retrieving conversational history and learned knowledge).

## Step-by-Step Implementation Guide

This section outlines the phased approach to building your personal autonomous AI agent:

### Phase 1: DeepSeek API Integration

1.  **Obtain DeepSeek API Key:** Register on the [DeepSeek Platform](https://platform.deepseek.com/) and generate your API key. Ensure you have sufficient balance for API calls.
2.  **Python Setup:** Install necessary Python libraries:
    ```bash
    pip install openai # DeepSeek API is OpenAI-compatible
    ```
3.  **Basic API Call:** Write a simple Python script to make a test call to the DeepSeek API to ensure connectivity.

### Phase 2: Tool Development (Function Calling)

Develop Python functions that the agent can call to interact with your system and the web. These functions will be exposed to the LLM as tools.

1.  **Terminal Command Execution Tool:**
    *   Create a function `execute_command(command: str) -> str` that runs shell commands using `subprocess` and returns the output.
2.  **File System Interaction Tools:**
    *   Create `read_file(path: str) -> str` to read file content.
    *   Create `write_file(path: str, content: str) -> None` to write content to a file.
    *   Create `list_directory(path: str) -> list[str]` to list directory contents.
3.  **Web Browsing Tool:**
    *   Set up Playwright: `pip install playwright && playwright install`.
    *   Create `browse_web(url: str, query: str = None) -> str` that navigates to a URL, extracts relevant information based on a query, and returns it. This might involve using `BeautifulSoup` for parsing HTML.

### Phase 3: Agent Orchestration with LangGraph

LangGraph will be used to define the agent's state, nodes (LLM calls, tool calls), and edges (transitions between states).

1.  **Define Agent State:** Create a state object that holds the current conversation history, available tools, and any intermediate thoughts or observations.
2.  **Create Nodes:**
    *   **LLM Node:** A node that calls the DeepSeek API with the current state and available tools.
    *   **Tool Node:** A node that executes the tool selected by the LLM.
3.  **Define Edges:** Specify the flow of control. For example, after an LLM call, if a tool is selected, transition to the Tool Node; otherwise, transition back to the LLM Node for further reasoning or final response generation.
4.  **Implement Self-Correction Loop:** Design the graph to allow the agent to re-evaluate its actions if a tool call fails or returns an unexpected result. This is crucial for "smooth" operation.

### Phase 4: Memory Integration

Integrate a vector database to provide the agent with long-term memory.

1.  **ChromaDB Setup:** `pip install chromadb`.
2.  **Memory Management:** Store past interactions, successful tool usages, and learned insights in ChromaDB.
3.  **Retrieval Augmented Generation (RAG):** Before making an LLM call, retrieve relevant information from memory based on the current task and inject it into the LLM's context.

### Phase 5: Security and Sandboxing

Given the agent's control over the OS, security is paramount.

1.  **Docker Containerization:** Run the entire agent within a Docker container. This isolates the agent's environment from your host OS, preventing accidental damage.
    *   Create a `Dockerfile` that sets up the Python environment and installs all dependencies.
    *   Mount specific directories from your host OS into the Docker container if the agent needs to access them (e.g., a dedicated project folder).
2.  **Confirmation Mechanism:** Implement a user confirmation step before the agent executes any potentially destructive OS command (e.g., `rm -rf`).

## Cost Estimation (DeepSeek API)

Using DeepSeek API offers a cost-effective solution. The primary cost will be based on API token usage.

*   **DeepSeek API:** DeepSeek offers competitive pricing, typically ranging from **$0.14 to $0.28 per 1 million tokens** for their larger models. For personal use, even with frequent interactions, the monthly cost is estimated to be around **$5 - $10 (approximately 600 - 1200 BDT)**, depending on usage volume.
*   **Software/Tools:** All other recommended tools (Python, LangGraph, Playwright, Docker, ChromaDB) are open-source and free to use.
*   **Hardware:** Since processing is done via the API in the cloud, your local hardware requirements are minimal, leading to no additional hardware costs.

## Getting Started

To begin, ensure you have Python 3.11+ and Docker installed on your system. Then, follow the steps in "Phase 1: DeepSeek API Integration" to set up your environment and connect to the DeepSeek API. From there, you can progressively build out the tools and agent orchestration using LangGraph.

Good luck with your project!
