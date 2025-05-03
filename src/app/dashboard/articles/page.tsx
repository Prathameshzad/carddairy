import AuthGuard from '@/components/AuthGuard'
import ArticlesList from '@/components/ArticlesList'

export default function ArticlesPage() {
  return (
    <AuthGuard>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Health Articles</h1>
        <ArticlesList />
      </div>
    </AuthGuard>
  )
}