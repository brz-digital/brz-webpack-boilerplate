import setMask from './setMask'

class Mask {
  constructor () {
    // Phone
    setMask('.js-mask-phone', {
      mask: [{ mask: '(00) 0000-0000' }, { mask: '(00) 00000-0000' }]
    })

    /* Date */
    setMask('.js-mask-date', {
      mask: Date,
      lazy: false
    })

    /* Documents */
    setMask('.js-mask-cpf', {
      mask: '000.000.000-00'
    })

    setMask('.js-mask-cnpj', {
      mask: '00.000.000/0000-00'
    })

    setMask('.js-mask-cpf-cnpj', {
      mask: [{ mask: '000.000.000-00' }, { mask: '00.000.000/0000-00' }]
    })

    /* Cep */
    setMask('.js-mask-cep', {
      mask: '00000-000'
    })

    /* Money */
    setMask('.js-mask-money', {
      mask: 'R$ num',
      blocks: {
        num: {
          mask: Number,
          thousandsSeparator: '.',
          radix: ','
        }
      }
    })
  }
}

export const mask = new Mask()
