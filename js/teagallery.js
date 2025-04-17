// fetch('teadata.json')
//   .then((response) => response.json())
//   .then(data => {
//     const keys = Object.keys(data); // ['black', 'green', ...]
//     // console.log(keys); // Outputs: ['black', 'green']

//     const gallery = document.querySelector('#tea-gallery')

//     // Object.values(json).forEach(teaType => {
//     //             if (teaType.name != 'NA' || teaType.name != '') {
//     //                 const teaDiv = document.createElement('div');
//     //                 teaDiv.textContent = `${teaType}`;
//     //                 container.appendChild(teaDiv);

//                 // }

//     // Example: loop over them
//     keys.forEach(key => {
//     //   console.log(key); // 'black', 'green'
//       if (key != 'unknown') {
//         const teaDiv = document.createElement('div');
//         teaDiv.className = 'tea-bucket';
//         teaDiv.textContent = `${key}`;
//         gallery.appendChild(teaDiv);
//       }     




//     });

//     document.querySelectorAll('.tea-bucket').forEach(tea => {
//         console.log(tea)
//         tea.addEventListener('click', () => {
//             const teaInfo = document.createElement('div');
//             // console.log('this works');
//             console.log(tea.textContent);
//             teaInfo.className = 'tea-description'
//             teaInfo.textContent = 'hmmm';
//             tea.appendChild(teaInfo);   
//             // teaInfo.textContent = 'this is about the tea';
//             // teaDiv.appendChild(teaInfo);
//         })
//     })
//   });

