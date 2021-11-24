
const { google } = require("googleapis")
const fs = require('fs');


async function get_data() {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    })

    const client = await auth.getClient();

    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "1mux3TKOcJ6ukG4HsxauS_hKm7WadBqurzFl0n6jseyQ";

    // const metaData = await googleSheets.spreadsheets.get({
    //     auth,
    //     spreadsheetId
    // });

    //read rows from spreadsheets
    googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "sheet1",
    }).then((rows) => {
        fs.writeFile("test.json", JSON.stringify(rows.data), function (err) {
            if (err) {
                console.log(err);
            }
        });
    }).catch(err => console.log(err));
}

function get_data_in_ms(time_in_ms) {
    setInterval(function () {
        console.log("...Geting data")
        get_data()
    }, time_in_ms);
}



// wanted seconds x 1000
get_data_in_ms(10000)
