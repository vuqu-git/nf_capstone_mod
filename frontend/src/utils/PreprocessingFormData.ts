
const preprocessFormData = (data: Record<string, any>, skipKeys: string[] = []) => {
    const processedData: Record<string, any> = {};
    for (const key in data) {
        if (skipKeys.includes(key)) {
            processedData[key] = data[key]; // Skip preprocessing for these keys
        } else {
            processedData[key] = data[key] === "" ? null : data[key];
        }
    }
    return processedData;
};

// // old plain version here:
// const preprocessFormData = (data) => {
//     const preprocessFormData = {};
//     for (const key in data) {
//         preprocessFormData[key] = data[key] === "" ? null : data[key];
//     }
//     return preprocessFormData;
// };

export { preprocessFormData }; // Export the function with the desired name