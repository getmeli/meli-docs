---
title: 'Forms' 
excerpt: ''
---

# Forms

Meli allows you to submit HTML forms easily. At the moment, we only support sending form submissions by email. Hence, you will need
to [configure emails](/configuration/emails) beforehand.

<div class="blockquote" data-props='{ "mod": "info" }'>

Inputs of type `file` are sent as attachments.

</div>

## Captcha

Forms can be protected using Google Recaptcha V3.

1. Get your API keys [here](https://www.google.com/recaptcha/admin/create).
1. Configure environment variables in Meli:

```dotenv
MELI_GOOGLE_RECAPTCHA_SITE_KEY=
MELI_GOOGLE_RECAPTCHA_SECRET_KEY=
```

## Using <script/>

Place a `.meli.yml` at your site root:

```yaml
forms:
  form1:
    type: email
    recipient: test@test.com
```

Create an HTML form:

```html
<!doctype html>
<html>
<head>
    <!-- ... other scripts -->
    <script async src="https://unpkg.com/@getmeli/sdk@^1/build/browser.js"></script>
</head>
<body>

<form data-form="form1" id="my-form">
    <input type="text" name="name">
    <input type="file" name="logo">
    <button type="submit">Submit</button>
</form>

<script>
    const formElement = document.getElementById('my-form');
    formElement.addEventListener('submitting', () => {
        console.log('submitting');
    });
    formElement.addEventListener('submitted', () => {
        console.log('submitted');
    });
</script>

</body>
</html>
```

By default, the sdk automatically looks for forms with the `data-form` attribute. You can disable this by:

- adding the `data-meli-init="false"` to your script tag
- removing the `async` directive from your script tag

```html

<script ... data-meli-init="false"></script>
<script>
    Meli.Forms.init().catch(console.error);
</script>
```

## Using Npm

Install the SDK:

```
npm i @getmeli/sdk
```

Use it in your code:

```js
import Meli from 'meli';

Meli.Forms.init().catch(console.error);
```

## Api

To pass your own forms:

```js
const form = document.getElementById('my-form');

Meli.Forms
  .init([form])
  .catch(console.error);
```

Manually create a form and bind it:

```js
Meli.Forms
  .init([]) // passing the empty array cancels the auto detection
  .then(() => {
    const formElement = document.getElementById('my-form');
    const form = new Meli.Forms.Form(form);
  })
  .catch(console.error);
```

To remove all listeners:

```js
// ...
const form = new Meli.Forms.Form(form);
forms.remove();
```

## Events

On the HTML form element:

```js
const formElement = document.getElementById('my-form');
formElement.addEventListener('submitted', () => {
  console.log('submitted');
});
```

Or on the `Form` object:

```js
Meli.Forms
  .init([])
  .then(() => {
    const formElement = document.getElementById('my-form');
    const form = new Meli.Forms.Form(form);
    form.addEventListener('submitted', () => {
      console.log('submitted');
    });
  })
  .catch(console.error);
```

| Event | Callback signature | Description |
|----|----|----|
| `submitting` | `() => void` | The form submit callback was called. |
| `submitted` | `() => void` | The form was submitted successfully. |
| `error` | `(error) => void` | Something went wrong. |
