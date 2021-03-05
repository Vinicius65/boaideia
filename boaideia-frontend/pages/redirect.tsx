import React from 'react';
import { getSession } from 'next-auth/client'
import Router from 'next/router';

export default async function getInitialProps(context) {
    const session = await getSession(context)

    if (!session?.user) {
        if (context.res) {
            context.res.writeHead(307, { Location: '/' })
            context.res.end()
        } else {
            Router.replace('/')
        }
        return {}
    }
    return { props: { user: session.user } }
}