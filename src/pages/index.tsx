import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Button } from '@/components/ui/button'
import { useRecoilState } from 'recoil';
import { countState, loadingVisibleState } from '@/store/globalState';
import { useToast } from "@/components/ui/use-toast";
import useAxios from "@/src/lib/useAxios";
import { Loader2 } from "lucide-react"
import DashboardPage from '@/components/sophon/dashboard';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
     <DashboardPage />
  )
}
