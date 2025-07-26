export interface EmbeddingResult {
  id: string;
  name: string;
  vector: number[];
  originalText: string;
}
export interface EmbeddingInput {
  id: string;
  text: string;
  name: string;
}
