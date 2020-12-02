<p align="center">
  <img alt="Metroline Logo" src="https://raw.githubusercontent.com/metroline/metroline-brand/master/metroline-logo.svg" width="100" />
</p>
<h1 align="center">
  Metroline Docs
</h1>

This repository contains the sources of  [https://docs.metroline.io](https://docs.metroline.io). Feel free to improve it !

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

```markdown
<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

\`\`\`yaml
#Your code here
\`\`\`

</div>
```

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

## Algolia

You can find this info in your Algolia account under **API keys**.

```dotenv
ALGOLIA_ADMIN_KEY=
GATSBY_ALGOLIA_APP_ID=
GATSBY_ALGOLIA_INDEX_NAME=
GATSBY_ALGOLIA_SEARCH_ONLY_KEY=
```
