# AN Email Archive

This project was built to archive email newsletters from Action Network but can work for any html email newsletter. It uses https://www.11ty.dev/ & https://tailwindcss.com/.

## How to archive emails

From Action Network:

-   go to `People > Emails` (hover for list icon)
-   Click "manage" on the email you want to export
-   Click "View Email"
-   Find the "VIEW HTML" section toward the right hand side of the page
-   Select & copy the entirety of the content in that textarea
-   Create a new file in the archive directory with the following naming convention `YYYY-MM-DD.html`. Example: `2022-05-01.html`.
    -   If you have multiple emails for the same date, use the following naming convention `YYYY-MM-DD_first-email.html`, `YYYY-MM-DD_second-email.html`.
    -   Copy and paste the content of the email into the file that was created
    -   Add the following snippet of code to the beginning of the email to expose an email title for the archive list page.

```
---js
{
  title: "Our May Newsletter"
}
---

```

The html file should look like similar to the example in the `/archive` directory or the following snippet:

```
---js
{
  title: "Our May Newsletter"
}
---

<html>
email content
</html>
```

### Updating templates

To update the page template, check out the wrapper file `_includes/default.njk`, which is mostly html with a special templating language called nunjucks.

## Dev Requirements

-   Node.js > v10

### Install deps

```sh
npm install
```

### Develop locally

Run the following:

```sh
npm start
```

A local server should now be running at http://localhost:8080/

### Build static site

Build your site content with the following command:

```sh
npm run build
```

### Deploy

TODO: For now, upload `_site` to static hosting of choice.
