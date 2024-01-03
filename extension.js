
document.addEventListener('DOMContentLoaded', function () {
  const submitButton = document.getElementById('submitBtn');

  submitButton.addEventListener('click', function (event) {
    const url = document.getElementById('url').value;
    const orientation = document.querySelector('input[name="orientation"]:checked').value;
    const format = document.querySelector('input[name="format"]:checked').value;

    // Print the web page
    // printWebPage(websiteUrl, orientation, format);
    if (url) {
      // console.log(`website url: ${websiteUrl}`)
      apicall(url)
    } else {
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        const url = tabs[0].url;
        apicall(url)

      });
      // console.log()
    }
  });
});


async function apicall(weburl) {
  const url = `https://web-capture2.p.rapidapi.com/pdf?url=${weburl}&height=780&width=1024`;const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '66a4888b03msh548ee25e691eb51p1b8bb3jsn3014e22c0aed',
		'X-RapidAPI-Host': 'web-capture2.p.rapidapi.com',
    'Content-Type': 'application/pdf'
	}
};

try {
	const response = await fetch(url, options);
	// const result = await response.text();
  // downloadPdf(result, 'captured_document.pdf');
	// console.log(result);
  if (response.headers.get('Content-Type') === 'application/pdf') {
    const blob = await response.blob();
    downloadPdf(blob, 'captured_document.pdf');
  } else {
    const result = await response.text();
    // Parse PDF data from result if necessary
    // ...
    downloadPdf(parsedPdfData, 'captured_document.pdf');
  }
} catch (error) {
	console.error(error);
}
}

function downloadPdf(pdfLatexCode, filename) {
  try {
    // Create a Blob object representing the PDF data
    const blob = new Blob([pdfLatexCode], { type: 'application/pdf' });

    // Create a URL object for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element and simulate a click to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  } catch (error) {
    console.error('Error downloading PDF:', error);
    // Handle the error gracefully, e.g., display an error message to the user
  } finally {
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(url);
  }
}