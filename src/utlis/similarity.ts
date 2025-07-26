// Calculate how similar two vectors are (0 = not similar, 1 = identical)
export function calculateSimilarity(vectorA: number[], vectorB: number[]): number {
  // This is called "cosine similarity"
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  // Calculate dot product and norms
  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];
    normA += vectorA[i] * vectorA[i];
    normB += vectorB[i] * vectorB[i];
  }

  // Avoid division by zero
  if (normA === 0 || normB === 0) {
    return 0;
  }

  // Calculate cosine similarity
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Find the most similar items
export function findMostSimilar(
  targetVector: number[], 
  allVectors: { id: string; vector: number[]; name: string }[],
  topK: number = 1
) {
  const similarities = allVectors.map(item => ({
    ...item,
    similarity: calculateSimilarity(targetVector, item.vector)
  }));

  // Sort by similarity (highest first)
  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK);
}