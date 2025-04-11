document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM is fully loaded");

    const page = window.location.pathname.split("/").pop();
    const pageToDataset = {
        "patriks.html": {
            path: "/datasetsProcessed/CondomSet.json",
            xKey: "Year",
            yKey: "Total Sales (Million Units)"
        },
        "marks.html": {
            path: "/datasetsProcessed/____.json",
            xKey: "_____",
            yKey: "_____"
        },
        "janis.html": {
            path: "/datasetsProcessed/______.json",
            xKey: "_____",
            yKey: "_____"
        },
        "arturs.html": {
            path: "/datasetsProcessed/______.json",
            xKey: "_____",
            yKey: "_____"
        },
        "adrians.html": {
            path: "/datasetsProcessed/_______.json",
            xKey: "_____",
            yKey: "_____"
        }
    };
    const config = pageToDataset[page];
    fetch(config.path)
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

        const xValues = data.map(item => item[config.xKey]);
        const yValues = data.map(item => item[config.yKey]);
        
        const ctx = document.getElementById('myChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: xValues,
                    datasets: [{
                        label: config.yKey,
                        data: yValues,
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
