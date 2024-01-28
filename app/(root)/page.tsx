import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { UserButton } from '@clerk/nextjs'
import { Select } from '@radix-ui/react-select'

export default function Home() {
  return (
    <div>
      <Button>Test</Button>
      <ThemeToggle />
      Temporary Home Page
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
