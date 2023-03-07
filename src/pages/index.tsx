import { signIn, signOut, useSession } from "next-auth/react"

import TopPageTemplate from "@/components/Templates/TopPageTemplate"

export default function Component() {
    const { data: session } = useSession()
    return (
        <section className="flex justify-center">
            {session && <TopPageTemplate />}
        </section>
    )
}
