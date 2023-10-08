var currPage = 1; //Pages are 1-based not 0-based
var numPages = 0;
var thePDF = null;
var div = document.getElementById("maindiv")

//This is where you start
pdfjsLib.getDocument("docs/resume.pdf").promise.then(function (pdf) {

    //Set PDFJS global object (so we can easily access in our page functions
    thePDF = pdf;

    //How many pages it has
    numPages = pdf.numPages;

    //Start with first page
    pdf.getPage(1).then(handlePages);
});

function handlePages(page) {
    //This gives us the page's dimensions at full scale
    var scale = 2;
    var viewport = page.getViewport({ scale: scale });

    //We'll create a canvas for each page to draw it on


    var canvas = document.createElement("canvas");

    // canvas.style.display = "block";
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    div.style.width = viewport.width

    //Draw it on the canvas
    page.render({ canvasContext: context, viewport: viewport });

    //Add it to the web page
    div.appendChild(canvas);

    //Move to next page
    currPage++;
    if (thePDF !== null && currPage <= numPages) {
        thePDF.getPage(currPage).then(handlePages);
    }
}