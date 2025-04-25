fetch('static/teadata.json')
  .then((response) => response.json())

  .then(data => {
    // console.log(data);
    const gallery = document.querySelector('#tea-gallery');
    const blend_gallery = document.querySelector('#blend-gallery');

    Object.entries(data).forEach(([key, tea]) => {
      if (key === 'blends') {
        const blendDiv = document.createElement('div');

        Object.entries(tea).forEach(blend => {
          // console.log(blend)
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
            } else {
              blendName.querySelector('.blend-description').remove();
            }
          })
        }
        )


      }



      // if (tea.name && key !== 'unknown') {
      //   const teaDiv = document.createElement('div');
      //   teaDiv.className = 'tea-bucket';
      //   // console.log(tea.name)
      //   teaDiv.innerHTML = `<h5 class='tea-grouping'>${tea.name}</h5>
      //       `;
      //   gallery.appendChild(teaDiv);
      //   // console.log(tea)
      //   // console.log(tea.types)
      //   // console.log(tea.types)
      //   const the_teas = tea.types
      //   // console.log(the_teas)
      //   teaDiv.addEventListener('click', () => {
      //     console.log(tea.types)

      //     // the_teas.forEach(t => {
      //     //   console.log(t.types.name)

      //     // })

      //     // Prevent multiple descriptions
      //     if (!teaDiv.querySelector('.tea-description')) {
      //       const teaInfo = document.createElement('div');
      //       teaInfo.className = 'tea-description';
      //       teaInfo.innerHTML = `<h6>${tea.types.name}</h6>



      //       `
      //       // teaInfo.innerHTML =
      //       //   `<h6>${tea.description}</h6>
      //       //         <p>Origin: ${tea.origin}</p>
      //       //         <p>Taste Profile: ${tea.tasteDescription}</p>
      //       //         <p>Caffeine: ${tea.caffeineLevel}, ${tea.caffeine}</p>
      //       //         `
      //       //   || 'No description available.';


      //       teaDiv.appendChild(teaInfo);
      //     } else {
      //       teaDiv.querySelector('.tea-description').remove();
      //     }
      //   });


      // }

      if (tea.name && key !== 'unknown') {
        const teaDiv = document.createElement('div');
        teaDiv.className = 'tea-bucket';

        // Create tea group header
        teaDiv.innerHTML = `<h5 class='tea-grouping'>${tea.name}</h5>`;
        gallery.appendChild(teaDiv);

        // Click to toggle types
        teaDiv.addEventListener('click', () => {
          if (!teaDiv.querySelector('.tea-description')) {
            const teaInfo = document.createElement('div');
            teaInfo.className = 'tea-description';
            teaInfo.innerHTML = `<h6>${tea.types.name}</h6>
            
            `
            teaInfo.innerHTML =
              `<h6>${tea.description}</h6>
                  <p>Origin: ${tea.origin}</p>
                  <p>Taste Profile: ${tea.tasteDescription}</p>
                  <p>Caffeine: ${tea.caffeineLevel}, ${tea.caffeine}</p>
                  <button class='more_content'>View Different Types</button>
                  `
              || 'No description available.';
            teaDiv.appendChild(teaInfo);

            teaInfo.querySelector('.more_content').addEventListener('click', (e) => {
              e.stopPropagation();
              if(teaDiv.querySelector('.more-tea-descriptions')) {
                teaDiv.querySelector('.more-tea-descriptions').remove();
                e.target.textContent = 'View Different Types'
                return;
              }
              e.target.textContent = 'Collapse Menu'
              // teaDiv.querySelector('.tea-description').remove();
              console.log('click worked');
              
              const moreTeaInfo = document.createElement('div');
              moreTeaInfo.className = 'more-tea-descriptions';
              const the_teas = Object.values(tea.types);
              let typeHTML = ``;
  
              console.log(tea.types)
  
              the_teas.forEach(t => {
                typeHTML += `
                  <div class="single-tea-type">
                    <p><strong>${t.name}</strong></p>
                    <img src="${t.image}" alt="${t.name}" width="100" style="border-radius: 8px;">
                    <p><em>Origin:</em> ${t.origin || 'Unknown'}</p>
                    <p><em>Taste:</em> ${t.tasteDescription || 'N/A'}</p>
                    <p><em>Caffeine:</em> ${t.caffeineLevel || 'Unknown'}, ${t.caffeine || ''}</p>
                    <hr>
                  </div>
                `;
              });
              moreTeaInfo.innerHTML = typeHTML;
              teaDiv.appendChild(moreTeaInfo);
  
  
            }
          ) }  else {
            teaDiv.querySelector('.tea-description').remove();
          }
    
          




        });
        
      }

      



      // Add click to show description
      //   teaDiv.addEventListener('click', () => {
      //     // Prevent multiple descriptions
      //     if (!teaDiv.querySelector('.tea-description')) {
      //       const teaInfo = document.createElement('div');
      //       teaInfo.className = 'tea-description';
      //       teaInfo.innerHTML =
      //         `<h6>${tea.description}</h6>
      //               <p>Origin: ${tea.origin}</p>
      //               <p>Taste Profile: ${tea.tasteDescription}</p>
      //               <p>Caffeine: ${tea.caffeineLevel}, ${tea.caffeine}</p>
      //               `
      //         || 'No description available.';


      //       teaDiv.appendChild(teaInfo);
      //     } else {
      //       teaDiv.querySelector('.tea-description').remove();
      //     }
      //   });


      // }
    });
  });

