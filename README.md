# Hosted Session Init Issue Test Case

This test case is to reproduce the issue I'm seeing with Mastercard's Hosted Session
library. The exact issue I'm seeing is that, although the script initialises on the
card number and security code fields, it fails to initialise on either of the expiry
fields.

The library throws no exception, but the fields do not get attached iframes as they should.
I know the library knows about the existence of the fields in question because I *do* get
a validation error from the `session.js` if I don't include the fields in the form

This is just a little Node/Express app to render a static template with a test form.

## Setup

```bash
npm install
```

## Run

```bash
npm start
```

Then visit `http://localhost:3000` in the browser. You should see that the `#card_number` and
`#security_code` form fields initialise correctly and are interactive, but `#card_expiry_month`
and `#card_expiry_year` do not.

The default route `/raw` reproduces the issue with the library loaded manually.

An alternate route `/wrapped` reproduces the issue using the Promise-based wrapper
library for `session.js` that I'm using in production.

## The Code

The code and markup snippets below are from `/client/raw.js` and `views/raw.hbs` respectively.

```javascript
const initialiseForm = () => {
  PaymentSession.configure({
    fields: {
      card: {
        number: '#card_number',
        securityCode: '#security_code',
        expiryMonth: '#card_expiry_month',
        expiryYear: '#card_expiry_year'
      }
    },
    frameEmbeddingMitigation: ['x-frame-options', 'csp'],
    interaction: {
      displayControl: {
        formatCard: 'EMBOSSED',
        invalidFieldCharacters: 'ALLOW'
      }
    }
  })
}

document.addEventListener('DOMContentLoaded', initialiseForm)
```

```html
<div id="test-hosted-session-page">
    <form id="test-form">
        <div>
            <label for="card_number">Card Number:</label><input type="tel" readonly id="card_number">
        </div>
        <div>
            <label for="card_expiry_month">Expiry Month:</label><input type="tel" readonly id="card_expiry_month">
        </div>
        <div>
            <label for="card_expiry_year">Expiry Year:</label><input type="tel" readonly id="card_expiry_year">
        </div>
        <div>
            <label for="security_code">Security Code:</label><input type="tel" readonly id="security_code">
        </div>
    </form>
</div>

<script type="application/javascript" src="https://ap-gateway.mastercard.com/form/version/51/merchant/TESTEVEDAYHSBC01/session.js"></script>
<script type="application/javascript" src="/javascripts/raw.js"></script>
```
