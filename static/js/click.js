

document.querySelector('#tea-form-main').addEventListener('submit', (e) => {
    e.preventDefault(); 

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
