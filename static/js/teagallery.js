fetch('static/teadata.json')
  .then((response) => response.json())

  .then(data => {
    const gallery = document.querySelector('#tea-gallery');
    const blend_gallery = document.querySelector('#blend-gallery');

    Object.entries(data).forEach(([key, tea]) => {
      if (key === 'blends') {

        Object.entries(tea).forEach(blend => {
          const blendName = document.createElement('div');
          blendName.className = 'blend-name';
          blendName.innerHTML = `<h4 class='tea-grouping'>${blend[1].name}</h4>`
          blend_gallery.appendChild(blendName)

          blendName.addEventListener('click', () => {
            if (!blendName.querySelector('.blend-description')) {
              const blendInfo = document.createElement('div');
              blendInfo.className = 'blend-description';
              blendInfo.innerHTML =
                `<h5>${blend[1].description}</h5>
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

      if (tea.name && key !== 'unknown') {
        const teaDiv = document.createElement('div');
        teaDiv.className = 'tea-bucket';

        teaDiv.innerHTML = `<h4 class='tea-grouping'>${tea.name}</h4>`;
        gallery.appendChild(teaDiv);

        teaDiv.addEventListener('click', () => {
          if (!teaDiv.querySelector('.tea-description')) {
            const teaInfo = document.createElement('div');
            teaInfo.className = 'tea-description';
            teaInfo.innerHTML = `<h5>${tea.types.name}</h5>
            
            `
            teaInfo.innerHTML =
              `<h5>${tea.description}</h5>
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

    });
  });

