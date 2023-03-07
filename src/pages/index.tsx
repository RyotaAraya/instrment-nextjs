import { signIn, signOut, useSession } from "next-auth/react"

import TopPageTemplate from "@/components/Templates/TopPageTemplate"

export default function Component() {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                Signed in as {session.user?.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
                <TopPageTemplate />
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}
