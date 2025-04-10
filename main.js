document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM is fully loaded");

    fetch('datasetsProcessed/CondomSet.json')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#data-table tbody');
        data.forEach(item => {
            const row = document.createElement('tr');
            Object.values(item).forEach(value => {
                const cell = document.createElement('td');
                cell.textContent = value;
                row.appendChild(cell);
            });
            tableBody.appendChild(row);
        });

        const years = data.map(item => item.Year);
        const totalSales = data.map(item => item['Total Sales (Million Units)']);
        const ctx = document.getElementById('myChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: years,
                    datasets: [{
                        label: 'Total Sales (Million Units)',
                        data: totalSales,
                        borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    })
    .catch(error => console.error('Error loading the data:', error));
});