fetch('teadata.json')
    .then((response) => response.json())

    .then(data => {
        console.log(data);
        const gallery = document.querySelector('#tea-gallery');
        const blend_gallery = document.querySelector('#blend-gallery');
        
        Object.entries(data).forEach(([key, tea]) => {
            if (key === 'blends') {
                const blendDiv = document.createElement('div');

                Object.entries(tea).forEach(blend => {
                    console.log(blend)
                    const blendName = document.createElement('div');
                    blendName.className = 'blend-name';
                    blendName.innerHTML = `<h5>${blend[1].name}</53>`
                    blend_gallery.appendChild(blendName)

                    blendName.addEventListener('click', () => {
                        // console.log('works');
                        if (!blendName.querySelector('.blend-description')) {
                            const blendInfo = document.createElement('div');
                            blendInfo.className = 'blend-description';
                            blendInfo.innerHTML = 
                                `<h6>${blend[1].description}</h6>
                                <p>Origin: ${blend[1].origin}</p>
                                <p>Taste Profile: ${blend[1].tasteDescription}</p>
                                <p>Caffeine: ${blend[1].caffeineLevel}, ${blend[1].caffeine}</p>
                                ` 
                                || 'No description available.';
            
                                
                            blendName.appendChild(blendInfo);
                          }  else {
                            blendName.querySelector('.blend-description').remove();
                          }
                    })
                }
            )

                
                
                // Object.entries(data[key]).forEach(blend => {
                //     console.log(blend);
                //     const blendInfo = document.createElement('div');
                //     blendInfo.className = 'blend-description';
                //     blendInfo.innerHTML = `
                //     <h3>test</h3>
                //     `
                //     blend_gallery.append(blendInfo)


                // blendDiv.className = 'blends-bucket';
                // console.log('this is blends');
                // blendDiv.innerHTML = `<h2>Blends</h2>`;
                // blendDiv.addEventListener('click', () => {
                //     Object.entries(data[key]).forEach(blend => {
                //         console.log(blend);
                //         const blendInfo = document.createElement('div');
                //         blendInfo.className = 'blend-description';
                //         blendInfo.innerHTML = `
                //         <h3>test</h3>
                //         `
                //         blend_gallery.append(blendInfo)
                //         // blendDiv.appendChild(blendInfo);
                //         // console.log(blend[1].name);
                        
                //     })

                // })
                
                // gallery.appendChild(blendDiv);
                // key.forEach(blend => console.log(blend));
            }
            
            if (tea.name && key !== 'unknown') {
            const teaDiv = document.createElement('div');
            teaDiv.className = 'tea-bucket';
            console.log(tea.name)
            teaDiv.innerHTML = `<h5>${tea.name}</h5>
            `; // this works because `tea` is the object
            gallery.appendChild(teaDiv);

            // <img src=${tea.image} alt=${tea.name}/>
    
            // Add click to show description
            teaDiv.addEventListener('click', () => {
              // Prevent multiple descriptions
              if (!teaDiv.querySelector('.tea-description')) {
                const teaInfo = document.createElement('div');
                teaInfo.className = 'tea-description';
                teaInfo.innerHTML = 
                    `<h6>${tea.description}</h6>
                    <p>Origin: ${tea.origin}</p>
                    <p>Taste Profile: ${tea.tasteDescription}</p>
                    <p>Caffeine: ${tea.caffeineLevel}, ${tea.caffeine}</p>
                    ` 
                    || 'No description available.';

                    
                teaDiv.appendChild(teaInfo);
              }  else {
                teaDiv.querySelector('.tea-description').remove();
              }
            });

            
          }
        });
      });

      // teaDiv.addEventListener('click', () => {
            //     // Prevent multiple descriptions
            //     if (!teaDiv.querySelector('.tea-description')) {
            //       const teaInfo = document.createElement('div');
            //       teaInfo.className = 'tea-description';
            //       teaInfo.textContent = '';
            //       teaDiv.appendChild(teaInfo);
            //     }
            //   });


    // .then(data => {


    //     const gallery = document.querySelector('#tea-gallery');
    //     gallery.innerHTML = ''; // Clear previous content if needed

    //     const keys = Object.keys(data); // ['black', 'green', ...]
    //     const teaType = Object.values(data);
    //     // console.log(teaType);
    //     // console.log(keys); // Outputs: ['black', 'green']

    //     keys.forEach(key => {

    //         if (key != 'unknown')  {
    //             console.log(key);
    //             const teaDiv = document.createElement('div');
    //             teaDiv.className = 'tea-bucket';
    //             teaDiv.textContent = `${key.name}`;
    //             gallery.appendChild(teaDiv)
    //             teaType.forEach(tea => {
    //                 // console.log(tea); // 'black', 'green'
    //                 if (tea != 'unknown') {
    //                     const teaDiv = document.createElement('div');
    //                     teaDiv.className = 'tea-bucket';
    //                     teaDiv.textContent = `${tea.name}`;
    //                     gallery.appendChild(teaDiv);
    //                 }
    //             })
    //         }
            
    //     })

        

    //     document.querySelectorAll('.tea-bucket').forEach(tea => {
    //         tea.addEventListener('click', () => {
    //             const teaInfo = document.createElement('div');
    //             teaInfo.className = 'tea-description';
    //             teaInfo.textContent = 'hmmmm';
    //             tea.appendChild(teaInfo);
    //         })
    //     })
        

    //     console.log("Here are the response contents!", data);
    // });

    //     document.querySelectorAll('.tea-bucket').forEach(tea => {
    //         console.log(tea)
    //         tea.addEventListener('click', () => {
    //             const teaInfo = document.createElement('div');
    //             // console.log('this works');
    //             console.log(tea.textContent);
    //             teaInfo.className = 'tea-description'
    //             teaInfo.textContent = 'hmmm';
    //             tea.appendChild(teaInfo);
    //             // teaInfo.textContent = 'this is about the tea';
    //             // teaDiv.appendChild(teaInfo);
    //         })
    //     })
    // });

// if (key != 'unknown') {
//     const teaDiv = document.createElement('div');
//     teaDiv.className = 'tea-bucket';
//  teaDiv.textContent = `${key}`;
//     gallery.appendChild(teaDiv);





// Object.values(data).forEach(teaType => {
//     const teaDiv = document.createElement('div');
//     teaDiv.textContent = `${teaType.name}`;
//     container.appendChild(teaDiv);
//     // if (teaType.name != 'NA' || teaType.name != '') {
//     //     const teaDiv = document.createElement('div');
//     //     teaDiv.textContent = `${teaType}`;
//     //     container.appendChild(teaDiv);

//     //         }


// })

//     // Loop through subtypes
//     // if (teaType.types) {
//     //   Object.values(teaType.types).forEach(subTea => {
//     //     const subDiv = document.createElement('div');
//     //     subDiv.textContent = `${subTea.name}: ${subTea.tasteDescription}`;
//     //     container.appendChild(subDiv);
//     //   });
//     // }
//   });

