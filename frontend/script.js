const button = document.getElementById("predictBtn");

button.addEventListener("click", async () => {

    const data = {
        OverallQual: parseInt(document.getElementById("overallQual").value),
        GrLivArea: parseFloat(document.getElementById("grLivArea").value),
        GarageCars: parseInt(document.getElementById("garageCars").value),
        TotalBsmtSF: parseFloat(document.getElementById("totalBsmtSF").value),
        YearBuilt: parseInt(document.getElementById("yearBuilt").value)
    };

    document.getElementById("prediction").innerHTML = "Predicting...";

    try {

        const response = await fetch("http://127.0.0.1:8000/predict", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });

        const result = await response.json();

        if (response.ok) {

            document.getElementById("prediction").innerHTML =
                "₹ " + Number(result["Predicted Price"]).toLocaleString();

        } else {

            document.getElementById("prediction").innerHTML =
                "Prediction Failed";

            console.log(result);
        }

    }

    catch (error) {

        console.log(error);

        document.getElementById("prediction").innerHTML =
            "Cannot connect to API";

    }

});