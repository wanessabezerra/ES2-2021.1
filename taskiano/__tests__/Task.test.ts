import { TaskController } from "./lib";

describe("TaskController", () => {
  it("Create new Task", async () => {
    const newTask = await TaskController.create({
      title: "Tarefa 666: Welcome to the Hell",
      number: 666,
      remainingTime: 696969,
      note: "# Hello Luci",
      fixed: false,
      priority: 6,
      status: "open",
      created_at: new Date(),
      closed_in: null,
      timer: new Date(new Date().getTime() + 666),
      projectId: "abef7153-742f-4b20-bb42-ae772053050b",
    });

    expect(newTask).toBeTruthy();

    if (newTask.id) {
      const checkTask = await TaskController.get(newTask.id);

      expect(checkTask?.id).toBe(newTask.id);
    }
  });
});
