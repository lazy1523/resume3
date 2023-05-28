import { useRouter } from 'next/router'
import SettingsLayout from './layout'

export default function SettingsPage() {
  const router = useRouter();
  const { setting } = router.query;

  return (
    <SettingsLayout setting={setting as string} />
  )
}
