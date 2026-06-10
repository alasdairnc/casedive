#!/bin/sh
# PostToolUse: non-blocking JS syntax check on the edited file.
# JSX is skipped — node --check cannot parse it (*.js does not match *.jsx).
case "$CLAUDE_TOOL_INPUT_FILE_PATH" in
  *.js)
    node --check "$CLAUDE_TOOL_INPUT_FILE_PATH" 2>&1 | head -5
    ;;
esac
exit 0
