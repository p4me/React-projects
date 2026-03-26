import { useState } from "react"
import React from 'react'

const data = [
    {
        "id": 1,
        "country": "India",
        "cities": [
            { "id": 101, "name": "Mumbai" },
            { "id": 102, "name": "Delhi" },
            { "id": 103, "name": "Bangalore" }
        ]
    },
    {
        "id": 2,
        "country": "United States",
        "cities": [
            { "id": 201, "name": "New York" },
            { "id": 202, "name": "Los Angeles" },
            { "id": 203, "name": "Chicago" }
        ]
    },
    {
        "id": 3,
        "country": "Australia",
        "cities": [
            { "id": 301, "name": "Sydney" },
            { "id": 302, "name": "Melbourne" },
            { "id": 303, "name": "Brisbane" }
        ]
    },
    {
        "id": 4,
        "country": "Germany",
        "cities": [
            { "id": 401, "name": "Berlin" },
            { "id": 402, "name": "Munich" },
            { "id": 403, "name": "Frankfurt" }
        ]
    }
];

const Practice = ({ name, age, countrySelected }) => {
    const [selectedCountryId, setSelectedCountryId] = useState(null);

    // ✅ find instead of forEach
    const selectedCountry = data.find(
        (item) => item.id === Number(selectedCountryId)
    );
    const cityList = selectedCountry?.cities || [];
    function handelChnage(e) {
        const value = e.target.value;
        setSelectedCountryId(value);
        if (typeof countrySelected === 'function') {
            countrySelected(value);
        }
    };

    return (
        <div>
            <h4>Hello!!!, {name}. How old are you? {age}</h4>
            <select className="testClass" onChange={handelChnage} style={{ backgroundColor: 'purple', padding: '50px'}}>
                <option value="">Select Country</option>
                {
                    data.map((item) => {
                        return <option key={item.id} value={item.id}>
                            {item.country}
                        </option>
                    })
                }

            </select>
            <h1> selected country : {selectedCountry?.country}</h1>
            {
                cityList && cityList.length > 0 && (
                    <select className="testClass">
                        {
                            cityList.map((item) => {
                                return <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            })
                        }

                    </select>
                )
            }

        </div>
    )
}

export default Practice