// JavaScript to handle form submission and display results

// functions for one concern
document.querySelector('#one-concern').addEventListener('click', (e) => {
    const container = document.querySelector('#one-concern-rec')
    const result = document.querySelector('#recommendations');
    if (container.innerHTML == '' && result.innerHTML == '') {
        container.innerHTML = `
        <form id="tea-form">
                    <label for="health_concern">Enter a health concern (e.g., "anti-anxiety effects"):</label>
                    <input type="text" id="health_concern" name="health_concern" placeholder="Your Concern*" required>
                    <button type="submit">Get Tea Recommendations</button>
                </form>
        `;
        document.querySelector('#tea-form').addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent form from reloading the page

            const healthConcern = document.querySelector('#health_concern').value;

            fetch('/recommend_single', {
                method: 'POST',
                body: new URLSearchParams({
                    'health_concern': healthConcern
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(response => response.json())
                .then(data => {
                    const recommendationsDiv = document.querySelector('#recommendations');
                    recommendationsDiv.innerHTML = '';

                    if (data.error) {
                        recommendationsDiv.innerHTML = `<p>${data.error}</p>`;
                    } else {
                        let html = '<h3>Recommended Teas:</h3><ul>';
                        data.recommended_teas.forEach(tea => {
                            html += `<li>${tea}</li>`;
                        });
                        html += '</ul>';
                        recommendationsDiv.innerHTML = html;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });

    } else {
        container.innerHTML = '';
        result.innerHTML = '';
    }


})

document.querySelector('#multiple-concerns').addEventListener('click', () => {
    const container = document.querySelector('#multiple-concerns-div');
    const result = document.querySelector('#optimal-recommendations');
    if (container.innerHTML == '' && result.innerHTML == '') {
        container.innerHTML = `
        <form id="multi-tea-form">
        <label for="concern_one">Primary Concern*</label>
        <input type="text" id="concern_one" name="health_concern_one" required>

        <label for="concern_two">Secondary Concern*</label>
        <input type="text" id="concern_two" name="health_concern_two" required>

        <label for="taste_preference">Taste Preference</label>
        <input type="text" id="taste_preference" name="taste_preference">

        <button type="submit">Get Tea Recommendations</button>
    </form>
        `;
        document.querySelector('#multi-tea-form').addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent form from reloading the page

            const healthConcernOne = document.querySelector('#concern_one').value;
            const healthConcernTwo = document.querySelector('#concern_two').value;
            const taste = document.querySelector('#taste_preference').value

            fetch('/recommend', {
                method: 'POST',
                body: JSON.stringify({
                    'concern_one': healthConcernOne,
                    'concern_two': healthConcernTwo,
                    'taste': taste
                }),
                headers: {
                    'Content-Type': 'application/json'
                }

            })
                .then(response => response.json())
                .then(data => {
                    const recommendationsDiv = document.querySelector('#optimal-recommendations');
                    recommendationsDiv.innerHTML = ''
                    if (data.error) {
                        recommendationsDiv.innerHTML = `<p>${data.error}</p>`;
                    } else {
                        let html = '<h3>Recommended Teas:</h3><ul>';
                        data.recommended_teas.forEach(tea => {
                            html += `<li>${tea}</li>`;
                        });
                        html += '</ul>';
                        recommendationsDiv.innerHTML = html;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });

    } else {
        container.innerHTML = '';
        result.innerHTML = '';
    }


})

// update HTML for tea by characteristic 

document.querySelector('#tea-characteristics').addEventListener('click', () => {
    const container = document.querySelector('#characteristics-div'); 
    const result = document.querySelector('#characteristic-recommendations');
    if (container.innerHTML == '' && result.innerHTML === '') {
        container.innerHTML = `
        <form id="tea-characteristic-form">
        <label for="characteristic">Tea Characteristic*</label>
        <input type="text" id="characteristic" name="characteristic" required>
        <button type="submit">Explore Teas</button>
    </form>
        `;
        document.querySelector('#tea-characteristic-form').addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent form from reloading the page

            const characteristic = document.querySelector('#characteristic').value;

            fetch('/recommend_characteristic', {
                method: 'POST',
                body: JSON.stringify({
                    'characteristic': characteristic
                }),
                headers: {
                    'Content-Type': 'application/json'
                }

            })
                .then(response => response.json())
                .then(data => {
                    const recommendationsDiv = document.querySelector('#characteristic-recommendations');
                    recommendationsDiv.innerHTML = '';
                    if (data.error) {
                        recommendationsDiv.innerHTML = `<p>${data.error}</p>`;
                    } else {
                        let html = '<h3>Recommended Teas:</h3><ul>';
                        data.recommended_teas.forEach(tea => {
                            html += `<li>${tea}</li>`;
                        });
                        html += '</ul>';
                        recommendationsDiv.innerHTML = html;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });

    } else {
        container.innerHTML = '';
        result.innerHTML = '';
    }

})

// update HTML for tea compare

document.querySelector('#compare-teas').addEventListener('click', () => {
    const container = document.querySelector('#compare-teas-div');
const result = document.querySelector('#tea-comparison-facts');
    if (container.innerHTML == '' && result.innerHTML == '') {
        container.innerHTML = `
        <form id="tea-compare-form">
            <label for="tea-one">Enter first tea type:</label>
            <input type="text" id="tea-one" name="tea-one" placeholder="Tea Type*" required>
            <label for="tea-two">Enter second tea type:</label>
            <input type="text" id="tea-two" name="tea-two" placeholder="Second Tea Type*" required>
            <label for="tea-compare-criteria">Comparison criteria:</label>
            <input type="text" id="tea-compare-criteria" name="tea-compare-criteria" placeholder="Comparison Criteria*" required>
            <button type="submit">Compare</button>
        </form>
    `;

        document.querySelector('#tea-compare-form').addEventListener('submit', (e) => {
            e.preventDefault();

            const tea_one = document.querySelector('#tea-one').value;
            const tea_two = document.querySelector('#tea-two').value;
            const criteria = document.querySelector('#tea-compare-criteria').value;

            fetch('/compare_teas', {
                method: 'POST',
                body: JSON.stringify({
                    tea_one,
                    tea_two,
                    characteristic: criteria
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    const recommendationsDiv = document.querySelector('#tea-comparison-facts');
                    recommendationsDiv.innerHTML = '';
                    if (data.error) {
                        recommendationsDiv.innerHTML = `<p>${data.error}</p>`;
                    } else {
                        recommendationsDiv.innerHTML = `
                    <h3>Comparison Based on ${criteria}:</h3>
                    <ul>
                        <li>${tea_one}: ${data.recommended_teas[0]}</li>
                        <li>${tea_two}: ${data.recommended_teas[1]}</li>
                    </ul>
                `;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });

    } else {
        container.innerHTML = '';
         result.innerHTML = '';
    }


});




