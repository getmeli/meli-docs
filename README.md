<p align="center">
  <a href="https://meli.sh">
    <img alt="meli-logo" src="https://raw.githubusercontent.com/gomeli/meli-brand/latest/logo/meli-logo-circle-black.svg" width="100"/>
  </a>
</p>
<h1 align="center">meli-docs</h1>
<p align="center">Open source platform for deploying static sites and frontend applications.</p>

## Get started

1. Install dependencies `npm run install`
1. Run `cp .env.example .env`
1. Start `npm start`

## Page info

You set metadata at the top of your Markdown files. It's not mandatory, but allows you to control SEO data.

```markdown
---
title: 'page title'
excerpt: 'some description'
isHomePage: true | false
---
```

## Special markdown blocks

**Code blocks**

Blank lines are important.

    <div class="code-group">

    ```yaml
    # Your code here
    ```

    </div>

To show line numbers:

    <div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

    ```yaml
    # Your code here
    ```

    </div>

To add a file name:

    <div class="code-group" data-props='{ "lineNumbers": ["true"], "labels": ["my-file.yaml"] }'>

    ```yaml
    # Your code here
    ```

    </div>

**Info/Warning/Danger**

Blank lines are important.

```markdown
<div class="blockquote" data-props='{ "mod": "info" }'>

Your content here.

</div>
```

```markdown
<div class="blockquote" data-props='{ "mod": "warning" }'>

Your content here.

</div>
```

```markdown
<div class="blockquote" data-props='{ "mod": "danger" }'>

Your content here.

</div>
```
