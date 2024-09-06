import  CredentialsProvider  from 'next-auth/providers/credentials'

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "hello@gov.lk" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log(credentials)
                const credentialData = {
                    username: credentials?.email,
                    password: credentials?.password
                }
                console.log(credentialData)
                const res = await fetch('http://localhost:4000/api/admin/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credentialData)
                })
                    
                const user = await res.json()
                console.log(user)

                if (user) {
                    return user
                    
                } else {
                    return null
                }
            

            }
        })
    ],

    callbacks: {
        async session({ session, token, user }) {
            session.user = token
            return session;
          },
    },

    theme: {
        colorScheme: "light",
    },
    pages: {
        signIn: '/',
    },
}

export default authOptions
