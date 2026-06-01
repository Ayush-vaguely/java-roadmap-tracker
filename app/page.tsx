import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getPhasesCount,
  getTopicsCount,
  getTopics,
} from "@/lib/database";

export default async function HomePage() {
  const phaseCount = await getPhasesCount();
  const topicCount = await getTopicsCount();
  const topics = await getTopics();

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Java Roadmap Tracker
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Phases</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{phaseCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{topicCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>DSA Solved</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">0</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">0</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-10">
  <h2 className="text-2xl font-bold mb-4">
    Topics
  </h2>

  <div className="space-y-3">
    {topics.map((topic) => (
      <Card key={topic.id}>
        <CardContent className="p-4">
          <p className="font-medium">
            {topic.name}
          </p>
        </CardContent>
      </Card>
    ))}
  </div>
</div>
      </div>
    </main>
  );
}