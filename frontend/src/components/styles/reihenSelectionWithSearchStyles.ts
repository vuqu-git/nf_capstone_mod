// for OverviewSemester2.tsx

export const reihenSelectionWithSearchStyles = {
    control: (base: any, state: any) => ({
        ...base,
        backgroundColor: '#0f172a', // very dark background
        borderColor: state.isFocused ? '#334155' : '#1e293b',
        color: '#cfd6e1',
        boxShadow: 'none',
        ':hover': {
            borderColor: '#334155',
        },
    }),
    singleValue: (base: any) => ({
        ...base,
        color: '#cfd6e1',
    }),
    option: (base: any, state: any) => ({
        ...base,
        backgroundColor: state.isFocused || state.isSelected ? '#1e293b' : '#0f172a',
        color: '#cfd6e1',
        cursor: 'pointer',
        ':active': {
            backgroundColor: '#334155',
        },
    }),
    input: (base: any) => ({
        ...base,
        color: '#cfd6e1',
    }),
    menu: (base: any) => ({
        ...base,
        backgroundColor: '#0f172a',
        boxShadow: 'none',
        borderRadius: '0 0 4px 4px',
        marginTop: 0,
        border: '1px solid #1e293b',
        color: '#cfd6e1',
        zIndex: 9999,
    }),
    menuPortal: (base: any) => ({
        ...base,
        zIndex: 9999,
    }),
};