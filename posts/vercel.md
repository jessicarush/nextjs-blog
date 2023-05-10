---
title: 'Deploying a Next.js app to Vercel'
date: '2023-05-10'
---

<!-- The above is YAML front-matter -->
<!-- gray-matter can parse this into an object -->

Vercel is made by the creators of Next.js and has first-class support for Next.js. When you deploy your Next.js app to Vercel, the following happens by default:

- Pages that use Static Generation and assets (JS, CSS, images, fonts, etc) will automatically be served from the Vercel Edge Network, which is blazingly fast.
- Pages that use Server-Side Rendering and API routes will automatically become isolated Serverless Functions. This allows page rendering and API requests to scale infinitely.

They also have:

- Ability to add your own domains 
- Environment variables
- Automatic HTTPS: HTTPS is enabled by default (including custom domains) and doesn't require extra configuration. They auto-renew SSL certificates.
- Automatic preview deployments for pull requests on master/main
- Automatic production deployments for any new push/merge to master/main

Follow the steps for [deploying your Next.js app](https://nextjs.org/learn/basics/deploying-nextjs-app/deploy).

They recommend the **Develop, Preview, Ship** process:

- **Develop**: Code in Next.js and use the Next.js development server running to take advantage of its hot reloading feature.
- **Preview**: Push changes to a branch on GitHub, and Vercel creates a preview deployment that’s available via a URL. You can share this preview URL with others for feedback. In addition to doing code reviews, you can do deployment previews.
- **Ship**: Merged the pull request to main to ship to production.