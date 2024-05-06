// Function to lowercase the text
function lowercase(text) {
    return text.toLowerCase()
}

// Function to remove '#' characters
function removeStair(text) {
    return text.replace(/#/g, ' ')
}

// Function to remove newline characters
function removeEnter(text) {
    return text.replace(/\n/g, ' ')
}

// Function to remove 'rt' characters
function removeRetweet(text) {
    return text.replace(/\brt\b/g, ' ')
}

// Function to remove 'user' mentions
function removeUser(text) {
    return text.replace(/\buser\b/g, ' ')
}

// Function to remove URLs
function removeURL(text) {
    return text.replace(/((www\.[^\s]+)|(https?:\/\/[^\s]+))/g, ' ')
}

// Function to remove Unicode characters
function removeUnicode(text) {
    text = text.replace(/\bx[a-fA-F0-9]{2}\b/g, ' ')
    text = text.replace(/\bx([a-fA-F0-9]{2})/g, ' ')
    return text
}

// Function to remove non-alphanumeric characters
function removeNonAlphanumeric(text) {
    return text.replace(/[^a-zA-Z]+/g, ' ')
}

// Function to normalize Indonesian slang words
function normalizeAlay(text) {
    return text.split(' ').map(word => alayDictionary[word] || word).join(' ')
}

function removeStopword(text) {
    text = text.split(' ').map(word => stopWords.includes(word) ? '' : word).join(' ')
    return removeExtraSpaces(text)
}

// Function to perform stemming
function stemming(text) {
    text = text.split(' ').map(word => stemEnglish(text)).join(' ')
    return text
}

// Function to remove extra spaces
function removeExtraSpaces(text) {
    return text.replace(/\s+/g, ' ').trim()
}

function cleanText(text) {
    text = lowercase(text)
    text = removeStair(text)
    text = removeEnter(text)
    text = removeRetweet(text)
    text = removeUser(text)
    text = removeURL(text)
    text = removeUnicode(text)
    text = removeNonAlphanumeric(text)
    text = removeExtraSpaces(text)
    text = normalizeAlay(text)
    text = removeStopword(text)
    text = removeExtraSpaces(text)
    // text = stemming(text)
    return text
  }
  