tf.loadLayersModel('https://raw.githubusercontent.com/doddy-s/akunin-model/main/model.json').then(model => {
    jQuery(initialize)
    $(document).on('DOMNodeInserted', injectAdditionalAkuninButtons)
    function initialize() {
    }

    console.log(model)

    function injectAdditionalAkuninButtons(event) {
        const tweets = $(event.target).find('div')

        if (tweets.length) {
            tweets.each((index, element) => {
                classify(element)
            })
        } else {
            classify(event.target)
        }
    }

    function classify(target) {
        const tweetText = $(target)
        if(!(tweetText.is('div') && tweetText.attr('data-testid') === 'tweetText')){
            return
        }

        if(tweetText.attr('akunin') === 'labeled') {
            return
        } else {
            tweetText.attr('akunin','labeled')
        }

        const spans = tweetText.children('span')

        const text = spans.map(function() {
            if($(this).children().length) {
                return $(this).children().first().html()
            }
            return $(this).html();
        }).get().join("");

        const label = predictLabel(text)
        if(label == 1) {
            tweetText.addClass('hidden')
            const tweetHider = `<div class="open-sans flex h-24 w-90 items-center justify-between rounded-lg border-2 border-blue bg-blue px-4 py-2 my-4 mx-2" akunin="tweetHider">
            <p>Konten ini mungkin mengandung kalimat yang tidak pantas, kata-kata kasar, atau tindakan cyberbullying. Klik "Show" untuk melihatnya.</p>
            <button class="px-4 py-2" akunin="showTweet">Show</button>
            </div>`
            tweetText.parent().append(tweetHider)
        } else if(label == 3) {
            tweetText.addClass('hidden')
            const tweetHider = `<div class="open-sans flex h-24 w-90 items-center justify-between rounded-lg border-2 border-blue bg-blue px-4 py-2 my-4 mx-2" akunin="tweetHider">
            <p>This post may contain hate speech, abusive language, or cyberbullying. Click "Show" to display it.</p>
            <button class="px-4 py-2" akunin="showTweet">Show</button>
            </div>`
            tweetText.parent().append(tweetHider)
        }

        try {
            document.querySelectorAll('[akunin="showTweet"]').forEach(item => {
                item.addEventListener("click", showTweet)
            })
        } catch { }
    }

    function argmax(array) {
        if (array.length === 0) {
            return -1 // return -1 for empty arrays
        }
    
        let maxIndex = 0
        let maxValue = array[0]
    
        for (let i = 1; i < array.length; i++) {
            if (array[i] > maxValue) {
                maxIndex = i
                maxValue = array[i]
            }
        }
    
        return maxIndex
    }

    function predictLabel(text) {
        text = cleanText(text)
        const tokens = text.toLowerCase().split(/\W+/).filter(Boolean)
        console.log(text)
        let _x = []
        for (let i = 0; i < 120; i++) {
            _x[i] = wordIndex8k[tokens[i]] || 0
        }
        const predictions = model.predict(tf.tensor([_x]))
        const label = argmax(predictions.dataSync())
        return label
    }

    function showTweet(e) {
        const tweetText = $(e.target.parentNode.parentNode).children()
        $(tweetText[0]).removeClass('hidden')
        $(tweetText[1]).removeClass('flex').addClass('hidden')
    }
})

