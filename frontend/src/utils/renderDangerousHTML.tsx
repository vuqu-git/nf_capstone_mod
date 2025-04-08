const renderDangerousHTML = (htmlString: string) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export { renderDangerousHTML }; // Export the function with the desired name

// // Example usage (ONLY if 'trustedHTML' is guaranteed to be safe):
// const trustedHTML = "<strong>This is bold and <em>italic</em>.</strong>";
// const htmlElement = renderDangerousHTML(trustedHTML);
//
// // You can then use 'htmlElement' in your JSX:
// // <div>{htmlElement}</div>
