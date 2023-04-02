import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export default function ThemeToogler() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    return (
        <select value={theme} className="appearance-none text-sm opacity-75 bg-white dark:bg-black mt-0 sm:-mt-1 focus:outline-none" onChange={e => setTheme(e.target.value)} data-test-id='theme-selector'>
            <option value="system">Follow System</option>
            {mounted && (
                <>
                    <option value="dark">Always Dark</option>
                    <option value="light">Always Light</option>
                </>
            )}
        </select>
    )
}