import * as c from "./const.js";

export function notify(errFields) {
    let errMappings = processErrFields(errFields)
    addRemoveErrLabels(errMappings)

    if (errFields.length === 0) {
        alertMsg("success")
    } else {
        alertMsg("fail")
    }
}

function processErrFields(errFields) {
    let errMappings = {}

    for (let field of Object.keys(c.fieldToErrMappings)) {
        errMappings[field] = ""
    }

    for (let f of errFields) {
        if (!(f.field in c.fieldToErrMappings)) {
            continue
        }

        errMappings[f.field] = f.errMsg
    }

    return errMappings
}

function addRemoveErrLabels(errMappings) {
    for (const [field, errMsg] of Object.entries(errMappings)) {
        if (!(field in c.fieldToErrMappings)) {
            continue
        }

        let errLabel = document.getElementById(c.fieldToErrMappings[field])
        if (errLabel === null || errLabel === undefined) {
            continue
        }

        let inputLabel = document.getElementById(field)
        if (inputLabel === null || inputLabel === undefined) {
            continue
        }

        if (errMsg == c.SUCCEED_MSG) {
            errLabel.textContent = "";
            errLabel.style.display = "none";
            inputLabel.classList.remove("error-input")
        } else {
            errLabel.textContent = formaterrMsg(errMsg);
            errLabel.style.display = "inline-block";
            inputLabel.classList.add("error-input");
        }
    }
}

function formaterrMsg(msg) {
  return ` * ${msg}`;
}

function alertMsg(event) {
    let overlay = document.getElementsByClassName("overlay")[0];
    let alertLabel = document.getElementById("submit-msg");
    let alertIcon = document.getElementById("alert-icon")

    switch(event) {
        case "success":
            alertLabel.innerHTML = "Success!";
            alertIcon.textContent = "check_circle";

            alertIcon.classList.remove("failed");
            alertIcon.classList.add("success");
            break;

        case "fail":
            alertLabel.innerHTML = "Failed!";
            alertIcon.textContent = "dangerous";

            alertIcon.classList.remove("success");
            alertIcon.classList.add("failed")
            break;

        default:
            return;
    }
    
    overlay.style.display = "flex";
}