import getHostedSession from 'mastercard-hosted-session'

const initialiseForm = () => {
  getHostedSession({
    merchantId: 'TESTEVEDAYHSBC01',
    config: {
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
    }
  })
}

document.addEventListener('DOMContentLoaded', initialiseForm)
