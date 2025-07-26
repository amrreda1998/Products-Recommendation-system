import { pipeline } from '@xenova/transformers';
import { EmbeddingInput, EmbeddingResult } from '../types/types';

export class SimpleEmbeddingService {
  private model: any = null;

  // Load the AI model (this happens once)
  async initialize() {
    console.log('📦 Loading AI model...');
    console.log('⏳ This might take a minute on first run...');

    try {
      // Load a small, fast model for converting text to vectors
      this.model = await pipeline(
        'feature-extraction',
        'Xenova/all-MiniLM-L6-v2'
      );
      console.log('✅ Model loaded successfully!');
    } catch (error) {
      console.log('❌ Error loading model:', error);
      throw error;
    }
  }

  // Convert text to a vector (list of numbers)
  async textToVector(text: string): Promise<number[]> {
    if (!this.model) {
      throw new Error('Model not initialized! Call initialize() first.');
    }

    console.log(`🔄 Converting to vector: "${text.substring(0, 50)}..."`);

    try {
      // Get the embedding (vector) for this text
      const result = await this.model(text, {
        pooling: 'mean', // Average all the word vectors
        normalize: true, // Make all vectors the same length
      });

      // Convert to regular JavaScript array
      const vector: number[] = Array.from(result.data);
      console.log(`✅ Got vector with ${vector.length} dimensions`);

      return vector;
    } catch (error) {
      console.log('❌ Error creating vector:', error);
      throw error;
    }
  }

  // Convert multiple texts to vectors
  async createAllEmbeddings(items: EmbeddingInput[]) {
    console.log(`\n🚀 Creating embeddings for ${items.length} items...`);

    const embeddings: EmbeddingResult[] = [];

    for (const item of items) {
      const vector = await this.textToVector(item.text);
      embeddings.push({
        id: item.id,
        name: item.name,
        vector: vector,
        originalText: item.text,
      });
    }

    console.log('✅ All embeddings created!\n');
    return embeddings;
  }
}
