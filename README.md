# Codex CLI

Codex CLI is OpenAI's coding agent that you can run locally from your terminal. It can read, change, and run code on your machine in the selected directory.
It's [open source](https://github.com/openai/codex) and built in Rust for speed and efficiency.

ChatGPT Plus, Pro, Business, Edu, and Enterprise plans include Codex. Learn more about [what's included](https://developers.openai.com/codex/pricing).

<YouTubeEmbed
  title="Codex CLI overview"
  videoId="iqNzfK4_meQ"
  class="max-w-md"
/>
<br />

## CLI setup

<CliSetupSteps client:load />

The Codex CLI is available on macOS, Windows, and Linux. On Windows, run Codex
natively in PowerShell with the Windows sandbox, or use WSL2 when you need a
Linux-native environment. For setup details, see the
[Windows setup guide](/codex/windows).

If you're new to Codex, read the [best practices guide](https://developers.openai.com/codex/learn/best-practices).

---

## Work with the Codex CLI

- [Run Codex interactively](/codex/cli/features#running-in-interactive-mode): Run `codex` to start an interactive terminal UI (TUI) session.
- [Control model and reasoning](/codex/cli/features#models-and-reasoning): Use `/model` to switch between available models or adjust reasoning levels.
- [Image inputs](/codex/cli/features#image-inputs): Attach screenshots or design specs so Codex reads them alongside your prompt.
- [Image generation](/codex/cli/features#image-generation): Generate or edit images directly in the CLI, and attach references when you want Codex to iterate on an existing asset.
- [Run local code review](/codex/cli/features#running-local-code-review): Get your code reviewed by a separate Codex agent before you commit or push your changes.
- [Use subagents](/codex/subagents): Use subagents to parallelize complex tasks.
- [Web search](/codex/cli/features#web-search): Use Codex to search the web and get up-to-date information for your task.
- [Codex Cloud tasks](/codex/cli/features#working-with-codex-cloud): Launch a Codex Cloud task, choose environments, and apply the resulting diffs without leaving your terminal.
- [Scripting Codex](/codex/noninteractive): Automate repeatable workflows by scripting Codex with the `exec` command.
- [Model Context Protocol](/codex/mcp): Give Codex access to additional third-party tools and context with Model Context Protocol (MCP).
- [Approval modes](/codex/cli/features#approval-modes): Choose the approval mode that matches your comfort level before Codex edits or runs commands.
