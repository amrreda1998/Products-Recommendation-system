import { SimpleEmbeddingService } from './utlis/embeddings';
import { findMostSimilar } from './utlis/similarity';
import { products, users } from './data/data';

async function main() {
  console.log('🎯 Simple Embeddings Tutorial\n');
  console.log('This will show you how embeddings work for recommendations!\n');

  try {
    // Step 1: Initialize the AI model
    const embeddingService = new SimpleEmbeddingService();
    await embeddingService.initialize();

    // Step 2: Convert all products to vectors
    console.log('📱 Converting products to vectors...');
    const productTexts = products.map((p) => ({
      id: p.id,
      name: p.name,
      text: `${p.name} ${p.description}`,
    }));

    const productEmbeddings = await embeddingService.createAllEmbeddings(
      productTexts
    );

    // Step 3: Convert user interests to vectors
    console.log('👤 Converting user interests to vectors...');
    const userTexts = users.map((u) => ({
      id: u.id,
      name: u.name,
      text: u.interests,
    }));

    const userEmbeddings = await embeddingService.createAllEmbeddings(
      userTexts
    );

    // Step 4: Make recommendations for each user
    console.log('🎯 Making Recommendations...\n');

    for (const userEmbedding of userEmbeddings) {
      console.log(`\n--- Recommendations for ${userEmbedding.name} ---`);
      console.log(`User interests: "${userEmbedding.originalText}"`);

      // Find products most similar to this user's interests
      const recommendations = findMostSimilar(
        userEmbedding.vector,
        productEmbeddings,
        3
      );

      console.log('\nTop 3 Recommendations:');
      recommendations.forEach((rec, index) => {
        const similarity = (rec.similarity * 100).toFixed(1);
        console.log(`${index + 1}. ${rec.name}`);
        console.log(`   Similarity: ${similarity}%`);
        console.log(`   Why: The text embeddings are ${similarity}% similar\n`);
      });
    }

    // Step 5: Show how similar products are to each other
    console.log('\n🔍 Product Similarity Analysis:');
    console.log("Let's see which products are most similar to each other...\n");

    for (let i = 0; i < productEmbeddings.length; i++) {
      const currentProduct = productEmbeddings[i];
      const otherProducts = productEmbeddings.filter((_, index) => index !== i);

      const similarProducts = findMostSimilar(
        currentProduct.vector,
        otherProducts,
        2
      );

      console.log(`${currentProduct.name} is most similar to:`);
      similarProducts.forEach((similar, index) => {
        const similarity = (similar.similarity * 100).toFixed(1);
        console.log(`  ${index + 1}. ${similar.name} (${similarity}% similar)`);
      });
      console.log('');
    }

    // Step 6: Interactive demo
    console.log('🎮 Interactive Demo:');
    console.log('Try searching for something...\n');

    const searchQueries = [
      'I want something for phone calls',
      'I need a computer for work',
      'Show me Apple products',
    ];

    for (const query of searchQueries) {
      console.log(`Search: "${query}"`);

      const queryVector = await embeddingService.textToVector(query);
      const results = findMostSimilar(queryVector, productEmbeddings, 2);

      console.log('Results:');
      results.forEach((result, index) => {
        const score = (result.similarity * 100).toFixed(1);
        console.log(`  ${index + 1}. ${result.name} (${score}% match)`);
      });
      console.log('');
    }

    console.log('🎉 Tutorial completed!');
    console.log('\n💡 Key Learnings:');
    console.log('1. Embeddings convert text into numbers (vectors)');
    console.log('2. Similar texts have similar vectors');
    console.log('3. We use cosine similarity to compare vectors');
    console.log('4. Higher similarity = better recommendation');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run the tutorial
main().catch(console.error);
