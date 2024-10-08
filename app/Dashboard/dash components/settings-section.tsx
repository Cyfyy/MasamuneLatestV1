import { useState } from "react"
import { Button } from "@/app/Dashboard/dash components/ui/button"
import { Input } from "@/app/Dashboard/dash components/ui/input"
import { Label } from "@/app/Dashboard/dash components/ui/label"
import { Switch } from "@/app/Dashboard/dash components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/Dashboard/dash components/ui/tabs"

export function SettingsSection() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Enter your username" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <Button>Save Changes</Button>
        </div>
      </TabsContent>
      <TabsContent value="appearance">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
            <Label htmlFor="dark-mode">Enable Dark Mode</Label>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
            <Label htmlFor="notifications">Enable Notifications</Label>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}