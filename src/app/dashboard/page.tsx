import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import MoodReflection from '@/components/MoodReflection'
import HealthTips from '@/components/HealthTips'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-center my-6 px-4">
        Welcome, {session.user?.email}
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 px-4 pb-8">
        <div className="w-full md:w-1/2 flex justify-center">
          <MoodReflection />
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <HealthTips />
        </div>
      </div>
    </>
  )
}
