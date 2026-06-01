import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPhasesCount } from "@/lib/database";

export default async function HomePage() {
  const phaseCount = await getPhasesCount();

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Java Roadmap Tracker
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Phases</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-4xl font-bold">
                {phaseCount}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Topics</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-4xl font-bold">
                0
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>DSA Solved</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-4xl font-bold">
                0
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-4xl font-bold">
                0
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}