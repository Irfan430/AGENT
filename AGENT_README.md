# AGENT - Advanced AI Code Executor

AGENT is an enhanced version of Open Interpreter with a modern, Manus AI-inspired GUI and DeepSeek API integration. It provides a seamless interface for executing code, analyzing data, and automating tasks using advanced language models.

## Features

### 🎨 Modern GUI Interface
- **Cyberpunk Terminal Aesthetic**: Dark-themed, sleek interface inspired by Manus AI
- **Real-time Chat**: Interactive conversation with the AI agent
- **Code Execution Visualization**: View code output and results in real-time
- **Responsive Design**: Works seamlessly on desktop and tablet devices

### 🚀 DeepSeek API Integration
- **Default LLM**: DeepSeek Chat model with 64K context window
- **High Performance**: Fast inference with 4096 token output limit
- **Flexible Configuration**: Easy API key setup via environment variables

### 💻 CLI + GUI Control
- Launch the GUI directly from the command line: `interpreter --gui` or `interpreter -g`
- Full terminal interface for advanced users
- Server mode for API-based access

## Installation

### Prerequisites
- Python 3.9+
- Node.js 18+ (for GUI)
- npm or pnpm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Irfan430/AGENT.git
cd AGENT
```

2. Install Python dependencies:
```bash
pip install -e .
```

3. Install GUI dependencies:
```bash
cd gui
npm install
cd ..
```

4. Set up your DeepSeek API key:
```bash
export DEEPSEEK_API_KEY="your-api-key-here"
```

## Usage

### Launch GUI
```bash
interpreter --gui
# or
interpreter -g
```

### CLI Mode
```bash
interpreter
```

### With Custom Profile
```bash
interpreter --profile deepseek_api
```

### Server Mode
```bash
interpreter --server
```

## Configuration

### Environment Variables
- `DEEPSEEK_API_KEY`: Your DeepSeek API key (required for GUI and default profile)
- `DISABLE_TELEMETRY`: Set to "true" to disable usage statistics

### Profiles
Default profiles are located in `interpreter/terminal_interface/profiles/defaults/`:
- `default.yaml`: DeepSeek-based configuration
- `deepseek_api.py`: Alternative DeepSeek profile
- `local.py`: Local model execution
- `os.py`: OS control mode

## GUI Features

### Chat Interface
- Send messages to the AI agent
- View conversation history
- Real-time status indicators

### Code Execution
- View executed code
- See output results
- Tab-based interface for code/output switching

### Settings
- Configure LLM parameters
- Adjust execution settings
- Manage API keys

## Architecture

```
AGENT/
├── interpreter/           # Core interpreter module
│   ├── core/             # Core functionality
│   ├── gui_launcher.py   # GUI launcher module
│   └── terminal_interface/
│       └── profiles/
│           └── defaults/
│               ├── default.yaml
│               └── deepseek_api.py
├── gui/                  # React-based GUI
│   ├── client/
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   └── AgentChat.tsx
│   │   │   ├── components/
│   │   │   ├── App.tsx
│   │   │   └── index.css
│   │   └── index.html
│   └── package.json
└── README.md
```

## Development

### GUI Development
```bash
cd gui
npm run dev
```

### Build GUI
```bash
cd gui
npm run build
```

### Code Quality
```bash
ruff check interpreter
black interpreter
isort interpreter
```

## Troubleshooting

### GUI Won't Start
1. Ensure Node.js is installed: `node --version`
2. Check npm packages: `cd gui && npm install`
3. Verify port 3000 is not in use

### DeepSeek API Errors
1. Verify API key: `echo $DEEPSEEK_API_KEY`
2. Check API base URL in profile
3. Ensure internet connection

### Code Execution Issues
1. Check Python version: `python --version` (should be 3.9+)
2. Verify dependencies: `pip list | grep open-interpreter`
3. Enable verbose mode: `interpreter --verbose`

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - See LICENSE file for details

## Support

For issues and questions:
- GitHub Issues: https://github.com/Irfan430/AGENT/issues
- Documentation: https://docs.openinterpreter.com

## Credits

AGENT is built on top of Open Interpreter with enhancements for:
- Modern GUI interface
- DeepSeek API integration
- Improved code quality and error handling
- Enhanced user experience

---

**AGENT v1.0.0** - Advanced AI Code Executor
Built with ❤️ for developers and AI enthusiasts
