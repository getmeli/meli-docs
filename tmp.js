const str = `"
# SSL

Meli is built on top of [Caddy](https://caddyserver.com/). Hence, it natively supports automatic SSL certificate issuance and renewal. By default, it uses LetsEncrypt, but Meli can obtain SSL certificates from a certification authority (CA) using the ACME protocol.

## Test with Let'sEncrypt staging environment

Let's Ecnrypt production [rate limits](https://letsencrypt.org/docs/rate-limits/) leave small room for error. Hence, we recommend using their staging environment to start off. All you need to do is to set:

<div class="code-group">

\`\`\`dotenv
MELI_ACME_SERVER=https://acme-staging-v02.api.letsencrypt.org/directory
\`\`\`

</div>

## Using a custom ACME server

If you want to use a custom another CA:

<div class="code-group">

\`\`\`dotenv
# The URL to the ACME directory, here is an example 
MELI_ACME_SERVER=https://acme-staging-v02.api.letsencrypt.org/directory

# Optionaly, if using a private ACME server, you should specify:
MELI_ACME_CADDY_CA_PATH=<path to the CA certificate in the Caddy container>
\`\`\`

</div>
"`;

function highlight(content, query) {
  if (!query) {
    return content;
  }
  const sanitizedKeyword = (query || '').replace(/\W/g, '');
  const patternWithOffset = new RegExp(`.{0,40}(${sanitizedKeyword}).{0,40}`, 'gi');
  const matches = content.match(patternWithOffset);
  if (!matches) {
    return content;
  }
  const queryRegex = new RegExp(sanitizedKeyword, 'gi');
  return matches
    .map(str => str.replace(queryRegex, match => (
      `<strong class="highlight">${match}</strong>`
    )))
    .join(' ... ');
}

console.log(highlight(str, 'ssl'));
