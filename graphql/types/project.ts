import { builder } from "../builder";

builder.prismaObject("Project", {
  fields: (f) => ({
    id: f.exposeID("id"),
    name: f.exposeString("name"),
    description: f.exposeString("description"),
    createdAt: f.field({
      type: "String",
      resolve: (parent) => (parent.createdAt.toLocaleString())
    }),
    tasks: f.relation("tasks"),
  })
})

builder.queryField("getProjects", (q) =>
  q.prismaConnection({
    type: 'Project',
    cursor: 'id',
    resolve: (query) => prisma.project.findMany({ ...query })
  })
)

builder.mutationField("createProject", (m) =>
  m.prismaField({
    type: "Project",
    args: {
      name: m.arg.string({ required: true }),
      description: m.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { name, description } = args;
      return await prisma.project.create({
        ...query,
        data: {
          name: name,
          description: description,
        }
      })
    }
  })
)

builder.mutationField("updateProject", (m) =>
  m.prismaField({
    type: "Project",
    args: {
      id: m.arg.id({ required: true }),
      name: m.arg.string(),
      description: m.arg.string(),
    },
    resolve: async (query, _parent, args, _ctx) => {
      const { id, name, description } = args;
      const data = { ...(name && { name: name }), ...(description && { description: description }) };
      return await prisma.project.update({
        ...query,
        where: {
          id: Number(id)
        },
        data: {
          name: name ? name : undefined,
          description: description ? description : undefined,
        }
      })
    }
  })
);
