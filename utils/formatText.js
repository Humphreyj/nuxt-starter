export function format(input) {
  let text = input
  return {
    title: function () {
      text = text
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      return text
    },
    phone: function () {
      let cleaned = ('' + text).replace(/\D/g, '')

      if (cleaned.length > 3) {
        text = cleaned.slice(0, 3) + '-' + cleaned.slice(3, 6)
        if (cleaned.length > 6) {
          text += '-' + cleaned.slice(6, 10)
        }
      } else {
        text = cleaned
      }

      return text
    },
    urlTitle: function () {
      let urlTitle = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with '-'
        .replace(/^-|-$/g, '') // Remove leading and trailing '-'
        .slice(0, 50) // Limit to 50 characters
        .trim() // Trim whitespace
      text = urlTitle
      return text
    },
    date: function (showTime) {
      let options
      if (showTime) {
        options = {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }
      } else {
        options = {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }
      }
      const date = new Date(text)

      text = new Intl.DateTimeFormat('en-US', options).format(date)

      return text
    },
    address: function () {
      const { address_line_1, city, state, zip } = text
      let result = `${address_line_1} ${city}, ${state.toUpperCase()} ${zip}`
      text = result
      return text
    },
    number: function () {
      text = new Intl.NumberFormat('en-US').format(text)
      return text
    },
    currency: function () {
      text = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(text)
      return text
    },
  }
}

export const handleFormat = (input, type, showTime) => {
  const formatText = format(input)
  let result
  switch (type) {
    case 'title':
      result = formatText.title()
      break
    case 'phone':
      result = formatText.phone()
      break
    case 'date':
      result = formatText.date(showTime)
      break
    case 'address':
      result = formatText.address()
      break
    case 'number':
      result = formatText.number()
      break
    case 'currency':
      result = formatText.currency()
      break
    default:
      return input
  }
  return result
}
