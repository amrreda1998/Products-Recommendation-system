# Simple Embeddings

A minimal Node.js and TypeScript project for generating and comparing text embeddings using the @xenova/transformers library.

## Features

- Generate embeddings for text data
- Store and manage embedding results
- Calculate similarity between embeddings
- Modular code structure for easy extension

## Project Structure

```
src/
  index.ts           # Entry point
  data/data.ts       # Sample data and data management
  types/types.ts     # Type definitions
  utlis/embeddings.ts# Embedding generation logic
  utlis/similarity.ts# Similarity calculation
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```sh
npm install
```

### Running the Project

```sh
npm start
```

This will execute `src/index.ts` using ts-node.

## Usage

- Modify `src/data/data.ts` to add your own text data.
- The main logic for generating embeddings and calculating similarity is in `src/utlis/embeddings.ts` and `src/utlis/similarity.ts`.

## Dependencies

- [@xenova/transformers](https://www.npmjs.com/package/@xenova/transformers)
- [ts-node](https://www.npmjs.com/package/ts-node)
- [typescript](https://www.npmjs.com/package/typescript)

## License

ISC
