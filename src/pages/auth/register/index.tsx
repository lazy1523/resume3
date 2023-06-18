import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { Metadata } from "next"
import Link from "next/link"
// import {ArrowLeftToLine} 
export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen [&>div]:w-1/4">

      <Card>
        <CardHeader className="space-y-1">
          <CardDescription>
            <Link style={{ color: '#1890ff' }} href="/auth/login" passHref>
            <Icons.chevronLeft className="h-5 w-5" /> Login
            </Link>
          </CardDescription>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Create account</Button>
        </CardFooter>
      </Card>
    </div>
  )
}