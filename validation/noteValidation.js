function validateNote(title, content) {

    if (!title || !content) {
        return "Title and content are required.";
    }

    if (
        typeof title !== "string" ||
        typeof content !== "string"
    ) {
        return "Title and content must be strings.";
    }

    return null;
}

module.exports = validateNote;