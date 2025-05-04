const renderHtmlText = (htmlString: string | null | undefined) => {
    if (htmlString == null) {
        return undefined; // Or perhaps an empty div: <div />; or some other fallback
    }
    return <span dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export { renderHtmlText }; // Export the function with the desired name

// // Example usage (ONLY if 'trustedHTML' is guaranteed to be safe):
// const trustedHTML = "<strong>This is bold and <em>italic</em>.</strong>";
// const htmlElement = renderDangerousHTML(trustedHTML);
//
// // You can then use 'htmlElement' in your JSX:
// // <div>{htmlElement}</div>



// const renderDangerousHTML = (htmlString: string) => {
//     return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
// };
//
// export { renderDangerousHTML };
