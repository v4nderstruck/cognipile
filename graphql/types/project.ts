import { builder } from "../builder";

builder.prismaObject("Project", {
  fields: (f) => ({
    id: f.exposeID("id"),
    name: f.exposeString("name"),
    description: f.exposeString("description"),
    createdAt: f.field({
      type: "String",
      resolve: (parent) => (parent.createdAt.toDateString())
    })
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
      name: m.arg.string({required: true}),
      description: m.arg.string({required: true}),
    },
    resolve: async (query, _parent, args, _ctx) =>  {
      const {name, description} = args;
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