function updateVendorFilters() {
    let vendorType = document.getElementById('vendor-type').value;
    let city = document.getElementById('city').value;
    let url = '?';

    if (vendorType !== 'All') {
        url += `vendorType=${vendorType}&`;
    }
    if (city !== 'All') {
        url += `city=${city}`;
    }

    window.location.href = url;
}

window.onload = function() {
    document.getElementById('vendor-type').addEventListener('change', updateVendorFilters);
    document.getElementById('city').addEventListener('change', updateVendorFilters);
}
