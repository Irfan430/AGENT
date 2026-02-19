"""
AGENT GUI Launcher Module

This module provides functionality to launch the AGENT GUI from the CLI.
It handles WebSocket communication between the CLI and the GUI interface.
"""

import json
import os
import subprocess
import sys
import threading
import time
import webbrowser
from typing import Any, Callable, Dict, Optional

from .core import OpenInterpreter


class GUILauncher:
    """Manages the AGENT GUI lifecycle and communication."""

    def __init__(self, interpreter: OpenInterpreter, port: int = 3000):
        """
        Initialize the GUI launcher.

        Args:
            interpreter: The OpenInterpreter instance
            port: Port to run the GUI server on
        """
        self.interpreter = interpreter
        self.port = port
        self.gui_process: Optional[subprocess.Popen] = None
        self.is_running = False

    def start(self, open_browser: bool = True) -> bool:
        """
        Start the AGENT GUI server.

        Args:
            open_browser: Whether to automatically open the browser

        Returns:
            True if the GUI started successfully, False otherwise
        """
        try:
            gui_path = os.path.join(os.path.dirname(__file__), "..", "..", "agent-gui")

            if not os.path.exists(gui_path):
                self.interpreter.display_message(
                    "> GUI files not found. Please ensure agent-gui is properly installed.\n"
                )
                return False

            self.interpreter.display_message("> Starting AGENT GUI...\n")

            # Start the development server
            self.gui_process = subprocess.Popen(
                ["npm", "run", "dev"],
                cwd=gui_path,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
            )

            self.is_running = True

            # Wait for the server to start
            time.sleep(3)

            if open_browser:
                webbrowser.open(f"http://localhost:{self.port}")

            self.interpreter.display_message(
                f"> AGENT GUI is running at http://localhost:{self.port}\n"
            )

            return True

        except Exception as e:
            self.interpreter.display_message(f"> Error starting GUI: {str(e)}\n")
            return False

    def stop(self) -> None:
        """Stop the AGENT GUI server."""
        if self.gui_process:
            self.gui_process.terminate()
            try:
                self.gui_process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                self.gui_process.kill()
            self.is_running = False
            self.interpreter.display_message("> AGENT GUI stopped.\n")

    def send_message(self, message: Dict[str, Any]) -> None:
        """
        Send a message from the CLI to the GUI.

        Args:
            message: Message dictionary to send
        """
        if not self.is_running:
            return

        try:
            # This would be implemented with actual WebSocket communication
            # For now, it's a placeholder for future implementation
            pass
        except Exception as e:
            self.interpreter.display_message(f"> Error sending message to GUI: {str(e)}\n")

    def receive_message(self, callback: Callable[[Dict[str, Any]], None]) -> None:
        """
        Set up a callback to receive messages from the GUI.

        Args:
            callback: Function to call when a message is received
        """
        # This would be implemented with actual WebSocket communication
        # For now, it's a placeholder for future implementation
        pass


def launch_gui(interpreter: OpenInterpreter, open_browser: bool = True) -> Optional[GUILauncher]:
    """
    Launch the AGENT GUI.

    Args:
        interpreter: The OpenInterpreter instance
        open_browser: Whether to automatically open the browser

    Returns:
        GUILauncher instance if successful, None otherwise
    """
    launcher = GUILauncher(interpreter)

    if launcher.start(open_browser=open_browser):
        return launcher

    return None
