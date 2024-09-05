function redirectToAddress(address) {
    // Encode the address to make it URL-friendly
    const encodedAddress = encodeURIComponent(address);
    // Construct the Google Maps URL with the encoded address
    const googleMapsUrl = https://www.google.com/maps/search/?api=1&query=${encodedAddress};
    // Redirect the browser to the Google Maps URL
    window.location.href = googleMapsUrl;
}
