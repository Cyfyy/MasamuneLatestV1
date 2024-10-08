"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X, Facebook, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/app/Dashboard/dash components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/Dashboard/dash components/ui/dropdown-menu"
import { ScrollArea } from "@/app/Dashboard/dash components/ui/scroll-area"
import { Separator } from "@/app/Dashboard/dash components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/app/Dashboard/dash components/ui/sheet"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/Dashboard/dash components/ui/tooltip"
import { cn } from "@/lib/utils"
import { DashboardOverview } from "@/app/Dashboard/dash components/dashboard-overview"
import { TrackerSection } from "@/app/Dashboard/dash components/tracker-section"
import { DonateModal } from "@/app/Dashboard/dash components/donate-modal"
import { LogsSection } from "@/app/Dashboard/dash components/logs-section"
import { SettingsSection } from "@/app/Dashboard/dash components/settings-section"
import { FaDiscord } from "react-icons/fa"


export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [activeSection, setActiveSection] = useState("dashboard")
    const { setTheme, theme } = useTheme()
    const [username, setUsername] = useState("John Doe") // This would be set after user login

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    const renderContent = () => {
        switch (activeSection) {
            case "dashboard":
                return <DashboardOverview />
            case "tracker":
                return <TrackerSection />
            case "donate":
                return <DonateModal />
            case "logs":
                return <LogsSection />
            case "settings":
                return <SettingsSection />
            default:
                return <DashboardOverview />
        }
    }

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed left-0 top-0 z-40 h-screen w-64 transform transition-transform duration-200 ease-in-out",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex h-full flex-col overflow-y-auto border-r bg-card px-3 py-4">
                    <div className="mb-4 flex items-center justify-center">
                        <Image src="/logo.svg" alt="Masamune Logo" width={120} height={40} />
                    </div>
                    <nav className="space-y-2">
                        {["dashboard", "tracker", "donate", "logs", "settings"].map((item) => (
                            <Button
                                key={item}
                                variant={activeSection === item ? "default" : "ghost"}
                                className="w-full justify-start"
                                onClick={() => setActiveSection(item)}
                            >
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </Button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className={cn("flex-1 overflow-auto", sidebarOpen ? "ml-64" : "ml-0")}>
                {/* Navbar */}
                <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4">
                    <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
                        <Menu className="h-6 w-6" />
                    </Button>
                    <div className="flex items-center space-x-4">
                        <h1 className="text-2xl font-bold" style={{ fontFamily: "Revalia, cursive" }}>
                            Masamune
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={() => window.open("https://discord.com", "_blank")}>
                                        <FaDiscord className="h-5 w-5" />
                                        <span className="sr-only">Discord</span>
                                    </Button>

                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Join our Discord</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={() => window.open("https://facebook.com", "_blank")}>
                                        <Facebook className="h-5 w-5" />
                                        <span className="sr-only">Facebook</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Follow us on Facebook</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Image
                                        src="/placeholder-user.jpg"
                                        alt="User avatar"
                                        className="rounded-full object-cover"
                                        width={32}
                                        height={32}
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuItem className="flex-col items-start">
                                    <div className="text-sm font-medium">Welcome, {username}!</div>
                                    <div className="text-xs text-muted-foreground">Manage your account</div>
                                </DropdownMenuItem>
                                <Separator className="my-1" />
                                <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                                    <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                    <span>Toggle theme</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4">
                    <ScrollArea className="h-full rounded-md border p-4">{renderContent()}</ScrollArea>
                </main>
            </div>
        </div>
    )
}