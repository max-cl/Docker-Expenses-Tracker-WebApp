import tinycolor from 'tinycolor2';

const primary = '#08e5b9';
const secondary = '#2e3346';
// const primary = "#536DFE";
// const secondary = '#FF5C93';
const warning = '#FFC260';
const success = '#3CD4A0';
const info = '#9013FE';

const lightenRate = 7.5;
const darkenRate = 15;

const primaryText = '#FFFFFF';
const secondaryText = secondary;
// const primaryText = '#4A4A4A';
// const secondaryText = '#6E6E6E';
const hintText = '#B9B9B9';
const disabledText = '#9E9E9E';

const bgDefault = '#252837';
const glassColor = 'linear-gradient(to right bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3))';
// const bgDefault = '#F6F7FF';
// const bgLight = '#F3F5FF';

const inputBgColor = '#FFFFFF';

const defaultTheme = {
    palette: {
        primary: {
            main: primary,
            light: tinycolor(primary).lighten(lightenRate).toHexString(),
            dark: tinycolor(primary).darken(darkenRate).toHexString(),
        },
        secondary: {
            main: secondary,
            light: tinycolor(secondary).lighten(lightenRate).toHexString(),
            dark: tinycolor(secondary).darken(darkenRate).toHexString(),
            contrastText: '#FFFFFF',
        },
        warning: {
            main: warning,
            light: tinycolor(warning).lighten(lightenRate).toHexString(),
            dark: tinycolor(warning).darken(darkenRate).toHexString(),
        },
        success: {
            main: success,
            light: tinycolor(success).lighten(lightenRate).toHexString(),
            dark: tinycolor(success).darken(darkenRate).toHexString(),
        },
        info: {
            main: info,
            light: tinycolor(info).lighten(lightenRate).toHexString(),
            dark: tinycolor(info).darken(darkenRate).toHexString(),
        },
        text: {
            primary: primaryText,
            secondary: secondaryText,
            hint: hintText,
            disabled: disabledText,
        },
        background: {
            default: bgDefault,
            paper: glassColor,
        },
    },
    shadows: ['0 5px 5px rgba(0,0,0,.6)'],
    overrides: {
        MuiButton: {
            root: {
                color: secondary,
                backgroundColor: primary,
                fontWeight: 800,
                borderRadius: 2,
            },
        },
        MuiInputBase: {
            input: {
                color: secondaryText,
                backgroundColor: inputBgColor,
                borderRadius: 2,
                fontSize: '1em',
                inputMultiline: {
                    '&:hover': {
                        backgroundColor: inputBgColor,
                    },
                    '&:focus': {
                        backgroundColor: inputBgColor,
                    },
                    '&:selected': {
                        backgroundColor: inputBgColor,
                    },
                },
            },
        },
        MuiFilledInput: {
            root: {
                backgroundColor: inputBgColor,
                '&.Mui-focused': {
                    backgroundColor: inputBgColor,
                },
                '&:hover': {
                    backgroundColor: inputBgColor,
                },
            },
            adornedEnd: {
                paddingRight: 0,
                '&:hover': {
                    backgroundColor: inputBgColor,
                },
                '&:focus': {
                    backgroundColor: inputBgColor,
                },
                '&:selected': {
                    backgroundColor: inputBgColor,
                },
            },
        },
        MuiFormLabel: {
            root: {
                color: secondaryText,
                fontSize: '1em',
                '&.Mui-focused': {
                    color: secondaryText,
                },
            },
        },
        MuiSelect: {
            root: {
                color: secondaryText,
                backgroundColor: inputBgColor,
            },
        },
        MuiListItem: {
            root: {
                color: primaryText,
                backgroundColor: `${bgDefault} !important`,
                '&:selected': {
                    color: primaryText,
                    backgroundColor: `${bgDefault} !important`,
                },
            },
        },
        MuiMenuItem: {
            root: {
                color: primaryText,
                backgroundColor: bgDefault,
                '&:focus': {
                    color: primaryText,
                    backgroundColor: `${secondary} !important`,
                },
                '&:hover': {
                    color: primaryText,
                    backgroundColor: `${secondary} !important`,
                },
                '&:selected': {
                    color: primaryText,
                    backgroundColor: bgDefault,
                },
            },
        },
        MuiListItemIcon: {
            root: {
                color: '#FFFFFF',
            },
        },
        MuiTableCell: {
            head: {
                color: `${secondary} !important`,
                fontWeight: `600 !important`,
            },
        },
        // MuiSvgIcon: {
        //     root: {
        //         color: tinycolor(primary).lighten(lightenRate).toHexString(),
        //     },
        // },
        /** Start DatePciker */
        MuiPickersToolbar: {
            toolbar: {},
        },
        MuiPickersCalendarHeader: {
            switchHeader: {
                color: 'white',
            },
            iconButton: {
                backgroundColor: 'transparent',
            },
            dayLabel: {
                color: 'white',
            },
        },
        MuiPickersDay: {
            day: {
                color: 'white',
            },
            daySelected: {
                backgroundColor: primary,
            },
            dayDisabled: {
                color: 'gray',
            },
            current: {
                color: tinycolor(primary).darken(darkenRate).toHexString(),
            },
        },
        MuiPickersModal: {
            dialogAction: {
                color: 'white',
            },
        },
        MuiPickersCalendar: {},
        MuiPickersBasePicker: {
            container: {
                backgroundColor: '#24282f',
            },
        },
        /** End DatePicker */
    },
};

export default defaultTheme;
