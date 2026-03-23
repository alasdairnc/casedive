---
name: security-scan
description: Run AgentShield security scan on the .claude/ config
---

# /security-scan

Scan Claude Code configuration for vulnerabilities.

```bash
npx ecc-agentshield scan
```

For deep analysis with Opus:
```bash
npx ecc-agentshield scan --opus --stream
```

Auto-fix safe issues:
```bash
npx ecc-agentshield scan --fix
```

Target score: 100/100. Fix any findings before pushing.
