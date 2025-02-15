document.getElementById('http-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const url = form.querySelector('#url').value;
    const method = form.querySelector('#method').value;

    // Parse user-defined headers
    let headers = {};
    try {
        const headersInput = form.querySelector('#headers').value;
        if (headersInput) {
            headers = JSON.parse(headersInput);
        }
    } catch (error) {
        alert('Invalid JSON in headers');
        return;
    }

    // Gather form fields for the request body (excluding non-body fields)
    const rawFormData = new FormData(form);
    rawFormData.delete('url');
    rawFormData.delete('method');
    rawFormData.delete('headers');

    // Convert FormData to URL-encoded string
    const formData = new URLSearchParams();
    for (const [key, value] of rawFormData.entries()) {
        formData.append(key, value);
    }

    // Set default headers if not provided
    if (!headers['Content-Type']) {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    if (!headers['Accept']) {
        headers['Accept'] = 'application/json';
    }
    if (!headers['User-Agent']) {
        headers['User-Agent'] = 'ElectronHttpClient/1.0';
    }

    // Send the HTTP request via IPC
    const response = await window.api.sendHttpRequest({
        url,
        method,
        headers,
        data: formData.toString(),
    });

    // // Format and display the response
    // let formattedResponse;
    // try {
    //     formattedResponse = JSON.stringify(response, null, 2);
    // } catch (err) {
    //     formattedResponse = response;
    // }
    // document.getElementById('response').textContent = formattedResponse;

    // Clear any previous response
    const responseContainer = document.getElementById('response');
    responseContainer.innerHTML = '';

    // Create and style a status element
    const statusEl = document.createElement('div');
    statusEl.classList.add('response-status');

    const status = response.status;
    statusEl.textContent = `Status: ${status}`;

    // Add a class based on status code
    if (status >= 200 && status < 300) {
        statusEl.classList.add('status-success');
    } else if (status >= 400 && status < 500) {
        statusEl.classList.add('status-client-error');
    } else if (status >= 500) {
        statusEl.classList.add('status-server-error');
    } else {
        // Fallback color
        statusEl.style.color = 'black';
    }
    responseContainer.appendChild(statusEl);

    // Format and display the response data as pretty JSON
    const preEl = document.createElement('pre');
    try {
        preEl.textContent = JSON.stringify(response, null, 2);
    } catch (err) {
        preEl.textContent = response;
    }
    responseContainer.appendChild(preEl);
});
