import { builder } from "../builder";

enum TaskStatusString {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

builder.prismaObject("Task", {
  fields: (f) => ({
    id: f.exposeID("id"),
    name: f.exposeString("name"),
    description: f.exposeString("description"),
    status: f.exposeString("status"),
    createdAt: f.field({
      type: "String",
      resolve: (parent) => (parent.createdAt.toLocaleString())
    }),
  })
});

builder.mutationField("createTask", (m) =>
  m.prismaField({
    type: "Task",
    args: {
      projectId: m.arg.int({ required: true }),
      name: m.arg.string({ required: true }),
      description: m.arg.string(),
      status: m.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { name, description, status, projectId } = args;
      // pretty retarded typescript checks...
      const checked_status = Object.values(TaskStatusString).includes((status || '') as TaskStatusString) ? status as string : TaskStatusString.TODO;
      return await prisma.task.create({
        ...query,
        data: {
          name: name,
          description: description || "",
          status: checked_status,
          Project: {
            connect: { id: projectId }
          }
        }
      })
    }
  })
);

builder.queryField("getTasksOfProject", (q) =>
  q.prismaConnection({
    type: 'Task',
    args: {
      projectId: q.arg.int({ required: true })
    },
    cursor: 'id',
    resolve: (query, _parent, args, _ctx) => prisma.task.findMany({ ...query, where: {
      Project: {
        id: args.projectId 
      }
    }})
  })
);


