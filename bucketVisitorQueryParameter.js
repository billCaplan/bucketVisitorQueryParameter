function queryCapture() {

    var url = window.location.href;

    if (url.lastIndexOf('&optimizely_id') && url.lastIndexOf('&optimizely_id') !== -1) {
        secondCall(url, '&optimizely_id');
    }

    if (url.lastIndexOf('?optimizely_id') && url.lastIndexOf('?optimizely_id') !== -1) {
        secondCall(url, '?optimizely_id');
    }
}

function secondCall(URL, second) {

    var target = URL.slice(URL.lastIndexOf(second));
    var splitIt = target.split('+');

    var experimentId = splitIt[0].split('=')[1];
    var variationId = splitIt[1];

    window["optimizely"] = window["optimizely"] || [];
    window["optimizely"].push({
        "type": "bucketVisitor",
        "experimentId": experimentId,
        "variationIndex": variationId
    });

}
try {
    queryCapture();
} catch (error) {
    console.error(error);
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
}
