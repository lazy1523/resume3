import Link from "next/link"

import { cn } from "@/src/lib/utils"
import { useRouter } from "next/router";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { asPath } = useRouter(); // 获取当前路径

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className={`text-sm font-medium transition-colors ${asPath === '/' ? 'text-primary' : 'text-muted-foreground'} hover:text-primary`}
      >
        Overview
      </Link>
      <Link
        href="/dataecho"
        className={`text-sm font-medium transition-colors ${asPath === '/dataecho' ? 'text-primary' : 'text-muted-foreground'} hover:text-primary`}
      >
        Dataecho
      </Link>
      <Link
        href="/settings"
        className={`text-sm font-medium transition-colors ${asPath === '/settings' ? 'text-primary' : 'text-muted-foreground'} hover:text-primary`}
      >
        Settings
      </Link>
    </nav>
  )
}
