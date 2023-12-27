//code for image preview
var reader = new FileReader();
reader.onload = function (e) {
    $("#imager").attr("src", e.target.result);
};

function readURL(input) {
    if (input.files && input.files[0]) {
        $("#imager").css("visibility", 'visible');
        reader.readAsDataURL(input.files[0]);
    }
}

$("#image-input").change(function () {
    readURL(this);
});

// Function to generate the badge image and initiate download
function generateBadgeImage() {
    console.log('Attempting to capture badge content...');
    const badgeContainer = document.querySelector('.id__wrapper');

    // Convert the badge content to an image
    html2canvas(badgeContainer).then(canvas => {
        const imgURL = canvas.toDataURL('image/png');

        // Create a temporary link element
        const downloadLink = document.createElement('a');
        downloadLink.href = imgURL;
        downloadLink.download = 'conference_badge.png';

        // Click the download link programmatically
        downloadLink.click();
        console.log('Image downloaded successfully.');
    });
}

// Update the event listener for the "Click me" button
$(".js-switch").click(function () {
    // Toggle the class for the badge view
    $(".main-content").toggleClass("as-card");

    // Check if the badge view is active, then generate and download the badge image
    if ($(".main-content").hasClass("as-card")) {
        setTimeout(generateBadgeImage, 1000); // Add a slight delay for rendering
    }
});


