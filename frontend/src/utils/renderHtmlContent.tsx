const renderHtmlContent = (htmlString: string | null | undefined) => {
    if (htmlString == null) {
        return undefined;
    }
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export { renderHtmlContent }; // Export the function with the desired name