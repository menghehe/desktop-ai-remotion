Source: https://github.com/deepseek-ai/deepseek-harness

Reused static assets and visual measurements:
- packages/client/ui-primitives/src/FishLogo.tsx -> src/components/OfficialFishLogo.tsx
- packages/client/ui-chat/src/client/assets/running-whale@2x.png -> running-whale.png
- apps/desktop/resources/icon.svg -> app-icon.svg
- ui-theme design tokens: DeepSeek 500 rgb(65, 118, 230), bubble rgb(237, 243, 254), user bubble radius 20px, composer radius 28px.
- Reasoning row and composer spacing follow packages/client/ui-chat and ui-conversation.

Only presentation assets and measurements were reused. No application state, transport, credentials, or interactive runtime is included. The upstream license is preserved as LICENSE.txt.
