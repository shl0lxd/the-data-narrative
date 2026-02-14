/**
 * Relevance score: Likes / (HoursSincePublished + 2)^1.5
 * Used to sort articles on the homepage.
 */
export function relevanceScore(likeCount, publishedAt) {
  const likeCountNum = Number(likeCount) || 0;
  const published = publishedAt ? new Date(publishedAt).getTime() : Date.now();
  const hoursSince = (Date.now() - published) / (1000 * 60 * 60);
  const denominator = Math.pow(hoursSince + 2, 1.5);
  return denominator > 0 ? likeCountNum / denominator : likeCountNum;
}

export function sortByRelevance(posts) {
  return [...posts].sort((a, b) => {
    const scoreA = relevanceScore(a.like_count, a.published_at || a.created_at);
    const scoreB = relevanceScore(b.like_count, b.published_at || b.created_at);
    return scoreB - scoreA;
  });
}
