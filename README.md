# OpenGuild App

Using NextJS v14.2.5

# How to run.

1. Install packages

```bash
yarn
```

2. Create .env file

3. Run project

```bash
yarn dev
```

# Project Structure

![structure](public/assets/images/docs/structure.png)

1. /app: This is where to create and configure for pages in Nextjs.
2. /assets: Collections of assets like images.
3. /components: Common, re-usable components.
4. /constants: All constants in the app.
5. /context: Global state.
6. /hooks: Custom hooks for easier stage management
7. /supabase: Configurations, endpoints and functions to interact with Supabase.
8. /utils: Utility functions.

# Deployment

1. **Vercel**:

- Deploy following this guideline for NextJS application: https://nextjs.org/learn-pages-router/basics/deploying-nextjs-app/deploy

![structure](public/assets/images/docs/vercel-settings.png)

- Add the _Enviroment Variable_ like below to avoid publibshing the .env file

![env](public/assets/images/docs/env.png)

- Follow this guide to point the custom domain to the vercel page: https://vercel.com/docs/projects/domains/add-a-domain

2. **Netlify**:

- Deploy following this guideline for NextJS application: https://www.netlify.com/blog/2020/11/30/how-to-deploy-next.js-sites-to-netlify/
- Remember to setup as NextJS project
- Make sure there's netlify.toml file with below content (if missing):

  ![netlify](public/assets/images/docs/netlify.png)

- Add _Environment Variables_ like Vercel

  ![netlify](public/assets/images/docs/env-netlify.png)

# Others

- Particle Docs: https://developers.particle.network/reference/connect-web
