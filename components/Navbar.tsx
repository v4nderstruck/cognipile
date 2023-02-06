import { Text, Avatar, Group, Navbar, UnstyledButton} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";



export default function AppNavbar() {
  return (
    <Navbar p="sm" width={{ base: 250 }}>
      <Navbar.Section grow>Projects</Navbar.Section>
      <Navbar.Section>
        <UnstyledButton>
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