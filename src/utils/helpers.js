const systemValues = {
    metric_weight: {
        grams: 1,
        milligrams: .001,
        kilograms: 100
    },

    metric_volume: {
        milliliters: 1,
        liters: 1000
    },

    us_weight: {
        ounces: 28.35,
        pounds: 454
    },

    us_volume: {
        cups: 240,
        quarts: 946,
        gallons: 3785,
        fluid_ounces: 29.574,
        tablespoons: 14.787,
        teaspoons: 4.929
    }
}

export function convertMeasure(current, requested, measurement) {    
    const log = (...args) => console.log(...args);

    const curSystem = current[0]
    const curSubmeasure = current[1];
    const curSubmeasureValue = systemValues[curSystem][curSubmeasure];

    const reqSystem = requested[0];
    const reqSubmeasure = requested[1] || compareClosestSubmeasure(); 
    const reqSubmeasureValue = systemValues[reqSystem][reqSubmeasure];
    

    const newMeasurement = curSubmeasureValue / reqSubmeasureValue * measurement;

    function compareClosestSubmeasure() {
        const comparisonValue = curSubmeasureValue / 1 * measurement;
        let newPossibleSubmeasure;
        let leastDifference;
        for (const [key, value] of Object.entries(systemValues[reqSystem])) {
            const difference = Math.abs(comparisonValue - value);
            if (leastDifference) {
                if (difference < leastDifference) {
                    leastDifference = difference;
                    newPossibleSubmeasure = key;
                }
            } else {
                leastDifference = difference;
                newPossibleSubmeasure = key;
            }
        }
        return newPossibleSubmeasure;
    }
    console.log(reqSubmeasure);
    return { 
        newMeasurement: newMeasurement.toFixed(6),
        newSubmeasure: reqSubmeasure
    }
    
}

