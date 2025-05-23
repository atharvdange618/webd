# Currency Exchange App

## Overview

The Currency Exchange App is built using React and utilizes the currency exchange API created by Fawaz Ahmad. With this app, users can easily convert between different currencies to get accurate exchange rates.

## Features

- **Currency Conversion**: Allows users to convert between different currencies.
- **Accurate Exchange Rates**: Utilizes the currency exchange API by Fawaz Ahmad to provide accurate and up-to-date exchange rates.
- **Swap Currency**: Allows users to swap the 'From' and 'To' currencies.
- **Copy to Clipboard**: Easily copy the converted amount to your clipboard.

## API Used

The app utilizes the currency exchange API created by Fawaz Ahmad. Here's the API endpoint:

- **API**: [Currency Exchange API by Fawaz Ahmad](https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/)

### Example: API Usage (Custom Hook)

Here's the custom hook `useCurrencyInfo` used to fetch currency exchange rates from the API:

```javascript
import { useEffect, useState } from "react";

// Designed a custom hook
function useCurrencyInfo(currency) {
    const [data, setData] = useState({})

    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            .then((res) => res.json())
            .then((res) => setData(res[currency]))
    }, [currency])

    return data
}
```

## Installation

```bash
// Clone the repository
git clone https://github.com/atharvdange618/ReactJS-Practice.git

// Change the directory
cd currency-converter

//Install the necessary dependencies
npm install

//Run the application
npm run dev
```

## Contribution

Your contributions and suggestions are welcome! Here's how you can contribute to this repository:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## Contact

If you have any questions or suggestions, please feel free to contact me:

- Email: [atharvdange.dev@gmail.com](mailto:atharvdange.dev@gmail.com)
- LinkedIn: [Atharv Dange](www.linkedin.com/in/atharvdange)
- Twitter: [@atharvdangedev](https://twitter.com/atharvdangedev)
