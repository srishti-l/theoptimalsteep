document.querySelector('.hamburger').addEventListener('click', () => {
    console.log('works');
})


// fetch('teadata.json')
//   .then(response => response.json())
//   .then(data => {
//     // const container = document.getElementById('tea-container');

//     // data.forEach(tea => {
//     //   const card = document.createElement('div');
//     //   card.classList.add('tea-card');

//     //   card.innerHTML = `
//     //     <h2>${tea.name}</h2>
//     //     <p><strong>Type:</strong> ${tea.type}</p>
//     //     <p><strong>Origin:</strong> ${tea.origin}</p>
//     //   `;

//     //   container.appendChild(card);
//     // });
//   })
//   .catch(error => console.error('Error loading JSON:', error));

// fetch('teadata.json')
//   .then((response) => response.json())
//   .then(json => {

//     const container = document.querySelector('#tea-gallery');
//     container.innerHTML = ''; // Clear previous content if needed

//     Object.values(json).forEach(teaType => {
//         const teaDiv = document.createElement('div');
//         teaDiv.textContent = `${teaType.name}: ${teaType.tasteDescription}`;
//         container.appendChild(teaDiv);
  
//         // Loop through subtypes
//         // if (teaType.types) {
//         //   Object.values(teaType.types).forEach(subTea => {
//         //     const subDiv = document.createElement('div');
//         //     subDiv.textContent = `${subTea.name}: ${subTea.tasteDescription}`;
//         //     container.appendChild(subDiv);
//         //   });
//         // }
//       });
  
//       console.log("Here are the response contents!", json);
//     });

  // document.querySelector('#tea-gallery').textContent = json.black.name
    // console.log("Here are the response contents!", json);

    
	// .catch((error) => {
	// console.warn(‘we only get here if there was an error’, error)); 
