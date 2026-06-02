import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { completeTopicAction } from "@/actions/topic-actions";
import { saveNotesAction } from "@/actions/save-notes-action";
import { saveDeadlineAction } from "@/actions/save-deadline-action";
import { createProjectAction } from "@/actions/create-project-action";
import {
  getPhasesCount,
  getTopicsCount,
  getTopics,
  getCompletedTopicsCount,
  getProgressPercentage,
  getOverdueTopicsCount,
  getUpcomingDeadlines,
  getProjectsCount,
getCompletedProjectsCount,
getProjects,

} from "@/lib/database";

export default async function HomePage() {
  const phaseCount = await getPhasesCount();
  const topicCount = await getTopicsCount();
  const progressPercentage = await getProgressPercentage();
  const completedCount = await getCompletedTopicsCount();
  const topics = await getTopics();
  const overdueCount =
  await getOverdueTopicsCount();
  const upcomingDeadlines =
  await getUpcomingDeadlines();
  const projectsCount =
  await getProjectsCount();
const completedProjectsCount =
  await getCompletedProjectsCount();
  const projects = await getProjects();

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
              <CardTitle>Completed Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {completedCount}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Overdue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-red-600">
  {overdueCount}
</p>
            </CardContent>
          </Card>
          <Card>
  <CardHeader>
    <CardTitle>
      Projects
    </CardTitle>
  </CardHeader>

  <CardContent>
    <p className="text-4xl font-bold">
      {projectsCount}
    </p>

    <p className="text-sm text-gray-500 mt-2">
      Completed: {completedProjectsCount}
    </p>
  </CardContent>
</Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>
              Overall Progress
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold mb-4">
              {progressPercentage}%
            </p>

            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-600 h-4 rounded-full"
                style={{
                  width: `${progressPercentage}%`,
                }}
              />
            </div>
          </CardContent>
        </Card>
        <Card className="mt-6">
  <CardHeader>
    <CardTitle>
      Upcoming Deadlines
    </CardTitle>
  </CardHeader>

  <CardContent>
    {upcomingDeadlines.length === 0 ? (
      <p className="text-gray-500">
        No upcoming deadlines
      </p>
    ) : (
      <div className="space-y-2">
        {upcomingDeadlines.map((topic) => (
          <div
            key={topic.id}
            className="flex justify-between border-b pb-2"
          >
            <span>{topic.name}</span>

            <span className="text-sm text-orange-600">
              {topic.deadline}
            </span>
          </div>
        ))}
      </div>
    )}
  </CardContent>
</Card>
<Card className="mt-6">
  <CardHeader>
    <CardTitle>
      Projects
    </CardTitle>
  </CardHeader>

  <CardContent>
    <form
  action={createProjectAction}
  className="mb-4 flex gap-2"
>
  <input
    type="text"
    name="name"
    placeholder="Project Name"
    className="border rounded p-2 flex-1"
    required
  />

  <select
    name="status"
    className="border rounded p-2"
  >
    <option value="Planned">
      Planned
    </option>

    <option value="In Progress">
      In Progress
    </option>

    <option value="Completed">
      Completed
    </option>
  </select>

  <button
    type="submit"
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Add Project
  </button>
</form>
    <div className="space-y-3">
      {projects.map((project) => (
        <div
          key={project.id}
          className="flex items-center justify-between border-b pb-2"
        >
          <span className="font-medium">
            {project.name}
          </span>

          <span
            className={`px-3 py-1 rounded text-sm text-white ${
              project.status === "Completed"
                ? "bg-green-600"
                : project.status === "In Progress"
                ? "bg-yellow-500"
                : "bg-gray-500"
            }`}
          >
            {project.status}
          </span>
        </div>
      ))}
    </div>
  </CardContent>
</Card>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            Topics
          </h2>

          <div className="space-y-3">
            {topics.map((topic) => (
              <Card key={topic.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
  <p className="font-medium">
    {topic.name}
  </p>

  <>
  <p className="text-sm text-gray-500">
    Status: {topic.status}
  </p>

  <p className="text-sm text-orange-600 mb-3">
    Deadline: {topic.deadline || "Not Set"}
  </p>
  <form
  action={async (formData) => {
    "use server";
    await saveDeadlineAction(
      topic.id,
      formData
    );
  }}
>
  <input
    type="date"
    name="deadline"
    defaultValue={topic.deadline || ""}
    className="border rounded p-2 text-sm"
  />

  <button
    type="submit"
    className="ml-2 bg-orange-500 text-white px-3 py-2 rounded"
  >
    Save Deadline
  </button>
</form>
</>
  <form
    action={async (formData) => {
      "use server";
      await saveNotesAction(
        topic.id,
        formData
      );
    }}
  >
    <textarea
      name="notes"
      defaultValue={topic.notes || ""}
      placeholder="Write your notes..."
      className="w-full border rounded p-2 text-sm"
      rows={3}
    />

    <button
      type="submit"
      className="mt-2 bg-black text-white px-3 py-1 rounded"
    >
      Save Notes
    </button>
  </form>
</div>

                    {topic.status !== "Completed" ? (
                      <form
                        action={async () => {
                          "use server";
                          await completeTopicAction(topic.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                          Complete
                        </button>
                      </form>
                    ) : (
                      <span className="bg-blue-600 text-white px-4 py-2 rounded">
                        Completed
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}