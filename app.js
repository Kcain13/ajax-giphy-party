//console.log("Let's get this party started!");
// jQUERY ajax html references
const $gifArea = $('#gif-area');
const $searchInput = $('#search');

// use ajax result to add gif to gifArea

function appendGif(res) {
    let numResults = res.data.length;
    if (numResults) {
        let randomInx = Math.floor(Math.random() * numResults);
        let $newCol = $('<div>', { class: 'col-md-4 col-12 mb-4' });
        let $newGif = $('<img', {
            src: res.data[randomInx].images.original.url,
            class: 'w-100'
        });
        $newCol.append($newGif);
        $gifArea.append($newCol);
    }
}

// handle form submisson: clear search box & make ajax call

$('form').on('submit', async function (e) {
    e.preventDefault();

    let searchTerm = $searchInput.val(); // retrieves the current user value
    $searchInput.val(''); // users input has been captured, reset search input val to empty

    // must be in async to use await
    const response = await axios.get('http://api.giphy.com/v1/gifs/search', {
        params: {
            q: searchTerm,
            api_key: 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'
        }
    });
    appendGif(response.data);
});

// remove gif

$('#remove').on('click', () => { $gifArea.empty() });