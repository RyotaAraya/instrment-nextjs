import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

const Header = () => {
    const { data: session } = useSession()
    return (
        <header className="bg-slate-700">
            <nav
                className="mx-auto flex max-w-7xl items-center justify-between p-6 px-8"
                aria-label="Global"
            >
                <div>
                    <Link href="/">
                        <span className="test-sm text-gray-400">Instrment</span>
                    </Link>
                </div>
                <div className="flex justify-end">
                    {!session && (
                        <button
                            className="text-lg text-gray-200"
                            onClick={() => signIn()}
                        >
                            Log in <span aria-hidden="true">&rarr;</span>
                        </button>
                    )}
                    {session && (
                        <button
                            className="text-sm text-gray-200"
                            onClick={() => signOut()}
                        >
                            Log out <span aria-hidden="true">&rarr;</span>
                        </button>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Header
