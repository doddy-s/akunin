const icon = '<svg width="24px" height="24px" viewBox="0 0 24 24" id="meteor-icon-kit__regular-question-circle" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 15C12.5523 15 13 15.4477 13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15ZM11 10C11 10.5523 10.5523 11 10 11C9.44771 11 9 10.5523 9 10C9 8.11438 10.1144 7 12 7C13.8856 7 15 8.11438 15 10C15 11.1817 14.5659 11.7713 13.6413 12.3496C13.585 12.3847 13.585 12.3847 13.5335 12.417C13.0871 12.6987 13 12.8324 13 13.5C13 14.0523 12.5523 14.5 12 14.5C11.4477 14.5 11 14.0523 11 13.5C11 12.0839 11.4788 11.3485 12.4665 10.7255C12.5262 10.688 12.5262 10.688 12.5807 10.6539C12.9784 10.4052 13 10.3758 13 10C13 9.21895 12.781 9 12 9C11.219 9 11 9.21895 11 10Z" fill="#edf0f3"></path></g></svg>'

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