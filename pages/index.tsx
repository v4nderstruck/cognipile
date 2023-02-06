import AppHeader from "@/components/Header";
import AppNavbar from "@/components/Navbar";
import { AppShell, useMantineTheme } from "@mantine/core";

export default function Home() {
  const theme = useMantineTheme();
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      padding="md"
      navbar={<AppNavbar />}
      header={<AppHeader />}
    >
      Hello World
    </AppShell>
  )
}
