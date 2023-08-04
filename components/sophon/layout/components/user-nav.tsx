
import { Button } from "@/components/ui/button"
import { useRecoilState } from "recoil"
import { userState } from "@/store/globalState"

export function UserNav() {
  const [user, setUser] = useRecoilState(userState);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/auth/login';
  }
  
  return (
    <Button variant="secondary" className="">Connect Wallet</Button>
  )
}
