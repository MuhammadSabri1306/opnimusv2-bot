
module.exports.isDateObject = dateObj => dateObj && typeof dateObj.getFullYear === "function";

module.exports.formatDate = (date, pattern = "y-m-d h:i:s") => {
    if(!this.isDateObject(date))
        date = new Date(date);
    pattern = pattern.toLowerCase();

    const availFormats = [
        { mark: "y", replacer: () => String(date.getFullYear()) },
        { mark: "m", replacer: () => String(date.getMonth() + 1).padStart(2, '0') },
        { mark: "d", replacer: () => String(date.getDate()).padStart(2, '0') },
        { mark: "h", replacer: () => String(date.getHours()).padStart(2, '0') },
        { mark: "i", replacer: () => String(date.getMinutes()).padStart(2, '0') },
        { mark: "s", replacer: () => String(date.getSeconds()).padStart(2, '0') },
    ];

    availFormats.forEach(({ mark, replacer }) => {
        pattern = pattern.replaceAll(mark, replacer());
    });
    return pattern;
};