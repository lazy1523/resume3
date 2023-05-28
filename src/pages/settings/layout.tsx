import { Metadata } from "next"
import Image from "next/image"

import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/components/sophon/settings/components/sidebar-nav"
import  Profile from "@/components/sophon/settings/profile"
import Account from '@/components/sophon/settings/account';
import Appearance from '@/components/sophon/settings/appearance';
import Notifications from '@/components/sophon/settings/notifications';
import Display from '@/components/sophon/settings/display';

import { useRouter } from "next/router";


export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings/profile",
  },
  {
    title: "Account",
    href: "/settings/account",
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
  },
  {
    title: "Display",
    href: "/settings/display",
  },
]

interface SettingsLayoutProps {
  setting: string
}

export default function SettingsLayout({ setting }: SettingsLayoutProps) {

  const componentsMap: { [key: string]: JSX.Element } = {
    "profile": <Profile />,
    "account": <Account />,
    "appearance": <Appearance />,
    "notifications": <Notifications />,
    "display": <Display />,
  };

  const CurrentComponent = componentsMap[setting] || <Profile />; // 默认为 ProfileForm

  return (
    <div className="space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{CurrentComponent}</div>
      </div>
    </div>
  );
}
