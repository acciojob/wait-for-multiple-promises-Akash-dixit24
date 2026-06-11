//your JS code here. If required.
const output = document.getElementById("output");

// Show loading row initially
output.innerHTML = `
<tr id="loading">
    <td colspan="2" class="text-center">Loading...</td>
</tr>
`;

// Function to create a promise with random delay (1-3 seconds)
function createPromise() {
    const delay = Math.random() * 2 + 1;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(delay);
        }, delay * 1000);
    });
}

const startTime = performance.now();

const promise1 = createPromise();
const promise2 = createPromise();
const promise3 = createPromise();

Promise.all([promise1, promise2, promise3])
    .then((results) => {
        const totalTime = ((performance.now() - startTime) / 1000).toFixed(3);

        // Remove loading row
        output.innerHTML = "";

        results.forEach((time, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>Promise ${index + 1}</td>
                <td>${time.toFixed(3)}</td>
            `;

            output.appendChild(row);
        });

        // Total row
        const totalRow = document.createElement("tr");

        totalRow.innerHTML = `
            <td><strong>Total</strong></td>
            <td><strong>${totalTime}</strong></td>
        `;

        output.appendChild(totalRow);
    })
    .catch((error) => {
        output.innerHTML = `
            <tr>
                <td colspan="2">${error}</td>
            </tr>
        `;
    });