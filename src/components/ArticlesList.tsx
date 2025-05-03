import { unstable_cache } from 'next/cache';

interface Article {
  title: string;
  description: string;
  url: string;
}

// Function to fetch articles from the News API
async function fetchArticles(): Promise<Article[]> {
  try {
    const apiKey = process.env.NEWS_API_KEY; // Ensure this is set in your environment

    const response = await fetch(
      `https://newsapi.org/v2/everything?q=health&pageSize=5&apiKey=${apiKey}`
    );
    const data = await response.json();

    // Extract only necessary fields from each article
    return data.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
    }));
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return []; // Return empty array on failure
  }
}

// Cache the articles for 1 hour (3600 seconds)
const getCachedArticles = unstable_cache(
  async () => await fetchArticles(),
  ['health-articles'],
  { revalidate: 3600 }
);

// Server component to display the list of articles
export default async function ArticlesList() {
  const articles = await getCachedArticles(); // Get cached (or fresh) articles

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
          <p className="text-gray-600 mb-4">{article.description}</p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-800 font-medium"
          >
            Read more →
          </a>
        </div>
      ))}
    </div>
  );
}
