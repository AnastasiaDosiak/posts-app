# Posts app
###  Project description
This is a web application that consists of the following pages:

#### Home Page

The Home page displays a list of posts with search capability. Users can search for posts by entering a search value. Clicking on an item in the list will open the details page for that post.

#### Post Page

The Post page displays the details of a selected post.

## Technologies used

The project is built using the following technologies:
   [Nuxt](https://nuxt.com/), [Pinia](https://pinia.vuejs.org/) and [Antdv](https://antdv.com/components/overview)

## API

The web application uses the Dummy Rest API service, which provides the following endpoints for posts:

    Getting Posts and search by provided query: https://dummyjson.com/posts/search?q=<search value>&limit=<given limit>&skip=<given skip>
    Get Post by ID: https://dummyjson.com/posts/<postId>

## Running the project 🏃

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```


