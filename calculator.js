function makeRequest(id, amount) {
    const username = 'adape-mfdev';
    const password = '9OgOrdEk2S1CFWjbKwvh8g';
    const encodedCredentials = btoa(`${username}:${password}`);
    fetch(`https://mfdev.adape.io/test-api/?amount=${amount}&dl=${id}`, {
        headers: {
            'Authorization': `Basic ${encodedCredentials}`,
        }
    })
        .then(data => data.json())  
        .then(results => {
            let initial = results.initial;
            let amountFrom = results.amountRange.from;
            let amountTo = results.amountRange.to;
            let deadline = results.deadline;
            let rangeFrom = results.deadlineRange.from;
            let rangeTo = results.deadlineRange.to;
            let interest = results.interest;

            let htmlCotent = `
        <div id="content1" class="tab-panel">
              <div class="column-7">
                <div class="range">
                  <div class="amount-display">Iznos kredita<br>
                    <span class="value-1">${initial}</span> <span>KM</span>
                  </div>
                  <div class="range-labels">
                    <span class="min">${amountFrom}</span>
                    <span class="max">${amountTo}</span>
                  </div>
                  <input type="range" id="range-1" min="300" max="50000" step="100" value="6500" style="background: linear-gradient(to right, rgb(88, 233, 139) 13%, rgb(225, 225, 225) 13%);">
                </div>
    
                <div class="range">
                  <div class="amount-display">Rok otplate<br>
                    <span class="value-2">${deadline} mj.</span> <span>mj.</span>
                  </div>
                </div>
                <div class="range-labels">
                  <span class="min">${rangeFrom}</span>
                  <span class="max">${rangeTo}</span>
                </div>
                <input type="range" id="range-2" min="1" max="72" step="1" value="62" style="background: linear-gradient(to right, rgb(88, 233, 139) 86.1111%, rgb(225, 225, 225) 86.1111%);">
              </div>
    
              <div class="column-5">
                <div class="ammount-block">
                  <span>Iznos rate</span>
                  <span class="ammount">${interest} KM</span>
    
                  <div class="info">
                    <div>
                      <span>Kamatna stopa</span>
                      <span class="number">18%</span>
                    </div>
    
                    <div>
                      <span>Provizija</span>
                      <span class="number">2%</span>
                    </div>
                  </div>
                </div>
                <div class="checkbox-container">
                  <input type="checkbox" id="accept-conditions-1" class="checkbox-input">
                  <div class="custom-checkbox"></div>
                  <label for="accept-conditions-1" class="checkbox-label">Prihvatam uslove</label>
                </div>
                <a href="#" class="button">Apliciraj odmah <img src="https://mfdev.adape.io/wp-content/themes/mikrofin/images/strelica-desno.svg" alt="strelica"></a>
              </div>
            </div>`
        })
}


let debounceTimer;
let productId = 1234;

function handleSliderChange() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        makeRequest(50, 7000)
    }, 500); 
}