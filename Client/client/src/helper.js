export const createUniqueID = (uid) => {
    let newID = uid;
    for (let i = 0; i < uid.length; i++) {
        let char = uid.charAt(i);
        if (char === '0' || char === '1' || char === '2' || char === '3' || char === '4' || char === '5' || char === '6' || char === '7' || char === '8' || char === '9') {
            let newChar = String.fromCharCode(65 + parseInt(char));
            newID = newID.substring(0, i) + newChar + newID.substring(i+1);
        }
    }
    return newID;
}