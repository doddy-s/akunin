jQuery(initialize)
$(document).on('DOMNodeInserted', injectAdditionalAkuninButtons)

function initialize() {
    console.log("initializing")
}

function injectAdditionalAkuninButtons(event) {
    const tweets = $(event.target).find('article')

    if (tweets.length) {
        tweets.each((index, element) => {
            injectButton(element)
        })
    } else {
        injectButton(event.target)
    }
}

function injectButton(content) {
    injectReactAkuninButton(content)
}

function injectReactAkuninButton(target) {
    var tweet = $(target).closest('article')
    try{
        document.querySelectorAll('[akunin="predict"]').forEach(item => {
            item.addEventListener("click", predict)
        });
    } catch {}

    if (!tweet.length) {
        return
    }

    if (tweet.find('div[data-testid="tweetText"][role="akunin"]').length) {
        return
    }

    const tweetText = tweet.find('div[data-testid="tweetText"]')
    tweetText.attr("role", "akunin").append('<br><button akunin="predict">is this hate speech?</button>')
}

function predict(e) {
    const tweetText = $(e.target.parentNode)
    console.log(tweetText.find('span').html())

    tweetText.append('<br><button akunin="answer">Yes, this is hate speech</button>')
}