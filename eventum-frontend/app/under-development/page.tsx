import { UnderDevelopment } from "@/components/ui/UnderDevelopment"
import Link from "next/link"

export default function UnderDevelopmentPage() {
    return (
        <main className="bg-white flex flex-col">
            <div className="container mx-auto px-4 max-w-7xl py-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    На главную
                </Link>
            </div>

            <UnderDevelopment />
        </main>
    )
}
