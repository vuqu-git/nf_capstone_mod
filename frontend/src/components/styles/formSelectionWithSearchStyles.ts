// for FilmSelectionWithSearch.tsx

export const formSelectionWithSearchStyles = {
    // control: (base: any, state: any) => ({
    //     ...base,
    //     backgroundColor: '#212529', // Bootstrap's dark bg-dark color
    //     borderColor: state.isFocused ? '#86b7fe' : '#495057', // Bootstrap focus blue or muted border
    //     color: '#fff',
    //     borderRadius: '0.375rem', // Bootstrap's default border radius
    //     minHeight: '32px', // Reduced height to match Bootstrap
    //     fontSize: '1rem',
    //     fontWeight: '400',
    //     lineHeight: '1.5',
    //     boxShadow: state.isFocused ? '0 0 0 0.25rem rgba(13, 110, 253, 0.25)' : 'none', // Bootstrap focus shadow
    //     transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
    //     ':hover': {
    //         borderColor: state.isFocused ? '#86b7fe' : '#6c757d',
    //     },
    // }),
    // valueContainer: (base: any) => ({
    //     ...base,
    //     padding: '0.25rem 0.5rem', // Reduced padding
    // }),
    // singleValue: (base: any) => ({
    //     ...base,
    //     color: '#fff',
    //     fontSize: '1rem',
    //     fontWeight: '400',
    // }),
    // placeholder: (base: any) => ({
    //     ...base,
    //     color: '#6c757d', // Bootstrap's muted text color
    //     fontSize: '1rem',
    // }),
    // option: (base: any, state: any) => ({
    //     ...base,
    //     backgroundColor: state.isFocused
    //         ? '#0d6efd' // Bootstrap primary blue for hover
    //         : state.isSelected
    //             ? '#0d6efd' // Bootstrap primary blue for selected
    //             : '#212529', // Dark background
    //     color: state.isFocused || state.isSelected ? '#fff' : '#fff',
    //     cursor: 'pointer',
    //     fontSize: '1rem',
    //     fontWeight: '400',
    //     padding: '0.375rem 0.75rem',
    //     ':active': {
    //         backgroundColor: '#0b5ed7', // Darker blue for active state
    //     },
    // }),
    // input: (base: any) => ({
    //     ...base,
    //     color: '#fff',
    //     fontSize: '1rem',
    // }),
    // menu: (base: any) => ({
    //     ...base,
    //     backgroundColor: '#212529',
    //     border: '1px solid #495057',
    //     borderRadius: '0.375rem', // Keep rounded corners
    //     boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)', // Bootstrap dropdown shadow
    //     marginTop: '2px',
    //     zIndex: 1000, // Bootstrap dropdown z-index
    // }),
    // menuList: (base: any) => ({
    //     ...base,
    //
    //     padding: '0.25rem 0', // Add padding to prevent overlap with rounded corners
    //     // padding: '0.5rem 0', // Bootstrap dropdown padding
    // }),
    // menuPortal: (base: any) => ({
    //     ...base,
    //     zIndex: 1000,
    // }),
    // indicatorSeparator: (base: any) => ({
    //     ...base,
    //     backgroundColor: '#495057', // Muted separator color
    // }),
    // dropdownIndicator: (base: any, state: any) => ({
    //     ...base,
    //     color: state.isFocused ? '#86b7fe' : '#6c757d',
    //     ':hover': {
    //         color: '#86b7fe',
    //     },
    // }),

    control: (base: any, state: any) => ({
        ...base,
        backgroundColor: '#212529', // Bootstrap's dark bg-dark color
        borderColor: state.isFocused ? '#86b7fe' : '#495057', // Bootstrap focus blue or muted border
        color: '#DEE2E6',
        borderRadius: '0.375rem', // Bootstrap's default border radius
        minHeight: '32px', // Reduced height to match Bootstrap
        lineHeight: '1.5',
        boxShadow: state.isFocused ? '0 0 0 0.25rem rgba(13, 110, 253, 0.25)' : 'none', // Bootstrap focus shadow
        transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
        ':hover': {
            borderColor: state.isFocused ? '#86b7fe' : '#6c757d',
        },
    }),
    singleValue: (base: any) => ({
        ...base,
        color: '#DEE2E6',
    }),
    placeholder: (base: any) => ({
        ...base,
        color: '#DEE2E6',
    }),
    option: (base: any, state: any) => ({
        ...base,
        backgroundColor: state.isFocused
            // ? '#0d6efd' // Bootstrap primary blue for hover
            ? '#3B3F42'
            : state.isSelected
                // ? '#0d6efd' // Bootstrap primary blue for selected
                ? '#3B3F42'
                : '#212529', // Dark background
        color: state.isFocused || state.isSelected ? '#DEE2E6' : '#DEE2E6',
        padding: '0.375rem 0.75rem',
        // Fix for rounded corners - apply border radius to first and last options

        // borderRadius: state.isFirst ? '0.375rem 0.375rem 0 0' : state.isLast ? '0 0 0.375rem 0.375rem' : '0',
        borderRadius: '0',

        ':active': {
            backgroundColor: '#0b5ed7', // Darker blue for active state
        },
    }),

    // option: (base: any, state: any) => ({
    //     ...base,
    //     backgroundColor: state.isSelected
    //         ? '#0d6efd' // Bootstrap primary blue for selected only
    //         : '#212529', // Dark background for both normal and hovered states
    //     color: state.isSelected ? '#fff' : '#fff', // Keep text white
    //     cursor: 'pointer', // Show pointer cursor on hover
    //     padding: '0.375rem 0.75rem',
    //     borderRadius: '0',
    //     // Remove the :active pseudo-selector as well if you want no interaction effects at all
    //     ':active': {
    //         backgroundColor: state.isSelected ? '#0d6efd' : '#212529', // No change on click
    //     },
    // }),
    input: (base: any) => ({
        ...base,
        color: '#DEE2E6',
    }),
    menu: (base: any) => ({
        ...base,
        backgroundColor: '#212529',
        border: '1px solid #495057',
        borderRadius: '0.375rem', // Keep rounded corners
        boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)', // Bootstrap dropdown shadow
        marginTop: '2px',
        zIndex: 1000, // Bootstrap dropdown z-index
        overflow: 'hidden', // This is crucial - prevents options from overlapping rounded corners
    }),
    menuList: (base: any) => ({
        ...base,
        padding: '0', // Remove padding to allow proper border radius on options
        borderRadius: '0.375rem', // Match the menu border radius
    }),
    menuPortal: (base: any) => ({
        ...base,
        zIndex: 1000,
    }),
};