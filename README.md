
# Hawaii News Map

A real-time interactive map application displaying news articles from Hawaii with location-based filtering and search capabilities.


## Prerequisites

- Node.js 16+ 
- pnpm 8+
- MapTiler API key

## Installation

```bash
# Install dependencies
pnpm install
```

## Setup

1. Get a free API key from [MapTiler](https://www.maptiler.com/)
2. Add your API key to `src/components/Dashboard.tsx`:

```typescript
maptilersdk.config.apiKey = "YOUR_API_KEY_HERE";
```

## Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
src/
├── components/
│   └── Dashboard.tsx    # Main dashboard component
├── App.tsx
└── main.tsx
```

## Technologies

- React 18+
- TypeScript
- Tailwind CSS
- MapTiler SDK
- Lucide React (icons)

## License

MIT
