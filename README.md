# 🌱 Sprøut

Your terminal, with a brain.

Sprøut is a fast, cross-platform command-line assistant I built from scratch.
It understands plain English, runs instant offline skills for the common stuff,
and falls back to an AI brain for anything that needs real thinking — reading
your documents, answering questions, and remembering the conversation.


## What it does

**Instant skills (no internet, no AI):**
- 🗂️  Organise a messy folder into categories — with a preview and one-command **undo**
- 📁  Create folders and files on command
- ✏️   Rename files
- 🔎  Find files by name — fuzzy, so you don't need the exact path
- 📂  Open files and folders
- 🔊  Set the volume (macOS)
- 🗑️   Move files to the Trash / Recycle Bin
- 📸  Take a screenshot
- 🌤️   Check the weather
- 🩺  Report system vitals: CPU, memory, disk, battery, uptime
- 🧠  Remember facts about you, and tell you what it knows

**AI brain (for everything else):**
- 📄  Read and summarise documents, including PDFs
- 💬  Answer questions in plain language
- 🧵  Remembers the conversation — including files it just read

It senses your Mac's state (CPU, battery, wifi, connected devices) and uses that
context when it answers, so it never has to guess.

## Requirements

- [Node.js](https://nodejs.org) 18 or newer
- A free [Google AI Studio](https://aistudio.google.com/app/apikey) API key (for the AI features)

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Add your API key to your shell profile (~/.zshrc on Mac)
export GEMINI_API_KEY="your-key-here"

# 3. (Optional) Add a launcher so you can run it from anywhere
sprout() { ( cd ~/Desktop/mac-brain && npm run dev ) }

# then reload your shell
source ~/.zshrc
Usage ￼

```bash
npm run dev      # or just: sprout

```

Then type whatever you want:

```
you › summarise my vodcast script
you › organise my downloads folder
you › make a folder called receipts
you › what wifi am I connected to
you › remember that my sister's name is Lena

```

Type ‎`help` for the full skill list, ‎`exit` to quit.

Privacy ￼

- Your API key lives in your shell environment — never committed to this repo.

- Personal memory is stored locally in ‎`~/.sprout/memory.json`.

- When you use an AI feature, the relevant text (and basic system info) is sent to

Google to generate the answer. Don’t store anything truly private in memory.

Cross-platform ￼

Written to run on both macOS and Windows. Some skills (like volume control)

are macOS-only and degrade gracefully elsewhere.

Built from scratch, one skill at a time. 🌱