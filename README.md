## Upvote

Upvote is a Reddit-esque web application that allows users to create posts, upvote and downvote posts, and comment on posts in a multi-threaded, nested list.

## Setup instructions

1. Fork the repository (check "copy the main branch only") and clone your fork to your local machine
2. Run `npm install`
3. Create a `.env.local` file in the root directory and add the following environment variables:
   - `DATABASE_URL` - the URL of your Postgres database (eg. the Supabase connection string)
   - `AUTH_SECRET` - the Next Auth secret string (this can be anything at all like a password, but keep it secret!)
   - `AUTH_GITHUB_ID` - the GitHub OAuth client ID (create yours in [Github developer settings](https://github.com/settings/developers)
   - `AUTH_GITHUB_SECRET` - the GitHub OAuth client secret (create this in [Github developer settings](https://github.com/settings/developers))
4. Create the database schema by running the SQL commands in `schema.sql` in your database (eg. by running the commands in Supabase Query Editor)
5. Run `npm run dev` to start the development server
6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the site

# Reflection

🎯 Please mention the requirements you met and which goals you achieved for this assignment.
-I met the requirement of deploying the project with a few fixes in the project:
- Fixes added:
   - Page titles match post
   - Error message when trying to vote when not logged in
   - Fixed being able to vote more than once & voting infinite times
   - Fixed comments showing reply when not logged in
   - Added deleting posts/comments
   - Added profile pictures to posts
   - Probably more i forgot to mention here


🎯 Were there any requirements or goals that you were not quite able to achieve?
- No

🎯 If so, could you please tell us what was it that you found difficult about these tasks?
- I didnt struggle
