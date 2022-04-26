export const relativeValues = {
    metric: {
        weight: {
            milligrams: { value: .001, abbrev: 'mg' },
            grams: { value: 1, abbrev: 'g', selected: true },
            kilograms:{ value: 1000, abbrev: 'k' } 
        },
        volume: {
            milliliters: { value: 1, abbrev: 'mL', selected: true },
            liters: { value: 1000, abbrev: 'L' }
        }
    },
    us: {
        weight: {
            pounds: { value: 454, abbrev: 'lbs.' },
            ounces: { value: 28, abbrev: 'oz.', selected: true }
        },
        volume: {
            cups: { value: 240, abbrev: 'C', selected: true },
            quarts: { value: 946, abbrev: 'Q' },
            gallons: { value: 3785, abbrev: 'G' },
            teaspoons: { value: 4.929, abbrev: 'tsp.' },
            tablespoons: { value: 14.787, abbrev: 'tbsp.' },
            fluidOunces: { value: 29.575, abbrev: 'fl. oz.' }
        }
    }
}