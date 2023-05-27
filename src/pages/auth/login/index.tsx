import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { Metadata } from "next"
import Link from 'next/link';
import useLogin from "@/src/pages/api/auth/login";


export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function LoginPage() {
  const login= useLogin();
  const handleLogin = async () => {
    await login('test1@example.com','string');
  }

  return (
    <div className="flex items-center justify-center min-h-screen [&>div]:w-1/4">

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login your account
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
            <CardDescription ><a href="/auth/forgot" style={{ textDecoration: 'underline', color: '#1890ff' }}>Forgot Password?</a></CardDescription>
          </div>


        </CardContent>
        <CardFooter>
          <div className="w-full grid gap-2">
            <Button onClick={()=>handleLogin()} >Login</Button>
            <Link href={"/auth/register"}>
              <Button className="w-full">Register</Button>
            </Link>

          </div>
        </CardFooter>
        <CardFooter className="grid gap-2">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline">
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline">
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </CardFooter>
        <CardFooter>
          <div className="w-full grid gap-2">
            <Button variant="outline" onClick={()=>handleLogin()} >
            <Icons.media className="mr-2 h-4 w-4" />
              MetaMask</Button>
          </div>
        </CardFooter>

      </Card>
    </div>
  )
}
