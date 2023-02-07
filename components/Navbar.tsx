import { gql, useQuery } from "@apollo/client";
import { Text, Avatar, Group, Navbar, UnstyledButton } from "@mantine/core";
import { Project } from "@prisma/client";
import { IconPlus } from "@tabler/icons-react";


const AllProjects = gql`
  query AllProjects {
    getProjects {
      edges {
        node {
          createdAt
          description
          id
          name
        }
      }
    }
  }
`

export default function AppNavbar() {
  const { data, loading, error, refetch } = useQuery(AllProjects)

  if (loading) return <></>
  if (error) return <></>
  const projects: Project[] = data.getProjects.edges.map((edge: any) => edge.node)

  return (
    <Navbar p="sm" width={{ base: 250 }}>
      <Navbar.Section grow>
        { projects.map((project: Project) => (
            <UnstyledButton key={project.id} className="p-2 hover:bg-gray-200 w-full rounded-md">
              <Group>
                <Avatar size={32} radius="md" 
                  src={'https://api.dicebear.com/5.x/thumbs/svg?seed=' + project.id}
                />
                <Text>
                  {project.name}
                </Text>
              </Group>
            </UnstyledButton>
          )
        )}
      </Navbar.Section>
      <Navbar.Section>
        <UnstyledButton className="p-2 hover:bg-gray-200 w-full rounded-md">
          <Group>
            <Avatar radius="md">
              <IconPlus size={24} />
            </Avatar>
            <Text c="dimmed">
              Add Project
            </Text>
          </Group>
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
  )
}